from fastapi import FastAPI, File, Form, Response
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from ultralytics import YOLO
import cv2
import numpy as np
import json
from util.replaceId import addPotholeId
from controllers.potholeController import potholeController
from helpers.queryAllPotholes import queryAllPotholes
import base64
from PIL import Image
import io

app = FastAPI()

cameraModel = YOLO("models/Jul-26-2023-yoloV8m.pt")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # Allow all origins (you can specify specific origins if needed)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def get():
    return {"working?": "yes i guess"}

@app.post("/predict")
def predict(
    file: bytes = File(None),
    base64str: str = Form(None),
    returnType: str = Form(None),
    returnFormat: str = Form("image"),
    coordinate: str = Form(),
):
    """
    Predict potholes in an image.

    Request Args:
        file: The image file to process.
        returnType: The format of the results to return, either "json" or "image".
        coordinate: The current coordinate of the image.

    Response:
        The results of the prediction, either as a JSON object or an image.
    """

    if base64str:
        image_bytes = base64.b64decode(base64str)
        print("recieved base64")
    elif file:
        image_bytes = file
        print("image file")
    else:
        return Response(status_code=400, content={"error": "No image file provided."})

    resized_image = Image.open(io.BytesIO(image_bytes))
    resized_image.thumbnail((400, 400), Image.ANTIALIAS)
    results = cameraModel(resized_image)
    coordinateObj = json.loads(coordinate)
    potholeController(
        coordinateObj["longitude"], coordinateObj["latitude"], len(results[0])
    )

    if returnType == "image":
        # Get the first result and plot it
        res_plotted = results[0].plot()

        # Convert the image to bytes
        _, img_encoded = cv2.imencode(".png", res_plotted)
        img_bytes = img_encoded.tobytes()

        # Create a response with the image bytes
        if returnFormat == "base64":
            baseStr = base64.b64encode(img_bytes)
            print("base64 string done sent")
            return baseStr
        else:
            response = Response(status_code=200, content=img_bytes)
            response.headers["Content-Type"] = "image/png"
            print("image done sent")
            return response

    else:  # json
        print("here")
        returnData = {}
        # doing this is necessary dont remove
        dataArray = json.loads(results[0].tojson())
        dataArray = addPotholeId(dataArray)
        returnData["potholesData"] = dataArray
        returnData["coordinate"] = json.loads(coordinate)
        returnData["numberPotholes"] = len(dataArray)
        print("json done sent")
        return returnData



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
    # uvicorn.run(app, host="192.168.0.104", port=5000)

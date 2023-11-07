from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import json
from controllers.potholeController import potholeController
import pickle

app = FastAPI()

with open("models/quality-Jul-27-2023.pkl", "rb") as file:
    qualityModel = pickle.load(file)


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

@app.post("/quality")
async def qualitysensor(
    speed: str = Form(),
    accX: str = Form(),
    accY: str = Form(),
    accZ: str = Form(),
    gyroX: str = Form(),
    gyroY: str = Form(),
    gyroZ: str = Form(),
    coordinate: str = Form(),
):
    speed = float(speed)
    accX = float(accX)
    accY = float(accY)
    accZ = float(accZ)
    gyroX = float(gyroX)
    gyroY = float(gyroY)
    gyroZ = float(gyroZ)
    coordinateObj = json.loads(coordinate)
    print(speed, accX, accY, accZ, gyroX, gyroY, gyroZ, coordinateObj)
    data = np.array([[speed, accX, accY, accZ, gyroX, gyroY, gyroZ]])
    predictions = qualityModel.predict(data)
    if predictions[0]:
        potholeController(coordinateObj["longitude"], coordinateObj["latitude"], 1)
    print("VALUE IS :", predictions[0])
    return {"value": int(predictions[0])}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5002)
    # uvicorn.run(app, host="192.168.0.104", port=5000)

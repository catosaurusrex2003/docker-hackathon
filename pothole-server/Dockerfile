# Use the official Python image as the base image
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Copy the Python file containing the Flask server into the container
COPY server.py /app/
# Copy the requirements.txt file into the container
COPY requirements.txt /app/

# COPY models /app/
COPY . /app/

# remove env
RUN rm -rf /app/env


RUN ls


# Install required libraries
# these are required for graphical something something
# RUN apt-get update && \
#     apt-get install -y libgl1-mesa-glx

# RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Install required dependencies
RUN pip install -r requirements.txt

# Expose the port on which the Flask app will run (change it if you have a different port)
EXPOSE 5001

# Command to start the Flask app using gunicorn
# CMD ["gunicorn", "-b", "0.0.0.0:5000", "server:app"]

CMD python ./server.py









# sudo docker build -t dh-pothole-server .
# sudo docker run -p 5001:5001 <dockerimageid>




import cv2
import os
from datetime import datetime

# Load pre-trained OpenCV models for detection
PEDESTRIAN_CASCADE = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_fullbody.xml")
VEHICLE_CASCADE = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_car.xml")
PLATE_CASCADE = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_russian_plate_number.xml")

# Paths to save detected images
PEDESTRIAN_DIR = "backend/database/images/pedestrians"
VEHICLE_DIR = "backend/database/images/vehicles"

os.makedirs(PEDESTRIAN_DIR, exist_ok=True)
os.makedirs(VEHICLE_DIR, exist_ok=True)

def detect_objects(frame):
    """Detect pedestrians and vehicles in a video frame"""
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect pedestrians
    pedestrians = PEDESTRIAN_CASCADE.detectMultiScale(gray, 1.1, 4)
    detected_pedestrians = []
    for (x, y, w, h) in pedestrians:
        person_img = frame[y:y+h, x:x+w]
        filename = f"{PEDESTRIAN_DIR}/pedestrian_{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
        cv2.imwrite(filename, person_img)
        detected_pedestrians.append(filename)

    # Detect vehicles
    vehicles = VEHICLE_CASCADE.detectMultiScale(gray, 1.2, 5)
    detected_vehicles = []
    for (x, y, w, h) in vehicles:
        vehicle_img = frame[y:y+h, x:x+w]
        filename = f"{VEHICLE_DIR}/vehicle_{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
        cv2.imwrite(filename, vehicle_img)
        detected_vehicles.append((filename, vehicle_img))

    return detected_pedestrians, detected_vehicles

def detect_license_plate(vehicle_img):
    """Detect and extract license plates from vehicles"""
    gray = cv2.cvtColor(vehicle_img, cv2.COLOR_BGR2GRAY)
    plates = PLATE_CASCADE.detectMultiScale(gray, 1.1, 5)
    if len(plates) > 0:
        x, y, w, h = plates[0]  # Take the first detected plate
        return vehicle_img[y:y+h, x:x+w]  # Crop license plate region
    return None

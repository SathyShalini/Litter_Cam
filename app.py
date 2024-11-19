from flask import Flask, render_template, Response
import cv2
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# Load your trained model (replace 'your_model.h5' with your actual model file)
model = tf.keras.models.load_model('your_model.h5')

# Initialize the camera (0 for webcam, or provide the video file path)
camera = cv2.VideoCapture(0)

def preprocess_frame(frame):
    """ Preprocess the frame for the model prediction """
    img = cv2.resize(frame, (224, 224))  # Adjust size as per your model's requirement
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize the image
    return img

def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Preprocess the frame
            img = preprocess_frame(frame)

            # Predict using the trained model
            predictions = model.predict(img)
            # Assuming the model returns a probability of spitting
            if predictions[0][0] > 0.5:
                label = "Spitting Detected"
                color = (0, 0, 255)  # Red color for detection
            else:
                label = "No Spitting"
                color = (0, 255, 0)  # Green color for no detection

            # Display the label on the frame
            cv2.putText(frame, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv2.LINE_AA)

            # Encode the frame as JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            # Yield the frame in byte format
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

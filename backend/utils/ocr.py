import cv2
import pytesseract
import numpy as np

# Set path to Tesseract
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def preprocess_plate(image):
    """Improve license plate preprocessing for better OCR."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    gray = cv2.GaussianBlur(gray, (5, 5), 0)  # Reduce noise

    # Improve contrast
    gray = cv2.equalizeHist(gray)

    # Apply Adaptive Thresholding (instead of Otsu)
    binary = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 15, 4
    )

    # Remove small noise using morphological operations
    kernel = np.ones((2, 2), np.uint8)
    binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)  # Close gaps


    return binary



def extract_text(image):
    processed_plate = preprocess_plate(image)

    # Show the processed image for debugging
    cv2.imshow("Processed Plate", processed_plate)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # ✅ Corrected OCR call
    text = pytesseract.image_to_string(
        processed_plate, config="--psm 7 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    )

    return text.strip()

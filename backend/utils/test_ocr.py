import cv2
from ocr import preprocess_plate, extract_text

image_path = "D:/Mini Project/SHA/LitterCam/backend/utils/sample_plate.jpg"
image = cv2.imread(image_path)

if image is None:
    print(f"Error: Could not load image {image_path}. Check file path!")
else:
    # Crop the middle part of the plate where text is present
    cropped_plate = image[40:200, 50:350]  # Adjust these values if needed

    processed_image = preprocess_plate(cropped_plate)

    # Save the updated debug image
    debug_path = "D:/Mini Project/SHA/LitterCam/backend/utils/debug_plate.jpg"
    cv2.imwrite(debug_path, processed_image)
    print(f"Preprocessed image saved at: {debug_path}")

    plate_number = extract_text(cropped_plate)
    print("Extracted Plate Number:", plate_number)


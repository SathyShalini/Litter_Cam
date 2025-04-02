import sqlite3
import os

# Absolute path to avoid SQLite errors
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get current directory
DB_PATH = os.path.join(BASE_DIR, "littercam.db")  # Store DB inside the backend/database folder

def create_tables():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Ensure directories exist
    images_dir = os.path.join(BASE_DIR, "images")
    os.makedirs(os.path.join(images_dir, "pedestrians"), exist_ok=True)
    os.makedirs(os.path.join(images_dir, "vehicles"), exist_ok=True)

    # Create tables
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS pedestrians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_path TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_path TEXT NOT NULL,
        plate_number TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_tables()
    print(f"Database initialized successfully at {DB_PATH}!")

# Healthcare
# Health Prediction Application

## Project Overview

The Health Prediction Application is a full-stack web application designed to manage patient blood test records and generate AI-powered health predictions based on blood test parameters.

The application allows users to create, view, update, and delete patient records while automatically generating health-related remarks using Google's Gemini AI model. The system stores all patient information in MongoDB and provides a responsive and user-friendly interface built with React and CSS.

---

## Technology Stack

### Frontend

* React.js
* CSS3

### Backend

* Flask (Python)

### Database

* MongoDB

### AI Integration

* Google Gemini AI API

---

## Features

### 1. Patient Management (CRUD Operations)

The application supports complete CRUD functionality:

#### Create

Users can add a new patient record containing:

* Full Name
* Date of Birth
* Email Address
* Glucose Level
* Haemoglobin Level
* Cholesterol Level

#### Read

Users can view all stored patient records in a structured table format.

#### Update

Users can modify existing patient information and regenerate AI remarks if required.

#### Delete

Users can remove patient records from the database.

---

### 2. User-Friendly Interface

The application provides:

* Clean and responsive design
* Easy navigation
* Simple patient data entry forms
* Organized data display

---

### 3. Data Validation

The system validates user input before storing records:

* Email address must follow a valid email format.
* Date of birth cannot be a future date.
* Glucose value must be numeric.
* Haemoglobin value must be numeric.
* Cholesterol value must be numeric.
* Required fields cannot be left empty.

---

### 4. Persistent Storage

Patient records are stored in MongoDB, ensuring data persistence even after application restart.

Stored information includes:

* Full Name
* Date of Birth
* Email Address
* Glucose
* Haemoglobin
* Cholesterol
* AI Generated Remarks

---

### 5. AI-Powered Health Prediction

After successful validation and submission of patient data:

1. The Flask backend sends blood test values to the Google Gemini AI API.
2. Gemini analyzes the provided health parameters.
3. A possible health condition or risk assessment is generated.
4. The generated prediction is stored and displayed in the Remarks field.

Example remarks:

* "Blood sugar levels indicate a possible risk of diabetes. Medical consultation is recommended."
* "Cholesterol levels appear elevated and may require lifestyle modifications."
* "All provided values are within a normal range."

Note:
The generated predictions are AI-based informational suggestions and should not be considered medical diagnoses.

---

## System Architecture

Frontend (React + CSS)
↓
REST API Requests
↓
Backend (Flask)
↓
Google Gemini AI API
↓
MongoDB Database

---

## Installation and Setup

### Prerequisites

* Python 3.10+
* Node.js 18+
* MongoDB
* Google Gemini API Key

---

### Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Activate environment:

Windows:

```bash
venv\Scripts\activate
```

Mac/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Run Flask server:

```bash
python app.py
```

---

### Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm start
```

---

## API Endpoints

### Create Patient

```http
POST /patients
```

### Get All Patients

```http
GET /patients
```

### Update Patient

```http
PUT /patients/<id>
```

### Delete Patient

```http
DELETE /patients/<id>
```

---

## Database Structure

```json
{
  "_id": "ObjectId",
  "fullName": "John Doe",
  "dateOfBirth": "1995-05-10",
  "email": "john@example.com",
  "glucose": 110,
  "haemoglobin": 13.5,
  "cholesterol": 180,
  "remarks": "AI generated health assessment"
}
```

---

## Assumptions

* The application is intended for educational and assessment purposes.
* AI-generated health predictions are not substitutes for professional medical advice.
* Users should consult healthcare professionals for accurate diagnosis and treatment.

---

## Future Enhancements

* User authentication and authorization
* Role-based access control
* Health prediction confidence scores
* Patient search and filtering
* Data visualization dashboards
* PDF report generation
* Appointment management system

---

## Author

Malvina Dsouza

Junior AI/ML Developer Assessment Submission

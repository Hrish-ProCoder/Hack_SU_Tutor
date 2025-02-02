# SMART LEARN  

This project is a personalized tutor that uses **AI-powered flashcards** for interactive learning. The platform provides an intuitive way for users to study various topics, with the ability to flip through question-answer flashcards, making learning engaging and efficient.  

---

## Features  

- Provides **bite-sized knowledge** and easy explanations in **different languages**.  
- **AI-powered dynamic flashcards** for personalized learning.  
- **Interactive flipping animations** for better engagement.  
- Easy navigation with **React** and **Flask** for seamless backend communication.  

---

## Technologies Used  

- **Backend:** Flask (Python)  
- **Frontend:** React (JavaScript)  
- **API Integration:** GEMINI API for user-specific features  

---

## How to Run the Project  

### 1. Clone the Repository  
```bash
git clone https://github.com/username/personalized-tutor.git
cd personalized-tutor
```

### 2. Backend Setup (Flask Server)
Install Dependencies
Navigate to the backend directory and install the required dependencies:

```bash

cd backend
pip install -r requirements.txt
```

Run the Flask Server
Start the Flask server:

```bash

python app.py
The Flask server will run on http://127.0.0.1:5000.
```

### 3. Frontend Setup (React App)
Install Dependencies
Navigate to the frontend directory and install the required dependencies:

```bash

cd ../frontend
npm install

```
Run the React App
Start the React application:

```bash
npm start
```
The React app will run on http://localhost:3000.

### How to Get a GEMINI API Key
1.Go to the GEMINI API Documentation.
2.Create an account or log in.
3.Navigate to the API Keys section in your account settings.
4.Click on Create a New API Key.
5.Set the required permissions and generate the key.
6.Note down the API Key and API Secret provided.

Environment Variables
Create a .env file in the backend directory with the following format to store your GEMINI API key securely:
```bash
GEMINI_API_KEY=your_api_key
GEMINI_API_SECRET=your_api_secret
```

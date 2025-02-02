import google.generativeai as genai
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from explain_api import get_genAI_response

app = Flask(__name__)
CORS(app)

def generate_flashcards_gemini(concept, num_flashcards=5):
    prompt = f"""
    Generate {num_flashcards} flashcards on the topic "{concept}".
    Each flashcard should have a question and a concise answer.
    Format the response as a JSON array with the following structure:

    Some examples of questions: [
      {{
        "question": "What is {concept}?",
        "answer": "A brief but clear explanation of {concept}."
      }},
      {{
        "question": "How does {concept} work?",
        "answer": "A simple and understandable explanation of {concept}."
      }}
    ]

    Ensure the JSON is valid and the questions cover different key aspects of the topic.
    """
    # Configure your API key (replace with your actual API key)
    genai.configure(api_key="AIzaSyCE_mdJjulmXknlCK6KK95ti1q3eIXwPHs")
    model = genai.GenerativeModel("gemini-2.0-flash-exp")
    response = model.generate_content(prompt)
    
    # Clean the response text (adjust as needed based on your API's output)
    cleaned_response = response.text.strip()[7:-3]
    try:
        flashcards = json.loads(cleaned_response)
        return flashcards
    except json.JSONDecodeError:
        return {"error": "Invalid JSON response. Try again."}

@app.route('/generate-flashcards', methods=['POST'])
def generate_flashcards_endpoint():
    # Get the JSON payload from the POST request
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    # Extract concept and num_flashcards from the payload
    concept = data.get("concept")
    num_flashcards = data.get("num_flashcards", 5)

    if not concept:
        return jsonify({"error": "Missing 'concept' in the request data"}), 400

    # Generate flashcards using the provided concept
    flashcards = generate_flashcards_gemini(concept, num_flashcards)
    return jsonify(flashcards)
# Example POST endpoint to handle incoming requests
@app.route('/generate-explaination', methods=['POST'])
def post_endpoint():
    # Get JSON data from the request
    data = request.get_json()

    # Extract values for 'topic', 'age', and 'specialized_condition' from the request body
    topic = data.get('topic', '')
    age = data.get('skillLevel', '')
    language = data.get('language', '')
    specialized_condition = data.get('domain', '')

    # Get the response from the GenAI model using the provided inputs
    api_key = "AIzaSyCjNehMJxd24hmEr5g_E8d6EiDGLTg51eU"  # Replace with your actual API key
    response = get_genAI_response(api_key, topic, age,language, specialized_condition)

    # Return the AI response as a JSON object
    if response:
        return jsonify({"genAI_response": response}), 200
    else:
        return jsonify({"error": "Failed to generate response"}), 500


if __name__ == '__main__':
    app.run(debug=True)

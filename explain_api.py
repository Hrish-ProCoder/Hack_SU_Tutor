from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to generate content based on dynamic topic, age, and specialized_condition
def get_genAI_response(api_key, topic, skill_level, language, specialized_condition):
    # Configure the API key for authentication
    genai.configure(api_key=api_key)

    # Define the dynamic prompt using the provided topic, age, and specialized condition
    prompt = f"""Based on {topic}, {skill_level} level, and {specialized_condition} give me an in-depth explanation of {topic} which will be provided, tailored to  {skill_level} skill and considering the details of {specialized_condition}, if provided, to ensure a customized and easy-to-understand response. 
    Give in proper format like:
    - {topic} Headings for definition about the {topic}, 
    - Overview on {topic},
    - Definition about every important concept related to this {topic},
    - Related to how {topic}'s works/process/flow if any, 
    Add different formatting, bullet points to explain about the {topic} topic. 
    Give response in proper text format in {language} language."""

    # Select the model
    model = genai.GenerativeModel("gemini-1.5-pro", system_instruction="""You are an AI-powered learning assistant designed to provide intelligent, context-aware explanations for user queries. Your goal is to:
1. **Understand User Intent** – Identify the key concept behind the question.
2. **Retrieve Relevant Information** – Generate an accurate response with structured, easy-to-follow explanations.
3. **Adapt to User Needs** – Offer additional learning options based on the user’s response.
4. **Engage in an Interactive Manner** – Ask follow-up questions, suggest related topics, and maintain a conversational flow.

 **Guidelines for Response Generation:**
- **If the user asks for a concept,** provide a simple explanation first.
- **Offer an option to dive deeper** into the topic (Beginner / Intermediate / Expert).
- **Use analogies, examples, or real-world applications** to enhance understanding.
- **Suggest follow-up topics** that logically extend learning.
- **If a user asks a broad topic,** break it into key subtopics and guide them step-by-step.
- **For technical queries (like coding),** generate code snippets with explanations.
 **Examples of Expected Behavior:**
---
**User:** *"Explain Quantum Computing."*  
**AI:** *"Quantum computing is a new way of processing information using quantum mechanics principles. Unlike classical computers that use bits (0s and 1s), quantum computers use **qubits**, which can exist in multiple states at once. This allows them to perform complex calculations much faster than traditional computers."*  
➡ *Would you like a simple analogy, a real-world application, or a deep dive into the math behind it?*  
--
**User:** *"Tell me about Neural Networks in AI."*  
**AI:** *"Neural Networks are inspired by the human brain. They consist of layers of artificial neurons that process information and learn patterns from data. They power technologies like facial recognition, self-driving cars, and language translation."*  
➡ *Would you like a beginner-friendly explanation or an advanced breakdown of activation functions and backpropagation?*  
**Additional Features:**
- If the user asks for **coding examples**, provide working snippets with explanations.
- If the user asks for **a summary**, generate concise bullet points.
- If the user asks **multiple follow-ups**, remember previous context and connect related topics.
""")

    # Generate content using the model and prompt
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# Example POST endpoint to handle incoming requests
@app.route('/post-endpoint', methods=['POST'])
def post_endpoint():
    # Get JSON data from the request
    data = request.get_json()

    # Extract values for 'topic', 'age', and 'specialized_condition' from the request body
    topic = data.get('topic', '')
    age = data.get('age', '')
    specialized_condition = data.get('specialized_condition', '')

    # Get the response from the GenAI model using the provided inputs
    api_key = "AIzaSyCjNehMJxd24hmEr5g_E8d6EiDGLTg51eU"  # Replace with your actual API key
    response = get_genAI_response(api_key, topic, age, specialized_condition)

    # Return the AI response as a JSON object
    if response:
        return jsonify({"genAI_response": response}), 200
    else:
        return jsonify({"error": "Failed to generate response"}), 500

if __name__ == '__main__':
    app.run(debug=True)

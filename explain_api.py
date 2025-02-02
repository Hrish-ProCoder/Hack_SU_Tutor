from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Function to generate content based on dynamic topic, age, and specialized_condition
def get_genAI_response(api_key, topic, age, specialized_condition):
    # Configure the API key for authentication
    genai.configure(api_key=api_key)

    # Define the dynamic prompt using the provided topic, age, and specialized condition
    prompt = f"""Based on {topic}, {age}, and {specialized_condition} give me an in-depth explanation of {topic} which will be provided, tailored to age {age} years old and considering the details of {specialized_condition}, if provided, to ensure a customized and easy-to-understand response. 
    Give in proper format like:
    - {topic} Headings for definition about the {topic}, 
    - Overview on {topic},
    - Definition about every important concept related to this {topic},
    - Related to how {topic}'s works/process/flow if any, 
    Add different formatting, bullet points to explain about the {topic} topic. 
    Give response in HTML with applied inline CSS and Bootstrap also."""

    # Select the model
    model = genai.GenerativeModel("gemini-1.5-flash")

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

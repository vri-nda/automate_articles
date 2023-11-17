# //works perfectly but uses only top 1 article on google
from flask import Flask, render_template, request, jsonify
import openai
import requests

app = Flask(__name__)

# OpenAI API key
openai.api_key = ''

# Google API key and Custom Search engine ID
google_api_key = ''
custom_search_engine_id = ''

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_article', methods=['POST'])
def generate_article():
    if request.method == 'POST':
        data = request.get_json()
        user_input = data.get('user_input', '')

        if user_input:
            try:
                # Use Google Custom Search API to fetch top search results
                google_api_url = f'https://www.googleapis.com/customsearch/v1?key={google_api_key}&cx={custom_search_engine_id}&q={user_input}'
                google_response = requests.get(google_api_url)
                google_data = google_response.json()
                search_results = google_data.get('items', [])

                if not search_results:
                    return jsonify({"error": "No search results found."})

                # Extract relevant information from the search results
                top_search_result = search_results[0]  # You can modify this to choose a different result
                top_search_title = top_search_result.get('title', '')
                top_search_link = top_search_result.get('link', '')

                # Generate an article using OpenAI API with relevant information
                prompt = f"Generate an article on {user_input}. According to a top search result, '{top_search_title}' ({top_search_link})."
                response = openai.Completion.create(
                    engine="text-davinci-002",
                    prompt=prompt,
                    max_tokens=800  # Adjust the value to stay within the model's context limit
                )

                generated_article = response.choices[0].text

                return jsonify({"article": generated_article})
            except Exception as e:
                error_message = f"Error: {e}"
                print(error_message)  # Log the error message to the console
                return jsonify({"error": error_message})
        else:
            return jsonify({"error": "Please enter a topic for the article."})

if __name__ == '__main__':
    app.run(debug=True)

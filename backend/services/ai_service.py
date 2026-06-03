import google.generativeai as genai
from config import Config

print("Configuring Gemini")

genai.configure(api_key=Config.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-3.1-flash-lite-preview")

def generate_health_remark(glucose, haemoglobin, cholesterol):

    print("Inside Gemini Function")

    prompt = f"""
    Glucose: {glucose}
    Haemoglobin: {haemoglobin}
    Cholesterol: {cholesterol}

    Give a short health assessment in 1 line.
    """

    try:
        response = model.generate_content(prompt)

        print("Gemini Response Received")

        return response.text

    except Exception as e:
        print("Gemini Error:", str(e))
        return f"Error: {str(e)}"
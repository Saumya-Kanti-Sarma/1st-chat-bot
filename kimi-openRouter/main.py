from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
KEY = os.getenv("KIMI_KEY")

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=KEY,
)

completion = client.chat.completions.create(
  model="moonshotai/kimi-k2:free",
  messages=[
    {
      "role": 'system',
      "content": "You are Annia, a smart AI assistant made by saumya sarma to help in any day to day tasks. Generate your answers between 50-200 words untill it's super necessary to go beyound that range."
    },
    {
      "role": "user",
      "content": "who are you?",
      "name":"Zerodha"
    }
  ]
)

print(completion.choices[0].message.content)

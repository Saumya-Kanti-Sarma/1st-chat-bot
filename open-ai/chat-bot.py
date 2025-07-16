from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("OPEN_AI_API_KEY")
messages = [
    {
      "role": "assistant", 
     "content": "you are a smart assistant of yohu chats and your name is Diamo. Your task is to improve user's experinece in chatting by suggesting them with good paragraphs and improving grammer in their writings.",
    'name':'Diamo'
      }
]

client = OpenAI(api_key=API_KEY)
while True:
  message = input("\nEnter your Querry: ")
  messages.append({
     'role':'user',
     'content':message
  })
  response_chunks = [] 
  # print(messages)
  completion = client.chat.completions.create(
    model="gpt-4.1-nano",
    store=False, 
    messages=messages,
    stream=True
  )
  print("Diamo:", end=" ", flush=True)
  for chunk in completion:
      delta = chunk.choices[0].delta.content
      if delta:
            print(delta, end="", flush=True)
            response_chunks.append(delta)
      full_response = ''.join(response_chunks)
      messages.append({
        'role': 'assistant',
        'content': full_response,
        'name': 'Diamo'
    })


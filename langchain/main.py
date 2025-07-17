import getpass
import os
from dotenv import load_dotenv

load_dotenv()
KEY = os.getenv("OPEN_AI_API_KEY")
getpass.getpass(KEY)

from langchain.chat_models import init_chat_model
model = init_chat_model("gpt-4o-mini", model_provider="openai")

model.invoke("Hello, world!")
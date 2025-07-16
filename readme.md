Currently you can get a free API credit of $5 without any credit or debit card from the official Open-AI website so it's the best time to try out

## what is a `model= "gpt-4o-min"`?
: the chat model that you want to intigrate in your project. For this case it's gpt-4o-mini which is the most cheapest model. You can try other powerful models like gpt-4o, gpt-3.5-turbo etc.

## what is `store=True`?
: If True, OpenAI may store your prompt/response for model improvement, testing etc. Set `store=False` if you're working with private or user data.

## what is `"role": "user"`?
: OpenAI's chat models simulate a conversation between roles:

  `"user"` → You, the one who is asking.

  `"assistant"` → The AI it self.

  `"system"` → Gives instructions to the assistant (e.g., “You are a helpful assistant that's good in mathematics.”).
  example:
  ```python
  messages=[
    {
      "role": "system", 
      "content": "You are a math tutor."
    },
    {
      "role": "user", 
      "content": "What is 2 + 2?"
    },
]
  ```

## what is `temperature`?
Temperature are the float values that controlls how creative or random the AI's replies will be. 
`temperature=0`: The replies will be very precused. Usually good for facts.
`temperaiture=1`: good for creative answers. 
`temperature` can go upto 2, but the value between 0.2-1 are the most useful.

## what is `stream=True`?
Tells the API to send the response in chunks, like streaming live output so that instead of waiting for the whole reply, user can see it in real time.
example: 
```python
response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[{"role": "user", "content": "Tell me a long story"}],
  stream=True
)
for chunk in response:
    print(chunk.choices[0].delta.content, end="")

```

## how can we set multiple messages in a row?
The messages parameter accepts an array of messages to simulate a conversation history. The model doesn’t remember past calls. If we want continuity, we must include the previous messages manually.
example:
```python
messages = [
  {"role": "system", "content": "You are a helpful assistant."},
  {"role": "user", "content": "Who is Hikaru Nakamura?"},
  {"role": "assistant", "content": "Hikaru is a chess Grandmaster..."},
  {"role": "user", "content": "What is his playing style?"}
]

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=messages
)

print(completion.choices[0].message.content)

```
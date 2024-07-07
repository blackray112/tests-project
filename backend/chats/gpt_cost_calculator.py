PRICE_PER_PROMPT_TOKEN: float = 0.0015 / 1000
PRICE_PER_COMPLETION_TOKEN: float = 0.002 / 1000

def calculate(token_usage: dict[str, float]) -> float:
    return token_usage['prompt_tokens'] * PRICE_PER_PROMPT_TOKEN \
         + token_usage['completion_tokens'] * PRICE_PER_COMPLETION_TOKEN

import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from app.models.ai_models import  (
    deepseek_r1,
    gpt4o,
    gpt4o_mini,
    deepseek_v3,
    llama_33,
    embeddings_model
)
import re

load_dotenv()

client = OpenAI(api_key="sk-qXX8aIa3K4bjW8pkHU5SlQ")


def generate_rule_from_prompt(prompt: str):

    system_prompt = """
You are a hospital triage rule generator.

Convert the user instruction into JSON.

Rules must contain:

parameter (oxygen_level | heart_rate | temperature)
operator (< or >)
threshold (number)
category (Critical | Moderate | stable)
ward (ICU | ER | OP)

Return ONLY JSON.

Example:

{
 "parameter": "oxygen_level",
 "operator": "<",
 "threshold": 88,
 "category": "Critical",
 "ward": "ICU"
}
"""

    # response = client.chat.completions.create(
    #     model="gpt-4o-mini",
    #     messages=[
    #         {"role": "system", "content": system_prompt},
    #         {"role": "user", "content": prompt}
    #     ]
    # )

    messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    
    response = deepseek_v3.invoke(messages)

    result = response.content
    print(result)
    try:
        cleaned = re.sub(r"```json|```", "", result).strip()
        return json.loads(cleaned)
    except:
        raise Exception("AI returned invalid JSON")

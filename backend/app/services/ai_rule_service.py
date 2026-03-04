import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key="1234")


def generate_rule_from_prompt(prompt: str):

    system_prompt = """
You are a hospital triage rule generator.

Convert the user instruction into JSON.

Rules must contain:

parameter (oxygen_level | heart_rate | temperature)
operator (< or >)
threshold (number)
category (Critical | Moderate | stable)
ward (ICU | ER | General)

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

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    )

    result = response.choices[0].message.content

    try:
        return json.loads(result)
    except:
        raise Exception("AI returned invalid JSON")
import re

def parse_admin_prompt(prompt):

    prompt = prompt.lower()

    if "heart rate" in prompt and "increase" in prompt:

        number = re.findall(r'\d+', prompt)

        if number:
            return {
                "action": "add",
                "parameter": "heart_rate",
                "operator": ">",
                "threshold": float(number[0]),
                "category": "Moderate",
                "ward": "ER"
            }

    if "oxygen" in prompt:

        number = re.findall(r'\d+', prompt)

        if number:
            return {
                "action": "add",
                "parameter": "oxygen_level",
                "operator": "<",
                "threshold": float(number[0]),
                "category": "Critical",
                "ward": "ICU"
            }

    return {"action": "unknown"}
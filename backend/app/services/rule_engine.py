from sqlalchemy.orm import Session
from app.models.rules import TriageRule


from app.models.rules import TriageRule

PRIORITY = {
    "Critical": 3,
    "Moderate": 2,
    "Stable": 1
}

def evaluate_rules(vitals, rules):

    results = []

    for rule in rules:

        value = vitals.get(rule.parameter)

        if value is None:
            continue

        if rule.operator == "<" and value < rule.threshold:
            results.append(rule)

        elif rule.operator == ">" and value > rule.threshold:
            results.append(rule)

    return results

def determine_category(results):

    priority = ["Critical","Moderate","Stable"]

    for p in priority:

        for r in results:

            if r.category == p:
                return r

    return None
# -*- coding: utf-8 -*-
"""Simple script that simulates typical Israeli dad responses."""
import random
import sys

RESPONSES = {
    "חזרתי מאוחר": {
        "קלאסי": [
            "למה אין לך שעון?",
            "זה נראה לך שעה לחזור?"
        ],
        "אשכנזי": [
            "נו, מה יהיה איתך, אבאלה?"
        ],
        "מרוקאי": [
            "אני מחכה לך עם הכפכף!"
        ]
    },
    "ביקשתי עוד כסף": {
        "קלאסי": [
            "כסף לא גדל על העצים!",
            "כשתעבוד תבין..."
        ],
        "רוסי": [
            "מה אתה חושב, אנחנו בבנק?",
            "אין כסף, תעבוד!"
        ]
    }
}

def get_response(situation: str, style: str = "קלאסי") -> str:
    styles = RESPONSES.get(situation, {})
    options = styles.get(style)
    if not options:  # fallback to any available style or default text
        options = next(iter(styles.values()), [])
    if not options:
        return "אין לי מה להגיד על זה..."
    return random.choice(options)


def main(args: list[str]) -> None:
    situation = args[1] if len(args) > 1 else random.choice(list(RESPONSES.keys()))
    style = args[2] if len(args) > 2 else "קלאסי"
    print(get_response(situation, style))


if __name__ == "__main__":
    main(sys.argv)

from fastapi import FastAPI
from pydantic import BaseModel
from nlp import process_text
from automata import check_sentence_structure
from rules import check_subject_verb_agreement, check_articles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str


def calculate_score(structure_ok, suggestion):
    score = 100

    if not structure_ok:
        score -= 40

    if suggestion:
        score -= 30

    return max(score, 0)   


@app.post("/check")
def check_grammar(input: TextInput):
    tokens = process_text(input.text)

    structure_ok, message = check_sentence_structure(tokens)

    rule_result = check_subject_verb_agreement(tokens)

    if not rule_result:
        rule_result = check_articles(tokens)

    error_word = None
    suggestion = None

    if rule_result:
        structure_ok = False
        message = "Grammar error detected"
        error_word = rule_result["error"]
        suggestion = rule_result["suggestion"]

    score = calculate_score(structure_ok, suggestion)

    return {
        "tokens": tokens,
        "structure": message,
        "structure_ok": structure_ok,
        "error_word": error_word,
        "suggestion": suggestion,
        "score": score
    }
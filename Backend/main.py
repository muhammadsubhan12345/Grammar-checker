# from fastapi import FastAPI
# from pydantic import BaseModel
# from nlp import process_text
# from automata import check_sentence_structure
# from rules import check_subject_verb_agreement, check_articles
# from fastapi.middleware.cors import CORSMiddleware
# from grammar_engine import advanced_check

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class TextInput(BaseModel):
#     text: str


# def calculate_score(structure_ok, suggestion):
#     score = 100

#     if not structure_ok:
#         score -= 40

#     if suggestion:
#         score -= 30

#     return max(score, 0)   

# @app.post("/check")
# def check_grammar(input: TextInput):

#     tokens = process_text(input.text)

#     structure_ok, message = check_sentence_structure(tokens)

#     rule_result = check_subject_verb_agreement(tokens)

#     if not rule_result:
#         rule_result = check_articles(tokens)

#     advanced_errors = advanced_check(input.text)

#     error_word = None
#     suggestion = None

#     if rule_result:
#         structure_ok = False
#         error_word = rule_result["error"]
#         suggestion = rule_result["suggestion"]

#     score = calculate_score(structure_ok, suggestion)

#     return {
#         "tokens": tokens,
#         "structure": message,
#         "structure_ok": structure_ok,
#         "error_word": error_word,
#         "suggestion": suggestion,
#         "score": score,
#         "advanced_errors": advanced_errors
#     }

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from nlp import process_text
from automata import check_sentence_structure
from grammar_engine import advanced_check

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


def calculate_score(structure_ok, advanced_errors):
    score = 100

    if not structure_ok:
        score -= 10

    score -= len(advanced_errors) * 10

    return max(score, 0)


@app.post("/check")
def check_grammar(input: TextInput):

    # NLP Tokenization
    tokens = process_text(input.text)

    # Automata Check (for course requirement)
    structure_ok, message = check_sentence_structure(tokens)

    # LanguageTool Check (main checker)
    advanced_errors = advanced_check(input.text)

    error_word = None
    suggestion = None

    if advanced_errors:

        first_error = advanced_errors[0]

        error_word = first_error.get("error", "")

        suggestions = first_error.get("suggestions", [])

        if suggestions:
            suggestion = suggestions[0]

        structure_ok = False
        message = "Grammar issues detected"

    score = calculate_score(structure_ok, advanced_errors)

    return {
        "tokens": tokens,
        "structure": message,
        "structure_ok": structure_ok,
        "error_word": error_word,
        "suggestion": suggestion,
        "score": score,
        "advanced_errors": advanced_errors
    }
def check_sentence_structure(tokens):
    if not tokens:
        return False, "Empty sentence"

    first = tokens[0]["pos"]

    # Allow more natural sentence starts
    if first in ["PRON", "NOUN", "PROPN", "ADV"]:
        return True, "Valid sentence"

    return False, "Invalid sentence structure"
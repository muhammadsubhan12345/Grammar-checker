past_tense_verbs = [
    "went",
    "came",
    "saw",
    "ate",
    "drank",
    "ran",
    "wrote",
    "read",
    "took",
    "gave",
    "made",
    "did",
    "had"
]


def check_subject_verb_agreement(tokens):
    if len(tokens) < 2:
        return None

    subject = tokens[0]["text"].lower()
    verb = tokens[1]["text"].lower()

    verb_corrections = {
        "go": "goes",
        "do": "does",
        "have": "has",
    }

    if subject in ["he", "she", "it"]:
        if verb in verb_corrections:
            return {
                "error": verb,
                "suggestion": verb_corrections[verb]
            }
        
        if verb.lower() in past_tense_verbs:
            return None

        if not verb.endswith("s"):
            return {
                "error": verb,
                "suggestion": verb + "s"
            }

    return None


def check_articles(tokens):
    for i in range(len(tokens) - 1):
        word = tokens[i]["text"].lower()
        next_word = tokens[i + 1]["text"].lower()

        if word == "a" and next_word[0] in "aeiou":
            return {
                "error": "a",
                "suggestion": "an"
            }

        if word == "an" and next_word[0] not in "aeiou":
            return {
                "error": "an",
                "suggestion": "a"
            }

    return None
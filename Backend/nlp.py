import spacy

nlp = spacy.load("en_core_web_sm")

def process_text(text):
    doc = nlp(text)
    tokens = []

    for token in doc:
        # ❌ skip spaces and punctuation
        if token.is_space or token.is_punct:
            continue

        tokens.append({
            "text": token.text,
            "pos": token.pos_,
            "tag": token.tag_
        })

    return tokens
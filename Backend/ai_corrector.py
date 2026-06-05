from transformers import pipeline

corrector = pipeline(
    "text2text-generation",
    model="vennify/t5-base-grammar-correction"
)

def correct_text(text):

    result = corrector(
        "grammar: " + text,
        max_length=512
    )

    return result[0]["generated_text"]
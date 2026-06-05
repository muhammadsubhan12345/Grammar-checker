from spellchecker import SpellChecker

spell = SpellChecker()

def check_spelling(text):

    words = text.split()

    misspelled = spell.unknown(words)

    return list(misspelled)
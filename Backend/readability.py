import textstat

def readability_score(text):

    return textstat.flesch_reading_ease(text)
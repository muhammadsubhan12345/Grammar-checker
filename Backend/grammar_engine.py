import language_tool_python

tool = language_tool_python.LanguageTool('en-US')

def advanced_check(text):
    matches = tool.check(text)

    errors = []

    for match in matches:
        errors.append({
            "message": match.message,
            "error": match.context,
            "suggestion": match.replacements[:3]
        })

    return errors
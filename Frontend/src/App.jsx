import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const checkGrammar = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/check", {
        text: text,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }
  };

  const checkGrammarRealtime = async (inputText) => {
    if (inputText.trim() === "") {
      setResult(null);
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/check", {
        text: inputText,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🎯 Score Color
  const getScoreColor = (score) => {
    if (score > 80) return "bg-green-500";
    if (score > 50) return "bg-yellow-400";
    return "bg-red-500";
  };

  // 🎯 Score Label
  const getScoreLabel = (score) => {
    if (score > 80) return "Excellent ✅";
    if (score > 50) return "Needs Improvement ⚠️";
    return "Poor ❌";
  };

  const highlightText = (text, result) => {
    if (!result || !result.error_word) return text;

    return text
      .split(" ")
      .map((word) => {
        if (word === result.error_word) {
          return `<span style="color:red; font-weight:bold; text-decoration:underline;">${word}</span>`;
        }
        return word;
      })
      .join(" ");
  };

  const moveCursorToEnd = (el) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-6 text-white">
      <h1 className="text-4xl font-bold mb-6 tracking-wide">
        ✨ Grammar Checker
      </h1>

      {/* Textarea */}
      <textarea
        className="w-full max-w-xl p-4 rounded-xl shadow-lg text-black"
        rows="4"
        placeholder="Type your sentence..."
        value={text}
        dir="ltr"
        style={{ direction: "ltr", textAlign: "left" }}
        onChange={(e) => {
          const value = e.target.value;
          setText(value);
          checkGrammarRealtime(value);
        }}
      />

      {/* Button */}
      <button
        onClick={checkGrammar}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl shadow-lg transition"
      >
        Check Grammar
      </button>

      {/* Result */}
      {result && (
        <div className="mt-6 bg-white text-black p-6 rounded-2xl shadow-2xl w-full max-w-xl">
          {/* Sentence */}
          <p className="text-lg mb-4 leading-relaxed">
            {text.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  word === result.error_word
                    ? "text-red-600 font-bold underline"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </p>

          {/* Status */}
          <p
            className={`text-lg font-semibold ${
              result.structure_ok ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.structure_ok
              ? "✅ Correct Sentence"
              : "❌ Incorrect Sentence"}
          </p>

          {/* 🔥 Score Section */}
          <div className="mt-5">
            {/* Top Row */}
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-700">Grammar Score</span>
              <span className="font-bold text-blue-600 text-lg">
                {result.score}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div
                className={`${getScoreColor(
                  result.score
                )} h-3 rounded-full transition-all duration-700`}
                style={{ width: `${result.score}%` }}
              ></div>
            </div>

            {/* Label */}
            <p className="text-sm mt-2 text-gray-600">
              {getScoreLabel(result.score)}
            </p>
          </div>

          {/* Suggestion */}
          {result.suggestion && (
            <p className="mt-4 text-yellow-600 font-medium">
              💡 Replace with: <b>{result.suggestion}</b>
            </p>
          )}

          {/* Tokens */}
          <div className="mt-4">
            <strong className="text-gray-700">Tokens:</strong>
            <div className="mt-2 flex flex-wrap gap-2">
              {result.tokens.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm"
                >
                  {t.text} ({t.pos})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

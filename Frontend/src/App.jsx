// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [text, setText] = useState("");
//   const [result, setResult] = useState(null);

//   const checkGrammar = async () => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/check", {
//         text: text,
//       });
//       setResult(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Error connecting to backend");
//     }
//   };

//   const checkGrammarRealtime = async (inputText) => {
//     if (inputText.trim() === "") {
//       setResult(null);
//       return;
//     }

//     try {
//       const res = await axios.post("http://127.0.0.1:8000/check", {
//         text: inputText,
//       });
//       setResult(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🎯 Score Color
//   const getScoreColor = (score) => {
//     if (score > 80) return "bg-green-500";
//     if (score > 50) return "bg-yellow-400";
//     return "bg-red-500";
//   };

//   // 🎯 Score Label
//   const getScoreLabel = (score) => {
//     if (score > 80) return "Excellent ✅";
//     if (score > 50) return "Needs Improvement ⚠️";
//     return "Poor ❌";
//   };

//   const highlightText = (text, result) => {
//     if (!result || !result.error_word) return text;

//     return text
//       .split(" ")
//       .map((word) => {
//         if (word === result.error_word) {
//           return `<span style="color:red; font-weight:bold; text-decoration:underline;">${word}</span>`;
//         }
//         return word;
//       })
//       .join(" ");
//   };

//   const moveCursorToEnd = (el) => {
//     const range = document.createRange();
//     const sel = window.getSelection();
//     range.selectNodeContents(el);
//     range.collapse(false);
//     sel.removeAllRanges();
//     sel.addRange(range);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-6 text-white">
//       <h1 className="text-4xl font-bold mb-6 tracking-wide">
//         ✨ Grammar Checker
//       </h1>

//       {/* Textarea */}
//       <textarea
//         className="w-full max-w-xl p-4 rounded-xl shadow-lg text-black"
//         rows="4"
//         placeholder="Type your sentence..."
//         value={text}
//         dir="ltr"
//         style={{ direction: "ltr", textAlign: "left" }}
//         onChange={(e) => {
//           const value = e.target.value;
//           setText(value);
//           checkGrammarRealtime(value);
//         }}
//       />

//       {/* Button */}
//       <button
//         onClick={checkGrammar}
//         className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl shadow-lg transition"
//       >
//         Check Grammar
//       </button>

//       {/* Result */}
//       {result && (
//         <div className="mt-6 bg-white text-black p-6 rounded-2xl shadow-2xl w-full max-w-xl">
//           {/* Sentence */}
//           <p className="text-lg mb-4 leading-relaxed">
//             {text.split(" ").map((word, i) => (
//               <span
//                 key={i}
//                 className={
//                   word === result.error_word
//                     ? "text-red-600 font-bold underline"
//                     : ""
//                 }
//               >
//                 {word}{" "}
//               </span>
//             ))}
//           </p>

//           {/* Status */}
//           <p
//             className={`text-lg font-semibold ${
//               result.structure_ok ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {result.structure_ok
//               ? "✅ Correct Sentence"
//               : "❌ Incorrect Sentence"}
//           </p>

//           {/* 🔥 Score Section */}
//           <div className="mt-5">
//             {/* Top Row */}
//             <div className="flex justify-between items-center mb-1">
//               <span className="font-semibold text-gray-700">Grammar Score</span>
//               <span className="font-bold text-blue-600 text-lg">
//                 {result.score}%
//               </span>
//             </div>

//             {/* Progress Bar */}
//             <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
//               <div
//                 className={`${getScoreColor(
//                   result.score
//                 )} h-3 rounded-full transition-all duration-700`}
//                 style={{ width: `${result.score}%` }}
//               ></div>
//             </div>

//             {/* Label */}
//             <p className="text-sm mt-2 text-gray-600">
//               {getScoreLabel(result.score)}
//             </p>
//           </div>

//           {/* Suggestion */}
//           {result.suggestion && (
//             <p className="mt-4 text-yellow-600 font-medium">
//               💡 Replace with: <b>{result.suggestion}</b>
//             </p>
//           )}

//           {/* Tokens */}
//           <div className="mt-4">
//             <strong className="text-gray-700">Tokens:</strong>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {result.tokens.map((t, i) => (
//                 <span
//                   key={i}
//                   className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm"
//                 >
//                   {t.text} ({t.pos})
//                 </span>
//               ))}
//             </div>
//           </div>
//           {/* <div>
//             <h3>Corrected Text</h3>
//             <p>{result.corrected_text}</p>
//           </div>

//           <div>
//             <h3>Readability</h3>
//             <p>{result.readability}</p>
//           </div>

//           <div>
//             <h3>Grammar Errors</h3>

//             {result.grammar_errors.map((e, i) => (
//               <div key={i}>{e.message}</div>
//             ))}
//           </div>

//           <div>
//             <h3>Spelling Errors</h3>

//             {result.spelling_errors.map((e, i) => (
//               <span key={i}>{e}</span>
//             ))}
//           </div> */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkGrammarRealtime = async (inputText) => {
    if (inputText.trim() === "") {
      setResult(null);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/check",
        {
          text: inputText,
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent ✅";
    if (score >= 50) return "Good 👍";
    return "Needs Improvement ❌";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex justify-center items-center p-6">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">
            ✨ AI Grammar Checker
          </h1>

          <p className="text-gray-300">
            Automata + NLP + LanguageTool
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6">

          {/* Text Input */}
          <textarea
            value={text}
            rows="7"
            placeholder="Type a sentence or paragraph..."
            className="w-full p-4 rounded-xl bg-white text-black resize-none focus:outline-none focus:ring-4 focus:ring-blue-500"
            onChange={(e) => {
              setText(e.target.value);
              checkGrammarRealtime(e.target.value);
            }}
          />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">

            <div className="bg-white/10 p-4 rounded-xl text-center">
              <h3 className="text-sm text-gray-300">Words</h3>
              <p className="text-2xl font-bold">
                {
                  text.trim()
                    ? text.trim().split(/\s+/).length
                    : 0
                }
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl text-center">
              <h3 className="text-sm text-gray-300">
                Characters
              </h3>
              <p className="text-2xl font-bold">
                {text.length}
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl text-center">
              <h3 className="text-sm text-gray-300">
                Grammar Issues
              </h3>
              <p className="text-2xl font-bold">
                {result?.advanced_errors?.length || 0}
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl text-center">
              <h3 className="text-sm text-gray-300">
                Status
              </h3>
              <p className="text-lg font-bold">
                {result?.structure_ok
                  ? "Correct"
                  : "Review"}
              </p>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-5 text-center">
              <div className="animate-pulse text-blue-300">
                Analyzing grammar...
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <>
              {/* Score */}
              <div className="mt-6">

                <div className="flex justify-between mb-2">
                  <span className="font-semibold">
                    Grammar Score
                  </span>

                  <span className="font-bold">
                    {result.score}%
                  </span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className={`${getScoreColor(
                      result.score
                    )} h-4 rounded-full transition-all duration-700`}
                    style={{
                      width: `${result.score}%`,
                    }}
                  ></div>
                </div>

                <p className="mt-2 text-sm">
                  {getScoreLabel(result.score)}
                </p>
              </div>

              {/* Sentence Status */}
              <div className="mt-6">

                <h2 className="text-xl font-bold mb-2">
                  Result
                </h2>

                <p
                  className={
                    result.structure_ok
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {result.structure_ok
                    ? "✅ Grammar looks good"
                    : "❌ Grammar issues found"}
                </p>
              </div>

              {/* Main Suggestion */}
              {result.suggestion && (
                <div className="mt-4 bg-yellow-500/20 p-4 rounded-xl border border-yellow-500">
                  <h3 className="font-bold">
                    Suggested Fix
                  </h3>

                  <p>
                    Replace{" "}
                    <b>{result.error_word}</b> with{" "}
                    <b>{result.suggestion}</b>
                  </p>
                </div>
              )}

              {/* Advanced Errors */}
              {result.advanced_errors?.length > 0 && (
                <div className="mt-6">

                  <h2 className="text-xl font-bold mb-3">
                    Grammar Issues
                  </h2>

                  <div className="space-y-3">

                    {result.advanced_errors.map(
                      (error, index) => (
                        <div
                          key={index}
                          className="bg-red-500/10 border border-red-500 rounded-xl p-4"
                        >
                          <p className="font-semibold">
                            {error.message}
                          </p>

                          <p className="text-sm mt-2">
                            Error:{" "}
                            <span className="text-red-400">
                              {error.error}
                            </span>
                          </p>

                          {error.suggestions?.length >
                            0 && (
                            <p className="text-green-400 text-sm mt-1">
                              Suggestions:{" "}
                              {error.suggestions.join(
                                ", "
                              )}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Tokens */}
              <div className="mt-6">

                <h2 className="text-xl font-bold mb-3">
                  NLP Tokens
                </h2>

                <div className="flex flex-wrap gap-2">

                  {result.tokens.map(
                    (token, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                      >
                        {token.text} ({token.pos})
                      </span>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
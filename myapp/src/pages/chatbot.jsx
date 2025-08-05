import { useState } from "react";
import axios from "axios";
import bgImage from './bg2.jpg';
import bgImage1 from './bg1.jpg';



const SUGGESTIONS = [
  {text: "DSA Seekhna hai. Arrays, Linked Lists, Trees, Graphs etc.",},
  {text: "Full Stack Development seekhna hai.",},
  {text: "Class ka syllabus ML,Agile etc.",},
  {text: "Create a React JS component ya Tailwind CSS component.",}
];

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuggestion = (text) => {setInput(text);};
  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message: input });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply || "No response from server." }]);
    }
    catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "Nahi Chali..." }]);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div
        className="w-full max-w-3xl text-center p-10 rounded-2xl shadow-lg bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage1})` }}
      >
    <div className="relative z-10 flex justify-between items-start flex-col">  
      <div className="text-5xl font-bold mb-1 text-white drop-shadow-md">
        <span className="text-gray-600">Gaurav's </span>
        <span className="text-slate-500">Chatbot</span>
        </div>
          <div className="text-gray-800 font-semibold text-lg">Ask me anything.</div>
        </div>
            
      <div className="flex gap-4 w-full max-w-3xl mt-[30px] mb-[40px] sm:max-w-2xl sm:flex-row flex-col">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            className="flex-1 bg-white rounded-lg shadow-md p-4 text-left text-gray-500 hover:bg-slate-700/70  hover:text-white transition-colors border border-transparent hover:border-blue-800 group"
            onClick={() => handleSuggestion(s.text)}
          >
            <div className="text-base font-medium">{s.text}</div>
          </button>
        ))}
      </div>

      {/* Chat area (optional, can show messages, removed for compactness) */}
      {/* <div className="w-full max-w-3xl min-h-[120px] bg-slate-800/60 rounded-xl mb-4 p-6"></div> */}
      {/* Chat input */}
      <div className="w-full max-w-3xl space-y-3 mb-6">
        {messages.map((msg, i) => (
          <div
              key={i}
              className={`px-4 py-2 rounded-lg max-w-xl ${
                msg.sender === "user"
                  ? "bg-white text-darkgray-600 self-end ml-auto"
                  : "bg-white text-darkgray-600 self-start mr-auto"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="w-full max-w-3xl flex items-center gap-3 bg-white-800 rounded-xl shadow-lg px-4 py-3">
        <input
          className="flex-1 bg-transparent outline-transparent hover:bg-gray-400  text-black-200 placeholder:text-black-400 px-2 py-2 text-lg"
          placeholder="Ask Gaurav something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="p-2 rounded-full bg-gray-600 hover:bg-blue-700 transition-colors"
        >
          {/* Send icon */}
          <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
            <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="white"/>
          </svg>
        </button>
      </div>
      {/* Disclaimer */}
      <div className="text-gray-800 text-xs mt-2 text-center w-full max-w-3xl">Made by Gaurav Srivastav using Together AI API key</div>
    </div>
    </div>
  );
}

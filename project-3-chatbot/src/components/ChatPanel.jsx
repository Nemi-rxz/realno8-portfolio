import { useState, useRef, useEffect } from "react";
import listings from "../data/listings";
import { fmtShort } from "../utils/format";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `You are Nova, a professional real estate AI assistant for RealNov8 Group — a smart real estate company focused on sustainable cities in Africa.

You help clients browse, understand, and make decisions about Nigerian real estate listings. You are knowledgeable, concise, and professional.

Here is the full listings database you have access to:
${JSON.stringify(listings, null, 2)}

Your capabilities:
1. Answer questions about any listing (price, location, features, ROI)
2. Filter and recommend properties based on user criteria (city, budget, type, bedrooms)
3. Explain SDG sustainability scores (SDG 6 Clean Water, SDG 7 Clean Energy, SDG 11 Sustainable Cities, SDG 13 Climate Action)
4. Give general real estate advice (buying vs renting, ROI analysis, Nigerian market insights)
5. Help users understand mortgages, property investment, and market trends in Nigeria
6. Compare properties side by side when asked

When recommending properties, always mention the price in Naira, ROI %, and sustainability score.
When explaining SDG scores, be educational but concise.
Keep responses professional but conversational. Use bullet points for lists.
Always sign off as Nova from RealNov8 Group when introducing yourself.`;

export default function ChatPanel({ onFilter }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm **Nova**, your RealNov8 AI assistant. I can help you find properties, explain sustainability scores, and answer any real estate questions. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updated.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      // Auto-filter listings based on city mentions
      const cities = ["Lagos", "Abuja", "Port Harcourt", "Enugu"];
      const mentioned = cities.find((c) => input.toLowerCase().includes(c.toLowerCase()));
      if (mentioned) onFilter(mentioned);
      else if (input.toLowerCase().includes("all") || input.toLowerCase().includes("every")) onFilter(null);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Connection error. Please check your internet and try again." }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const renderMsg = (content) => {
    // Basic markdown: bold, bullets
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n- /g, "<br/>• ")
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-avatar">N</div>
        <div>
          <div className="chat-name">Nova</div>
          <div className="chat-sub">RealNov8 AI Assistant</div>
        </div>
        <div className="chat-badge">AI</div>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.role === "assistant" && <div className="msg-avatar">N</div>}
            <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: renderMsg(m.content) }} />
          </div>
        ))}
        {loading && (
          <div className="msg assistant">
            <div className="msg-avatar">N</div>
            <div className="msg-bubble typing"><span /><span /><span /></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-suggestions">
        {["Show Lagos properties", "Best ROI listings", "Explain SDG scores", "Under ₦100M"].map((s) => (
          <button key={s} className="suggestion" onClick={() => { setInput(s); }}>{s}</button>
        ))}
      </div>

      <div className="chat-input-row">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about properties, sustainability, ROI..."
          rows={1}
        />
        <button className="send-btn" onClick={send} disabled={loading || !input.trim()}>
          ➤
        </button>
      </div>
    </div>
  );
}
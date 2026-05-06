import { useEffect, useRef, useState } from "react";
import { mergeFilters, parseChatFilters } from "../utils/chatFilters";

const escapeHtml = (content) =>
  content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const formatMessage = (content) =>
  escapeHtml(content)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n- /g, "<br/>&bull; ")
    .replace(/\n/g, "<br/>");

export default function ChatPanel({ onApplyFilters }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm **Nova**, your RealNov8 AI assistant. I can help you find properties, explain sustainability scores, and answer real estate questions. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) {
      return;
    }

    const question = input.trim();
    const userMsg = { role: "user", content: question };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");

    const { filters, reset } = parseChatFilters(question);
    onApplyFilters?.((previous) => mergeFilters(previous, filters, reset));

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updated.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `chat_${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't get a response. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "";
      const content = /Missing GROQ_API_KEY/i.test(errorMessage)
        ? "The server-side chatbot key is not configured yet. Add `GROQ_API_KEY` in the deployment environment."
        : "Connection error. Please check the API settings and your internet connection, then try again.";

      setMessages((prev) => [...prev, { role: "assistant", content }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
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
        {messages.map((message, index) => (
          <div key={index} className={`msg ${message.role}`}>
            {message.role === "assistant" && <div className="msg-avatar">N</div>}
            <div
              className="msg-bubble"
              dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
            />
          </div>
        ))}

        {loading && (
          <div className="msg assistant">
            <div className="msg-avatar">N</div>
            <div className="msg-bubble typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-suggestions">
        {[
          "Show Lagos properties",
          "Best ROI listings",
          "Explain SDG scores",
          "3-bed apartments in Lagos under NGN 100M",
        ].map((suggestion) => (
          <button
            key={suggestion}
            className="suggestion"
            onClick={() => {
              setInput(suggestion);
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="chat-input-row">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about properties, sustainability, ROI..."
          rows={1}
        />
        <button className="send-btn" onClick={send} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

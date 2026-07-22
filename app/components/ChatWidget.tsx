"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";

type Message = { role: "user" | "assistant"; content: string };

const WHATSAPP_NUMBER = "5491171410652";

export default function ChatWidget() {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t("greeting") },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("Chat widget error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <style>{`
        @keyframes chatFloatIn {
          0% { opacity: 0; transform: translateY(16px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      {open && (
        <div
          className="absolute bottom-full right-0 mb-3 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-black/10 flex flex-col overflow-hidden z-10"
          style={{ animation: "chatFloatIn 0.25s ease-out" }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between text-white"
            style={{ background: "var(--brand-primary)" }}
          >
            <span className="font-bold text-sm uppercase tracking-wide">{t("botName")}</span>
            <button onClick={() => setOpen(false)} aria-label={t("closeChat")}>
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm [&_p]:m-0 [&_ul]:my-1 [&_ul]:pl-4 [&_a]:underline ${
                  m.role === "user"
                    ? "self-end text-white"
                    : "self-start bg-[var(--brand-accent)] text-[var(--brand-text-primary)]"
                }`}
                style={m.role === "user" ? { background: "var(--brand-primary)" } : undefined}
              >
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="self-start px-3 py-2 rounded-xl text-sm bg-[var(--brand-accent)] text-[var(--brand-text-secondary)]">
                {t("typing")}
              </div>
            )}
            {error && (
              <div className="self-start px-3 py-2 rounded-xl text-sm bg-red-50 text-red-600">
                {t("sendError")}
              </div>
            )}
          </div>

          <div className="p-2 border-t border-black/10 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t("placeholder")}
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-black/10 outline-none focus:border-[var(--brand-primary)]"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              aria-label={t("sendMessage")}
              className="p-2 rounded-lg text-white disabled:opacity-50"
              style={{ background: "var(--brand-primary)" }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-end gap-3">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center hover:opacity-90 transition-opacity"
      >
        <span
          className="text-sm font-semibold whitespace-nowrap pl-4 pr-6 py-3 rounded-full shadow-lg -mr-4"
          style={{ background: "var(--brand-accent)", color: "var(--brand-text-primary)" }}
        >
          {t("whatsappBubble")}
        </span>
        <span className="flex items-center justify-center w-11 h-11 rounded-full shadow-lg bg-[#25D366] shrink-0 z-10">
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.81-.11-.42-.13-.95-.31-1.64-.6-2.88-1.24-4.76-4.15-4.9-4.34-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1.01-2.4.26-.29.58-.36.77-.36l.55.01c.18.01.42-.07.65.5.24.58.82 1.99.89 2.13.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.63.77 1.91.91.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
          </svg>
        </span>
      </a>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("openChat")}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        style={{ background: "var(--brand-primary)" }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      </div>
    </div>
  );
}

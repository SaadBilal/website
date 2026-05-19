"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "What's your tech stack?",
  "Are you available for hire?",
  "Tell me about your experience",
  "What projects have you built?",
];

const botResponses: Record<string, string> = {
  default: "Thanks for your message! I'm Saad's AI assistant. For detailed inquiries, please use the contact form or reach out directly at iamsaadbilal@gmail.com",
  "tech stack": "I specialize in Python (FastAPI, Django), React/Next.js, AWS cloud architecture, Docker, Kubernetes, PostgreSQL, and more. Check out the Tech Stack page for the full breakdown!",
  "available": "Yes! I'm currently open to senior remote roles, consulting engagements, and technical leadership opportunities. Use the Contact page to get in touch or schedule a call via Calendly.",
  "experience": "I have 10+ years of experience building enterprise systems. Currently at YouAttest as a Senior Full-Stack Engineer & Solutions Architect. Check the Experience page for the full timeline.",
  "projects": "I've built YouAttest (enterprise IGA platform), Swipbox (IoT logistics), Tabibi (telemedicine), NewsMix (AI news), and more. Visit the Projects page for detailed case studies!",
  "hire": "Absolutely! I'm available for senior remote roles, consulting, and technical leadership. Head to the Contact page or schedule a call at calendly.com/iamsaadbilal.",
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== "default" && lower.includes(key)) return response;
  }
  return botResponses.default;
}

export function AIChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [minimized, setMinimized] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Saad's AI assistant 👋 Ask me anything about his experience, skills, or availability.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate response delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getResponse(text),
    };
    setMessages((m) => [...m, botMsg]);
    setLoading(false);
  };

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96"
          >
            <div className="rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Saad&apos;s Assistant</div>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                      Online
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMinimized(!minimized)}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
                    aria-label="Minimize chat"
                  >
                    <Minimize2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
                    aria-label="Close chat"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {!minimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    {/* Messages */}
                    <div className="h-72 overflow-y-auto p-4 space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex gap-2",
                            msg.role === "user" ? "flex-row-reverse" : "flex-row"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs",
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted border border-border"
                            )}
                          >
                            {msg.role === "user" ? (
                              <User className="h-3.5 w-3.5" />
                            ) : (
                              <Bot className="h-3.5 w-3.5 text-primary" />
                            )}
                          </div>
                          <div
                            className={cn(
                              "max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                : "bg-muted text-foreground rounded-tl-sm"
                            )}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {loading && (
                        <div className="flex gap-2">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted border border-border">
                            <Bot className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick replies */}
                    {messages.length === 1 && (
                      <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                        {quickReplies.map((reply) => (
                          <button
                            key={reply}
                            onClick={() => sendMessage(reply)}
                            className="px-2.5 py-1 rounded-full text-xs border border-border bg-muted hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Input */}
                    <div className="p-3 border-t border-border">
                      <form
                        onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                        className="flex gap-2"
                      >
                        <input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Ask me anything..."
                          className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                          disabled={loading}
                        />
                        <Button
                          type="submit"
                          size="icon-sm"
                          variant="gradient"
                          disabled={!input.trim() || loading}
                          aria-label="Send message"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        onClick={() => { setOpen(!open); setMinimized(false); }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Notification dot */}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
            1
          </span>
        )}
      </motion.button>
    </>
  );
}

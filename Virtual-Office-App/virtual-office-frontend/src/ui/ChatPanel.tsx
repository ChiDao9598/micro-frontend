import { useState, useRef, useEffect, FormEvent } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useChatSync } from '../networking/handlers/useChatSync';

const ChatPanel = () => {
  const messages = useChatStore((s) => s.messages);
  const sendMessage = useChatSync();
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) setIsOpen(true);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setText('');
  };

  return (
    <div className="w-72">
      {/* Toggle button — shows unread indicator when closed */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="
          mb-1 ml-auto flex items-center gap-2 px-3 py-1.5
          bg-[#0d0d18]/90 border border-white/[0.07] rounded-lg
          text-white/50 text-xs hover:text-white/80 transition-colors
          backdrop-blur-md
        "
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 3V3a1 1 0 0 1 1-1z" />
        </svg>
        Chat
        {messages.length > 0 && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#61DAFB]" />
        )}
      </button>

      {isOpen && (
        <div className="bg-[#0d0d18]/90 border border-white/[0.07] rounded-xl overflow-hidden backdrop-blur-md">
          {/* Message list */}
          <div className="h-48 overflow-y-auto p-3 space-y-2 scrollbar-thin">
            {messages.length === 0 ? (
              <p className="text-white/20 text-xs text-center mt-4">
                No messages yet
              </p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: msg.playerColor }}
                    >
                      {msg.playerName}
                    </span>
                    <span className="text-white/20 text-[9px]">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-white/75 text-xs leading-relaxed break-words">
                    {msg.text}
                  </p>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex border-t border-white/[0.07]">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Say something..."
              maxLength={200}
              className="
                flex-1 px-3 py-2 text-xs bg-transparent
                text-white placeholder-white/25
                focus:outline-none
              "
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-3 py-2 text-[#61DAFB] hover:text-white disabled:opacity-30 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M15 8L1 1l3 7-3 7 14-7z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;

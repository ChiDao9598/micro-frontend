import { create } from 'zustand';
import { ChatMessage } from '../types/chat';

const MAX_MESSAGES = 50;

interface ChatStore {
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id'>) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, id: crypto.randomUUID() },
      ].slice(-MAX_MESSAGES), // rolling window — keeps memory bounded
    })),

  clearMessages: () => set({ messages: [] }),
}));

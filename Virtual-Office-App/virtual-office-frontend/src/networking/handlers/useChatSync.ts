import { useEffect } from 'react';
import { useSocket } from '../useSocket';
import { SOCKET_EVENTS } from '../events';
import { useChatStore } from '../../store/useChatStore';
import type { ChatMessage } from '../../types/chat';

// Returns a stable emit function for sending chat messages.
// Registers the chat:received listener for the lifetime of the component.
export const useChatSync = (): ((text: string) => void) => {
  const socket = useSocket();

  useEffect(() => {
    const addMessage = useChatStore.getState().addMessage;

    socket.on(SOCKET_EVENTS.CHAT_RECEIVED, (msg: ChatMessage) => {
      addMessage(msg);
    });

    return () => {
      socket.off(SOCKET_EVENTS.CHAT_RECEIVED);
    };
  }, [socket]);

  return (text: string) => {
    socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, { text });
  };
};

import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket } from './socket';

// Returns the socket singleton and ensures event listeners are cleaned up
// when the component that registered them unmounts.
export const useSocket = (): Socket => {
  const socketRef = useRef<Socket>(getSocket());
  return socketRef.current;
};

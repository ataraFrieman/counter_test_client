import { useState } from "react";

import SOCKET_ENENTS from "../consttants/socketEvents";
import useWebSocket from "../hooks/useWebSocket";

interface CounterProps {
  initialCounter?: number;
}

export default function Counter({ initialCounter = 0 }: CounterProps) {
  const [counter, setCounter] = useState<number>(initialCounter);

  const { sendMessage } = useWebSocket({
    onRequestCounter: () => {
      sendMessage(SOCKET_ENENTS.SET_COUNTER_VALUE, counter);
    },
  });

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Counter : {counter}</h1>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
}

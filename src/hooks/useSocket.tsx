import { useSignal } from "@builder.io/qwik";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const useSocket = (nameEvent: string) => {
  const isConnect = useSignal<boolean>(false);
  const events = useSignal<Record<string, any>[]>([]);

  socket.on("connect", () => {
    isConnect.value = true;
  });

  socket.on("disconnect", () => {
    isConnect.value = false;
  });

  socket.on(nameEvent, (data) => {
    events.value = [...events.value, data];
  });

  return { events, isConnect };
};

export { useSocket };

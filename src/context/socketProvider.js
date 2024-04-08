import { createContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => {
        const accessToken = localStorage.getItem("access-token");
        if (!accessToken) {
            return null;
        }
        return io(process.env.REACT_APP_SERVER_URL, {
            extraHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
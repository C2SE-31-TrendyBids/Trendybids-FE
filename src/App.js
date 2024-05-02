import {Routes, Route, useLocation} from "react-router-dom";
import { publicRouter, routerUser, routerCensor, routerAdmin, routerAllRole } from "./routes/index";
import { Default } from "./layouts/index";
import React, {Fragment, useContext, useEffect} from "react";
import { NotFound } from "./pages/index"
import "./App.css"
import {toast} from "sonner";
import {useDispatch} from "react-redux";
import SocketContext from "./context/socketProvider";
import {fetchUnseenConversationsThunk} from "./redux/slices/conversation";

const App = () => {
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem("access-token");
    const socket = useContext(SocketContext)
    const location = useLocation();

    // Handle notifications
    useEffect(() => {
        if (accessToken) {
            socket.on('onMessage', (data) => {
                if (!location.pathname.includes('/messages')) {
                    toast.info(`New message from: ${data?.user?.fullName.split(' ')[0]}`);
                }
                dispatch(fetchUnseenConversationsThunk(accessToken));
            });

            socket.on('onConversation', (data) => {
                toast.info(`New message from stranger: ${data?.latestMessage?.user?.fullName.split(' ')[0]}`);
                dispatch(fetchUnseenConversationsThunk(accessToken));
            });

            return () => {
                socket.off('onMessage');
                socket.off('onConversation');
            };
        }
    }, [accessToken, socket, location]);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchUnseenConversationsThunk(accessToken));
        }
    }, []);

    const renderRoutes = (routes) => {
        return routes.map((route, index) => {
            const Page = route.component;
            let LayoutDynamic = Default;
            if (route.layout) LayoutDynamic = route.layout;
            else if (route.layout === null) LayoutDynamic = Fragment;
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <LayoutDynamic>
                            <Page />
                        </LayoutDynamic>
                    }
                />
            );
        });
    }

    return (
        <Routes>
            {renderRoutes(publicRouter)}
            {renderRoutes(routerUser)}
            {renderRoutes(routerCensor)}
            {renderRoutes(routerAdmin)}
            {renderRoutes(routerAllRole)}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
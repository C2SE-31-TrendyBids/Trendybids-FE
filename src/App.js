import {Routes, Route, useLocation} from "react-router-dom";
import { publicRouter, routerUser, routerCensor, routerAdmin, routerAllRole } from "./routes/index";
import { Default } from "./layouts/index";
import React, {Fragment, useCallback, useContext, useEffect} from "react";
import { NotFound } from "./pages/index"
import "./App.css"
import {toast} from "sonner";
import {useDispatch} from "react-redux";
import SocketContext from "./context/socketProvider";
import {addConversation, fetchUnseenConversationsThunk} from "./redux/slices/conversation";
import {addNotifications} from "./redux/slices/notification";
import PushNotification from "./components/NotificationPopup/PushNotification";

const App = () => {
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem("access-token");
    const socket = useContext(SocketContext)
    const location = useLocation();

    const showNotification = useCallback((content, linkAttach, type= "default", userName) => {
        return toast(
            <PushNotification item={{
                content,
                createdAt: new Date(),
                linkAttach,
                userName: type === "message" ? userName : null
            }}/>,
            {position: "bottom-right", style: {padding: 0}, duration: 4000}
        )
    }, []);

    // Handle notifications from socket
    const handleOnMessage = useCallback((data) => {
        if (!location.pathname.includes('/messages')) {
            const username = data?.user?.fullName.split(' ')[0];
            const content = data?.content !== null ? `: ${data?.content}` : " has sent an attachment";
            showNotification(content, `/messages/${data?.conversationId}`, "message", username);
        }
        dispatch(fetchUnseenConversationsThunk(accessToken));
    }, [accessToken, location, dispatch, showNotification]);

    const handleOnConversation = useCallback((data) => {
        console.log(data)
        if (!location.pathname.includes('/messages')) {
            showNotification(`New message from stranger: ${data?.latestMessage?.user?.fullName.split(' ')[0]}`, `/messages/${data?.id}`);
        } else {
            dispatch(addConversation(data));
        }
        dispatch(fetchUnseenConversationsThunk(accessToken));
    }, [accessToken, dispatch, showNotification]);

    const handleOnNotification = useCallback((data) => {
        showNotification(data?.content, data?.linkAttach);
        dispatch(addNotifications(data))
    }, [dispatch, showNotification]);

    useEffect(() => {
        if (accessToken) {
            socket.on('onMessage', handleOnMessage);
            socket.on('onConversation', handleOnConversation);
            socket.on('onNotification', handleOnNotification);

            return () => {
                socket.off('onMessage');
                socket.off('onConversation');
                socket.off('onNotification');
            };
        }
    }, [accessToken, socket, handleOnMessage, handleOnConversation, handleOnNotification]);

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
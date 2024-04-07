import {Routes, Route} from "react-router-dom";
import {publicRouter, routerUser, routerCensor, routerAdmin, routerAllRole} from "./routes/index";
import {Default} from "./layouts/index";
import React, {Fragment} from "react";
import {NotFound} from "./pages/index"
import "./App.css"

const App = () => {
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
                            <Page/>
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
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
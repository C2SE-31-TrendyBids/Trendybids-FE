import {Routes, Route} from "react-router-dom";
import {router} from "./routes/index";
import {Default} from "./layouts/index";
import React, {Fragment} from "react";
import {NotFound} from "./pages/index"

function App() {
    return (
        <Routes>
            {router.map((route, index) => {
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
            })}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
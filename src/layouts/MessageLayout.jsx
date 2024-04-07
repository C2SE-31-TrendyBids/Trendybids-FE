import Header from "../components/Header/Header";
import {Helmet} from "react-helmet";

const MessageLayout = ({children}) => {
    return (
        <div className="wrapper">
            <Helmet>
                <title>Chat | TrendyBids</title>
            </Helmet>
            <Header/>
            {children}
        </div>
    );
};

export default MessageLayout;
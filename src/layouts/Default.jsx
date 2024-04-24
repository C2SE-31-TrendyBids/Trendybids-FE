import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ChatBot from '../components/ChatBot/ChatBot'


const Default = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
            <ChatBot />

        </div>
    )
}

export default Default;

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ChatBot from '../components/ChatBot/ChatBot'


const Default = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
            {/* <iframe
                src="http://localhost:4000"
                title="Chatbox"
                className='fixed right-3 bottom-3 w-[600px] h-[750px]'
            /> */}
            <ChatBot />

        </div>
    )
}

export default Default;

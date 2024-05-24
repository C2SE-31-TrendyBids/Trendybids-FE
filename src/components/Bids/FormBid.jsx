import SuggestBid from "./SuggestBid";
import React, {useState, useEffect, useContext} from "react";
import {LuAlarmClock} from "react-icons/lu";
import {useDispatch, useSelector} from "react-redux";
import SocketContext from "../../context/socketProvider";
import {toast} from "sonner";
import {addBidPrice} from "../../redux/slices/bidPrice";
import MethodContext from "../../context/methodProvider";

const FormBid = ({sessionId, startingPrice}) => {
    const {anonymizeFullName} = useContext(MethodContext);
    const [bidPrice, setBidPrice] = useState('');
    const initialSuggestBidPrice = [
        {id: 1, label: "Background", text: "+10% cool gray", type: "percent", value: 0.1, active: false},
        {id: 2, label: "Background", text: "+20% cool gray", type: "percent", value: 0.2, active: false},
        {id: 3, label: "Background", text: "+30% cool gray", type: "percent", value: 0.3, active: false},
        {id: 4, label: "Background", text: "+10$ cool gray", type: "price", value: 10, active: false},
        {id: 5, label: "Background", text: "+20$ cool gray", type: "price", value: 20, active: false},
        {id: 6, label: "Background", text: "+30$ cool gray", type: "price", value: 30, active: false},
    ]
    const [suggestBids, setSuggestBis] = useState(initialSuggestBidPrice);
    const [timeLeft, setTimeLeft] = useState(0);
    const [countdownCompleted, setCountdownCompleted] = useState(true);
    const {highestPrice} = useSelector((state) => state.bidPrice)
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const userId = JSON.parse(localStorage.getItem('auth')).id
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const startCountdown = (countdownTime) => {
        setTimeLeft(countdownTime); // Set the initial time
        setCountdownCompleted(false); // Reset countdown completion state
        const countdownInterval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1); // Decrease the time by 1 second
        }, 1000); // Runs every second

        // Clear interval when time reaches 0
        setTimeout(() => {
            clearInterval(countdownInterval);
            setCountdownCompleted(true); // Set countdown completion state
        }, countdownTime * 1000); // Convert countdown time to milliseconds
    };


    const handleSuggestBid = (item) => {
        // handle set suggestion active
        setSuggestBis(prevState => (
            prevState.map(suggest => ({
                ...suggest,
                active: item?.id === suggest.id
            }))
        ));
        // handle set bid price
        let numericHighestPrice = parseFloat(highestPrice);
        if (item?.type === "percent") {
            setBidPrice((numericHighestPrice * (1 + item.value)).toFixed(2));
        } else if (item?.type === "price") {
            setBidPrice((numericHighestPrice + item.value).toFixed(2));
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('onBidPrice', (data) => {
                console.log("data: " + JSON.stringify(data));
                // handle bid
                if (data?.status === "success") {
                    userId === data.bidPrice.user.id && toast.success(data.message)
                    dispatch(addBidPrice({data, anonymizeFullName}));
                    setSuggestBis(initialSuggestBidPrice);
                } else {
                    userId === data.userId && toast.error(data.message)
                }
            });

            return () => {
                // Clean up the subscription when component unmounts
                socket.off('onBidPrice');
            };
        }
    }, [socket, countdownCompleted]);

    const handleBidPrice = async (e) => {
        e.preventDefault();
        const priceCondition = highestPrice || startingPrice
        if (bidPrice > priceCondition) {
            if (bidPrice > priceCondition * 2) {
                toast.error("Bid price must be less than twice the highest price!");
                return;
            }
            if (countdownCompleted) {
                // Start countdown with 5 seconds when button is clicked
                startCountdown(5);
                setBidPrice("")
                socket.emit('bidPrice.create', {sessionId: sessionId, bidPrice: bidPrice});
            }
        } else {
            toast.error("Bid price must be greater than the current highest price!");
        }
    }

    return (
        <div className="mt-4">
            <h3 className="font-bold text-lg">Suggest</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {
                    suggestBids.map(suggest => {
                        return (
                            <SuggestBid key={suggest?.id} item={suggest}
                                        handleSuggestBidPrice={handleSuggestBid}/>
                        )
                    })
                }
            </div>

            <form className="mt-4 flex items-center" onSubmit={handleBidPrice}>
                <button
                    disabled={!countdownCompleted}
                    className={`px-6 py-2 ${countdownCompleted ? "bg-[#0033FF]" : "bg-[#0033FF] opacity-60"}   text-white font-semibold text-[16px] rounded-full mr-3 transition-all`}>Bid
                    now
                </button>
                <input className="px-4 py-2 focus:none outline-none border-gray-300 border-[2px] rounded-full"
                       type="text"
                       value={bidPrice}
                       onChange={(e) => {
                           const price = e.target.value
                           if (!isNaN(price)) {
                               const numericPrice = parseFloat(price);
                               // Check if bidPrice does not exceed twice the highest price
                               if (numericPrice <= 1000 && numericPrice > 0) {
                                   setBidPrice(numericPrice);
                                   setSuggestBis(initialSuggestBidPrice);
                               } else
                                   setBidPrice(price);
                           } else
                               toast.error("Bid price must be a number and not negative!");
                       }}
                       placeholder="priceBid"/>
                {timeLeft > 0 ? (
                    <div className="ml-2 flex items-center">
                        {formatTime(timeLeft)}<LuAlarmClock size={15}/>
                    </div>
                ) : (
                    <p className="ml-2 ">Slow-mode is enabled</p>
                )}
            </form>
        </div>)

}


export default FormBid;
import {IoCaretForwardOutline} from "react-icons/io5";
import {ImSearch} from "react-icons/im";
import Reveal from "../../components/Animate/Reveal";
import Slide from "../../components/Animate/Slide";
import Category from "../../components/HomeComponent/Category";
import TrendingAuction from "../../components/HomeComponent/TrendingAuction";
import UpcomingAuction from "../../components/HomeComponent/UpcomingAuction";
import ProductPickList from "../../components/HomeComponent/ProductPickList";
import PremierSeller from "../../components/HomeComponent/PremierSeller";
import RecentNew from "../../components/HomeComponent/RecentNew";
import ProductPick from "../../components/HomeComponent/ProductPick";
import {useEffect ,useState} from "react";
import * as censorServices from "../../services/censor"

const Home = () => {
    const [auctionSessions , setAuctionSession] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const responseCensor = await censorServices.getAuctionSession({})
            responseCensor?.status === 200 && setAuctionSession(responseCensor?.data?.productAuctions)
        }
        fetchAPI()
    }, [])

    return (
        <>
            <div className="relative h-[460px] w-full mb-10">
                <img className="h-full w-full object-cover"
                     src="https://1.bp.blogspot.com/-YR-sT7AVJFY/YT3KpuJRPBI/AAAAAAAAH0A/b8NdXw-1c4oKH1BODi-rCIBvmE3BY8MnQCLcBGAsYHQ/s0-rw/bo-hinh-nen-phong-canh-chat-luong-cao-full-hd-dep-nhat-34.jpg"
                     alt="Background"/>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#485367]/70"></div>
                <div
                    className="absolute top-1/2 -translate-y-1/2 left-[13%] mx-auto">
                    <Reveal
                        children={
                            <>
                                <h1 className="text-4xl text-white font-bold mb-5">Join Our Next Auction! Find<br></br>
                                    Your Equipment</h1>
                                <div className="hidden p-2 bg-white rounded sm:flex items-center gap-2">
                                    <ImSearch className="rotate-90" size={30}/>
                                    <input
                                        className="w-full py-2 px-2 text-black outline-none bg-gray-200 placeholder-gray-300::placeholder focus:placeholder-black::placeholder rounded"
                                        type="text" placeholder="I'am lookinh for..."/>
                                    <button className="px-6 py-2 bg-black text-white rounded-lg font-medium">Search
                                    </button>
                                </div>
                                <div className="mt-7 flex items-center gap-2">
                                    <div className="bg-red-500 p-1 rounded-full">
                                        <button className=" hover:animate-ping bg-red-500 p-2 rounded-full">
                                            <IoCaretForwardOutline className="text-white" size={25}/>
                                        </button>
                                    </div>
                                    <h4 className="text-white uppercase text-[14px] font-medium">We are running our
                                        summer
                                        discount<br></br>
                                        Watch video to learn more</h4>
                                </div>
                            </>
                        }
                    />
                </div>
            </div>

            {/*Category*/}
            <Slide
                directionOfOperation={"left"}
                children={<Category/>}
            />

            {/*Trending Auction*/}
            <Slide
                children={
                    <TrendingAuction auctionSessions={auctionSessions}/>
                }
            />

            {/*Upcoming Auction*/}
            <Slide
                directionOfOperation={"left"}
                maxWidth={"100%"}
                children={<UpcomingAuction auctionSessions={auctionSessions} />}
            />

            {/*Product Item*/}
            <Reveal
                maxWidth={"100%"}
                children={<ProductPick/>}
            />

            {/*Product Pick List*/}
            <Slide
                directionOfOperation={"left"}
                children={<ProductPickList auctionSessions={auctionSessions} />}
            />

            {/*Premier Seller*/}
            <Reveal
                children={
                    <PremierSeller/>
                }
            />

            {/*Recent new*/}
            <Reveal
                children={<RecentNew/>}
            />


        </>
    )
}

export default Home;
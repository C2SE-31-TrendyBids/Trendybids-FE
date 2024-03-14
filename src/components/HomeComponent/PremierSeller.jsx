import Rating from "@mui/material/Rating";
import {HiChevronRight} from "react-icons/hi";

const PremierSeller = () => {


    return (
        <div className="px-10 mx-auto mt-20 mb-32">
            <h2 className="text-[#0B1133] text-2xl font-bold">Premier Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {[1, 2, 3, 4, 5, 6].map(() => {
                    return (
                        <div
                            className="relative bg-[#F2F3FA] group border-[#F3F4FB] border-[1.8px] hover:border-[#cbd0f1]  transition-all ">
                            <div
                                className="relative grid grid-cols-3 mb-2 p-5 bg-[url('https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-012.jpg')] object-cover">
                                <div className="col-span-2 mt-5 mb-7">
                                    <h3 className="text-[#0B1133] text-lg font-bold">Modern Auctions.
                                        Co.</h3>
                                    <Rating name="disabled" value={5}/>
                                    <p className="font-thin text-xm">Michigan, United States (US)</p>
                                </div>
                                <div
                                    className="absolute top-5 right-5 col-span-1 p-1 h-14 w-14 bg-white rounded">
                                    <img className="w-full h-full object-cover rounded"
                                         src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
                                         alt=""/>
                                </div>
                            </div>
                            <div
                                className="absolute right-9 -bottom-4 w-10 h-10 rounded-full bg-[#0033FF] flex items-center justify-center group-hover:right-7 transition-all">
                                <HiChevronRight className="text-white font-bold" size={50}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default PremierSeller
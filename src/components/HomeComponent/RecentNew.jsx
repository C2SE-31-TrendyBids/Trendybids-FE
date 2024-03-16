import Sport from "../../public/images/Sport-Category.png";
import {HiChevronRight} from "react-icons/hi";

const RecentNew = () => {


    return (
        <div className="px-10 mx-auto mt-20 mb-16 lg:mb-10">
            <h2 className="text-[#0B1133] text-2xl font-bold">Recent News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 ">
                {[1, 2, 3].map(() => {
                    return (
                        <div className="grid grid-rows-3">
                            <div
                                className="row-span-2 bg-[#FEC23A] flex justify-center items-center rounded-t-lg">
                                <img className="rounded-t-lg object-cover" src={Sport} alt=""/>
                            </div>
                            <div className="p-4 bg-[#F4F5FC]">
                                <div className="flex items-center mb-2">
                                    <p className="text-xs font-semibold text-gray-300 pr-2">December 28,
                                        2023</p>
                                    <div className="w-1 h-[2px] rounded bg-gray-300 mr-2"></div>
                                    <p className="text-xs font-bold mr-2">Freebies, News</p>
                                    <div className="w-1 h-[2px] rounded bg-gray-300 mr-2"></div>
                                </div>
                                <h4 className="text-lg font-bold text-[#0B1133]">19 Powerful Customer
                                    Experience
                                    Statistics to Know in 2021
                                </h4>
                                <p className="text-xs font-semibold flex items-center group hover:cursor-pointer">Lean
                                    More <HiChevronRight
                                        className="text-black mt-[1.6px] ml-0 group-hover:ml-2 transition-all"
                                        size={12}/></p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default RecentNew
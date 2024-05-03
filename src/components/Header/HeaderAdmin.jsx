import {LuBellRing} from "react-icons/lu";

const HeaderAdmin = ({pageName}) => {

    return (
        <div className="py-2 flex justify-between">
            <div className="">
                <p className="text-[12px] font-medium text-[#707EAE] ">Pages / {pageName}</p>
                <h1 className="text-xl font-bold text-[#2B3674]">Main {pageName}</h1>
            </div>
            <div className="">
                <div className="flex items-center gap-4 px-2 py-2 bg-white rounded-full">
                    <input type="text" className="px-4 py-1 rounded-full bg-[#F4F7FE] outline-none"
                           placeholder="Search..." />
                    <LuBellRing className="hover:cursor-pointer" size={20} />
                    <div className="w-8 h-8 rounded-full overflow-hidden ">
                        <img className="w-full h-full rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRtxzMn4CsknaQxUTFyfYVD9rrfAEdoFX-LMrSumgayw&s" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HeaderAdmin
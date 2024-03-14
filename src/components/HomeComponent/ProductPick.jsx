import Sport from "../../public/images/Sport-Category.png";
import {Link} from "react-router-dom";

const ProductPick = () => {

    return (
        <div>
            <h2 className="max-w-[1200px] mx-auto px-10 text-[#0B1133] text-2xl font-bold">Products picked
                by
                hand</h2>
            <div className="bg-[#EAECF9] w-full">
                <div className="max-w-[1200px] mx-auto px-10 mt-14 -translate-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-[#454B59] grid grid-cols-2 gap-5 py-4 px-2">
                            <img className="bg-transparent" src={Sport} alt=""/>
                            <div className="flex flex-col items-center justify-center gap-5">
                                <p className="text-xl font-bold text-white text-center">Headphone Trending
                                    JBL
                                    Harman</p>
                                <Link to={"/"}
                                      className="px-4 py-2 bg-[#FDB900] rounded-lg uppercase text-[13px] font-bold">Get
                                    in
                                    touch</Link>
                            </div>
                        </div>
                        <div className="bg-[#E9E4DE] grid grid-cols-2 gap-5 py-4 px-2">
                            <img className="bg-transparent" src={Sport} alt=""/>
                            <div className="flex flex-col items-center justify-center gap-5">
                                <p className="text-xl font-bold text-black text-center">Headphone Trending
                                    JBL
                                    Harman</p>
                                <Link to={"/"}
                                      className="px-4 py-2 bg-[#FDB900] rounded-lg text-[13px] uppercase font-bold">Get
                                    in
                                    touch</Link>
                            </div>
                        </div>
                        <div
                            className="bg-[#5FA5B1] grid grid-cols-2 gap-5 py-4 px-2 md:translate-x-1/2  lg:translate-x-0">
                            <img className="bg-transparent" src={Sport} alt=""/>
                            <div className="flex flex-col items-center justify-center gap-5">
                                <p className="text-xl font-bold text-white text-center">Headphone Trending
                                    JBL
                                    Harman</p>
                                <Link to={"/"}
                                      className="px-4 py-2 bg-[#FDB900] rounded-lg text-[13px] uppercase font-bold">Get
                                    in
                                    touch</Link>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                        <div className="bg-[#3D6FB6] grid grid-cols-2 gap-5 py-4 px-2">
                            <div className="flex flex-col items-center justify-center gap-5">
                                <p className="text-xl font-bold text-white text-center">Headphone Trending
                                    JBL
                                    Harman</p>
                                <Link to={"/"}
                                      className="px-4 py-2 bg-[#FDB900] rounded-lg text-[15px] uppercase font-bold">Get
                                    in
                                    touch</Link>
                            </div>
                            <img className="bg-transparent" src={Sport} alt=""/>
                        </div>

                        <div className="bg-[#FFC13D] grid grid-cols-2 gap-5 py-4 px-2">
                            <div className="flex flex-col items-center justify-center gap-5">
                                <p className="text-xl font-bold text-white text-center">Headphone Trending
                                    JBL
                                    Harman</p>
                                <Link to={"/"}
                                      className="px-4 py-2 bg-black text-white rounded-lg text-[15px] uppercase font-bold">Get
                                    in
                                    touch</Link>
                            </div>
                            <img className="bg-transparent" src={Sport} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductPick
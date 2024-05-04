import Rating from "@mui/material/Rating";
import {HiChevronRight} from "react-icons/hi";
import {useEffect, useState} from "react";
import * as censorServices from "../../services/censor";
import {Link} from "react-router-dom";

const PremierSeller = ({censorsList = []}) => {

    return (
        <div className="px-8 mx-auto mt-20 mb-12">
            <h2 className="text-[#0B1133] text-2xl font-bold">Premier Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {censorsList.map((item) => {
                    return (
                        <div
                            key={item?.id}
                            className="relative bg-[#F2F3FA] group border-[#F3F4FB] border-[1.8px] hover:border-[#cbd0f1] transition-all ">
                            <div
                                className="relative grid grid-cols-3 mb-2 p-5 bg-[url('https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-012.jpg')] object-cover">
                                <div className="col-span-2 mt-5 mb-7">
                                    <h3 className="text-[#0B1133] text-lg font-bold">{item?.name}</h3>
                                    <Rating name="disabled" value={5}/>
                                    <p className="font-thin text-xm">{item?.address}</p>
                                </div>
                                <div
                                    className="absolute top-5 right-5 col-span-1 p-1 h-14 w-14 bg-white rounded">
                                    <img className="w-full h-full object-cover rounded"
                                         src={item?.avatarUrl}
                                         alt={item?.name} />
                                </div>
                            </div>
                            <Link
                                to={`/censors/${item?.id}`}
                                relative={"route"}
                                className="absolute right-9 -bottom-4 w-8 h-8 rounded-full bg-[#0033FF] flex items-center justify-center group-hover:right-7 transition-all">
                                <HiChevronRight className="text-white font-bold" size={40}/>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default PremierSeller
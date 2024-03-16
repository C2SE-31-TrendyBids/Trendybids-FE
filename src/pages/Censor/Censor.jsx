import Reveal from "../../components/Animate/Reveal";
import {ImSearch} from "react-icons/im";
import {IoCaretForwardOutline} from "react-icons/io5";
import {GrFormNext} from "react-icons/gr";
import PremierSeller from "../../components/HomeComponent/PremierSeller";
import {useEffect, useState} from "react";
import * as censorServices from "../../services/censor";

const Censor = () => {

    const [censors, setCensors] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const responseCensor = await censorServices.getCensors({limit: 6})
            responseCensor?.status === 200 && setCensors(responseCensor?.data?.censors)
        }
        fetchAPI()
    }, [])

    return (
        <>
            <div className="relative h-[400px] w-full mb-10">
                <img className="h-full w-full object-cover"
                     src="https://1.bp.blogspot.com/-YR-sT7AVJFY/YT3KpuJRPBI/AAAAAAAAH0A/b8NdXw-1c4oKH1BODi-rCIBvmE3BY8MnQCLcBGAsYHQ/s0-rw/bo-hinh-nen-phong-canh-chat-luong-cao-full-hd-dep-nhat-34.jpg"
                     alt="Background"/>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#485367]/70"></div>
                <div
                    className="absolute top-1/2 -translate-y-1/2 left-[13%] mx-auto">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl text-white font-bold mb-5">Censor List</h1>
                    <p className="flex items-center text-lg text-white font-semibold">Home <GrFormNext
                        className='text-gray-300' size={22}/> Censor List</p>
                </div>
            </div>

            <Reveal
                children={<PremierSeller censorsList = {censors}/>}
            />
        </>
    )
}

export default Censor
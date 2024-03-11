import {FiMoreVertical} from "react-icons/fi";
import {LuChevronFirst} from "react-icons/lu";
import {LuChevronLast} from "react-icons/lu";
import {createContext, useContext, useEffect, useState} from "react"
import {Link} from "react-router-dom";
import logo from "../../public/images/logoTrendy.jpg"

const SidebarContext = createContext();

export default function Sidebar({children}) {
    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img src={logo}
                             className={`overflow-hidden transition-all scale-150 ${expanded ? "w-32" : "w-0"}`}
                             alt="sdf"/>
                        <button onClick={() => setExpanded((curr) => !curr)}
                                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <LuChevronFirst/> : <LuChevronLast/>}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{expanded}}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex p-3">
                        <img
                            src="https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI="
                            className="w-10 h-10 rounded-md" alt="sdf"/>
                        <div
                            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
                            <div className="leading-4">
                                <h4 className="font-semibold">TrendyBids</h4>
                                <span className="text-xs text-gray-600">TrendyBids@gmail.com</span>
                            </div>
                            <FiMoreVertical size={20}/>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}

export function SidebarItem({icon, text, alert}) {
    const {expanded} = useContext(SidebarContext)
    const [active, setActive] = useState("Home")

    function convertToLowerCase(text) {
        // Convert the string to lowercase
        let lowerCaseText = text.toLowerCase();

        // Split the words in the string
        let words = lowerCaseText.split(' ');

        // Iterate through each word to check and add a hyphen (-) between two-character words
        for (let i = 1; i < words.length; i++) {
            if (words[i - 1].length === 2 && words[i].length === 2) {
                words[i - 1] += '-';
            }
        }
        // Combine the words back to form a new string
        let result = words.join(' ');

        return result.replace(/ /g, '-'); // Replace spaces with hyphens
    }


    return (
        <Link
            to={`${text === "Home" ? "/" : `/admin/${convertToLowerCase(text)}`} `}
            relative={"route"}
            onClick={() => setActive(text)}>
            <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active === text ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
                {icon}

                <p className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                    {text}
                </p>

                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>
                    </div>
                )}

                {!expanded && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                        {text}
                    </div>
                )}
            </li>
        </Link>
    )
}
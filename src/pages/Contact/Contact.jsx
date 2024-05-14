import React from "react";
import { Link } from "react-router-dom";
import Map from "../../components/Map/Map";
import { motion } from 'framer-motion'
import { MdOutlineNavigateNext } from "react-icons/md";
const Contact = () => {
    const submitForm = () => {
        console.log("Submit Success!");
    };

    return (
        <div className=" mx-auto">
            <div className="relative w-full ">
                <img
                    src="https://cdn.pixabay.com/photo/2021/04/15/11/52/office-desk-6180921_1280.jpg"
                    alt="About page"
                    className="w-full h-[350px] object-cover pixelated"
                />
                <span className="absolute top-40 left-10 lg:top-36 lg:left-[130px] mb-4 text-4xl text-blue-500 font-extrabold drop-shadow-md"> Contact Us
                    <div className="flex mt-2 text-lg">
                        <div className="text-black hover:text-blue-500">
                            <Link to="/" className="">
                                Home
                            </Link>
                        </div>
                        <div className="text-black">
                            <span className=" flex items-center">
                                <span className="mx-2"><MdOutlineNavigateNext /> </span>
                                <span className="">Contact Us</span>
                            </span>
                        </div>
                    </div>
                </span>
            </div>
            <div
                className="max-w-[1200px] grid sm:grid-cols-2 gap-16 my-20 mx-auto bg-white text-[#333] font-[sans-serif] px-8 sm:px-0">
                <div className="mt-8 space-y-6">
                    <h1 className="text-2xl font-extrabold text-blue-500">
                        Get In Touch
                    </h1>
                    <p className="text-sm text-gray-500 mt-3">
                        Have questions, feedback, or need assistance? Don't hesitate to
                        reach out to us! Our dedicated support team is here to help you with
                        any inquiries regarding our auction platform. Whether you're a
                        buyer, seller, or just curious about how our platform works, we're
                        committed to providing you with the best experience possible.
                    </p>
                    <div className="mt-12">
                        <h2 className="text-lg font-extrabold">Email</h2>
                        <ul className="mt-3">
                            <li className="flex items-center">
                                <div className=" h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <a
                                        href="https://www.gmail.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="h-9.5"
                                            src="https://cdn.icon-icons.com/icons2/2642/PNG/512/google_mail_gmail_logo_icon_159346.png"
                                            alt="email"
                                        />
                                    </a>
                                </div>
                                <a
                                    href="https://www.google.com/intl/vi/gmail/about/"
                                    className="text-[#007bff] text-sm ml-3"
                                >
                                    <small className="block">Mail</small>
                                    <strong>trendybids@gmail.com</strong>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-12">
                        <h2 className="text-lg font-extrabold">Socials</h2>
                        <ul className="flex mt-3 space-x-4">
                            <li className=" h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        className="h-9.5"
                                        src="https://img.freepik.com/premium-vector/vinnytsia-ukraine-april-27-2023-popular-social-media-icon-facebook_545793-1680.jpg?w=740"
                                        alt="facebook"
                                    />
                                </a>
                            </li>
                            <li className=" h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                <a
                                    href="https://www.Linkedin.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kMS0xMC5wbmc.png"
                                        alt="Linkedin"
                                        className="h-8"
                                    />
                                </a>
                            </li>
                            <li className=" h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg?w=740&t=st=1710588647~exp=1710589247~hmac=00f92226a1bf3c71d8c7ccc9d83cfafca160ffef5da68b3d4a8eb43ca5e69bb2"
                                        alt="instagram"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 space-y-6">
                    <h1 className="text-2xl font-extrabold text-center text-blue-500">
                        Contact Form
                    </h1>
                    <form className="mt-8 space-y-6">
                        <div>
                            <label className="text-sm font-semibold block mb-2">
                                Your Name
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Name"
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold block mb-2">
                                Your Email
                            </label>
                            <input
                                required
                                type="email"
                                placeholder="Email"
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold block mb-2">
                                Your Phone
                            </label>
                            <input
                                required
                                type="number"
                                placeholder="Phone"
                                className="w-full rounded-md py-2.5 px-4 border text-sm outline-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold block mb-2">
                                Message
                            </label>
                            <textarea
                                required
                                placeholder="Message"
                                rows="6"
                                className="w-full rounded-md px-4 border text-sm pt-2.5 outline-blue-500"
                            ></textarea>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={submitForm}
                            type="button"
                            className="text-white  bg-[#007bff] hover:bg-blue-600 font-semibold rounded text-sm px-6 py-3 w-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16px"
                                height="16px"
                                fill="#fff"
                                className="mr-2 inline"
                                viewBox="0 0 548.244 548.244"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                                    clipRule="evenodd"
                                    data-original="#000000"
                                />
                            </svg>
                            Send Message
                        </motion.button>
                    </form>
                </div>
            </div>
            <div className="grid md:grid-cols-4 gap-8 my-20 mx-28 shadow-2xl border border-blue-100 rounded-2xl shadow-blue-50 p-6">
                <div className="flex flex-col items-center bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 fill-blue-600"
                        viewBox="0 0 512 512"
                    >
                        <path
                            d="M341.476 338.285c54.483-85.493 47.634-74.827 49.204-77.056C410.516 233.251 421 200.322 421 166 421 74.98 347.139 0 256 0 165.158 0 91 74.832 91 166c0 34.3 10.704 68.091 31.19 96.446l48.332 75.84C118.847 346.227 31 369.892 31 422c0 18.995 12.398 46.065 71.462 67.159C143.704 503.888 198.231 512 256 512c108.025 0 225-30.472 225-90 0-52.117-87.744-75.757-139.524-83.715zm-194.227-92.34a15.57 15.57 0 0 0-.517-.758C129.685 221.735 121 193.941 121 166c0-75.018 60.406-136 135-136 74.439 0 135 61.009 135 136 0 27.986-8.521 54.837-24.646 77.671-1.445 1.906 6.094-9.806-110.354 172.918L147.249 245.945zM256 482c-117.994 0-195-34.683-195-60 0-17.016 39.568-44.995 127.248-55.901l55.102 86.463a14.998 14.998 0 0 0 25.298 0l55.101-86.463C411.431 377.005 451 404.984 451 422c0 25.102-76.313 60-195 60z"
                            data-original="#000000"
                        ></path>
                        <path
                            d="M256 91c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.645-75-75-75zm0 120c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45z"
                            data-original="#000000"
                        ></path>
                    </svg>
                    <div className="mt-4 text-center">
                        <h4 className="text-[#333] text-lg font-extrabold">Visit Office</h4>
                        <p className="text-md tect-gray-400 mt-2"> 254 Nguyen Van Linh, Da Nang City</p>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 fill-blue-600"
                        viewBox="0 0 473.806 473.806"
                    >
                        <path
                            d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5-6-6.2-12.3-12.6-18.8-18.6-9.7-9.6-21.3-14.7-33.5-14.7s-24 5.1-34 14.7l-.2.2-34 34.3c-12.8 12.8-20.1 28.4-21.7 46.5-2.4 29.2 6.2 56.4 12.8 74.2 16.2 43.7 40.4 84.2 76.5 127.6 43.8 52.3 96.5 93.6 156.7 122.7 23 10.9 53.7 23.8 88 26 2.1.1 4.3.2 6.3.2 23.1 0 42.5-8.3 57.7-24.8.1-.2.3-.3.4-.5 5.2-6.3 11.2-12 17.5-18.1 4.3-4.1 8.7-8.4 13-12.9 9.9-10.3 15.1-22.3 15.1-34.6 0-12.4-5.3-24.3-15.4-34.3l-54.9-55.1zm35.8 105.3c-.1 0-.1.1 0 0-3.9 4.2-7.9 8-12.2 12.2-6.5 6.2-13.1 12.7-19.3 20-10.1 10.8-22 15.9-37.6 15.9-1.5 0-3.1 0-4.6-.1-29.7-1.9-57.3-13.5-78-23.4-56.6-27.4-106.3-66.3-147.6-115.6-34.1-41.1-56.9-79.1-72-119.9-9.3-24.9-12.7-44.3-11.2-62.6 1-11.7 5.5-21.4 13.8-29.7l34.1-34.1c4.9-4.6 10.1-7.1 15.2-7.1 6.3 0 11.4 3.8 14.6 7l.3.3c6.1 5.7 11.9 11.6 18 17.9 3.1 3.2 6.3 6.4 9.5 9.7l27.3 27.3c10.6 10.6 10.6 20.4 0 31-2.9 2.9-5.7 5.8-8.6 8.6-8.4 8.6-16.4 16.6-25.1 24.4-.2.2-.4.3-.5.5-8.6 8.6-7 17-5.2 22.7l.3.9c7.1 17.2 17.1 33.4 32.3 52.7l.1.1c27.6 34 56.7 60.5 88.8 80.8 4.1 2.6 8.3 4.7 12.3 6.7 3.6 1.8 7 3.5 9.9 5.3.4.2.8.5 1.2.7 3.4 1.7 6.6 2.5 9.9 2.5 8.3 0 13.5-5.2 15.2-6.9l34.2-34.2c3.4-3.4 8.8-7.5 15.1-7.5 6.2 0 11.3 3.9 14.4 7.3l.2.2 55.1 55.1c10.3 10.2 10.3 20.7.1 31.3zm-154.2-286.1c26.2 4.4 50 16.8 69 35.8s31.3 42.8 35.8 69c1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.4-1.2 12.3-8.2 11.1-15.6-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3 3.7-15.6 11s3.5 14.4 10.9 15.6zm217.2 96.3c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2 3.7-15.5 11-1.2 7.4 3.7 14.3 11.1 15.6 46.6 7.9 89.1 30 122.9 63.7 33.8 33.8 55.8 76.3 63.7 122.9 1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.3-1.1 12.3-8.1 11-15.4z"
                            data-original="#000000"
                        ></path>
                    </svg>
                    <div className="mt-4 text-center">
                        <h4 className="text-[#333] text-lg font-extrabold">Call Us</h4>
                        <p className="text-md tect-gray-400 mt-2"> +84 397 881 543</p>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 fill-blue-600"
                        viewBox="0 0 32 32"
                    >
                        <path
                            d="M8 30a1.001 1.001 0 0 1-1-1v-5H4c-1.654 0-3-1.346-3-3V5c0-1.654 1.346-3 3-3h24c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3H15.851l-7.226 5.781A.998.998 0 0 1 8 30zM4 4c-.552 0-1 .449-1 1v16c0 .551.448 1 1 1h4a1 1 0 0 1 1 1v3.92l5.875-4.701A1 1 0 0 1 15.5 22H28c.552 0 1-.449 1-1V5c0-.551-.448-1-1-1z"
                            data-original="#000000"
                        ></path>
                        <path
                            d="M24 12H8a1 1 0 1 1 0-2h16a1 1 0 1 1 0 2zm-8 4H8a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2z"
                            data-original="#000000"
                        ></path>
                    </svg>
                    <div className="mt-4 text-center">
                        <h4 className="text-[#333] text-lg font-extrabold">Chat To Us</h4>
                        <p className="text-md tect-gray-400 mt-2">trendybids@gmail.com</p>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 fill-blue-600"
                        viewBox="0 0 100 100"
                    >
                        <path
                            d="M83 23h-3V11c0-3.309-2.692-6-6-6H26c-3.308 0-6 2.691-6 6v12h-3C8.729 23 2 29.729 2 38v30c0 4.963 4.037 9 9 9h9v12c0 3.309 2.692 6 6 6h48c3.308 0 6-2.691 6-6V77h9c4.963 0 9-4.037 9-9V38c0-8.271-6.729-15-15-15zM26 11h48v12H26zm0 78V59h48v30zm66-21c0 1.654-1.345 3-3 3h-9V59h3a3 3 0 1 0 0-6H17a3 3 0 1 0 0 6h3v12h-9c-1.655 0-3-1.346-3-3V38c0-4.963 4.037-9 9-9h66c4.963 0 9 4.037 9 9zm-27 0a3 3 0 0 1-3 3H38a3 3 0 1 1 0-6h24a3 3 0 0 1 3 3zm0 12a3 3 0 0 1-3 3H38a3 3 0 1 1 0-6h24a3 3 0 0 1 3 3zm21-42a3 3 0 0 1-3 3h-6a3 3 0 1 1 0-6h6a3 3 0 0 1 3 3z"
                            data-original="#000000"
                        ></path>
                    </svg>
                    <div className="mt-4 text-center">
                        <h4 className="text-[#333] text-lg font-extrabold">Fax</h4>
                        <p className="text-md tect-gray-400 mt-2">+1 (555) 4567</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-[450px] mb-20 border border-blue-100">
                <Map />
            </div>
        </div>
    );
};

export default Contact;

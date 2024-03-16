import React from 'react'
import { BiChevronRight } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { GiRotaryPhone } from "react-icons/gi";
import { TfiLocationPin } from "react-icons/tfi";
const Contact = () => {
    return (
        <div className='max-w-[1230px] px-[30px] mx-auto mt-4'>
            <div className='block '>
                <h1 className='text-3xl font-bold'>Contact Us</h1>
                <div className='flex m-2'>
                    <span className='font-semibold'>Home</span>
                    <span className='flex items-center font-semibold'>
                        <BiChevronRight className='text-xl' />
                    </span>
                    <span className='font-semibold'>Contact us</span>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-4 mt-16'>
                <div className='col-span-4'>
                    <h1 className='font-semibold'>Get in touch</h1>
                    <h2>Have questions, feedback, or need assistance? Don't hesitate to reach out to us!
                        Our dedicated support team is here to help you with any inquiries regarding our auction platform.
                        Whether you're a buyer, seller, or just curious about how our platform works,
                        we're committed to providing you with the best experience possible.
                    </h2>
                    <div className='flex m-4'>
                        <TfiEmail className='text-5xl' />
                        <div className='ml-4'>
                            <h1>Email Address</h1>
                            <h2>Trendybids123@gmail.com</h2>
                        </div>
                    </div>
                    <div className='flex m-4'>
                        <GiRotaryPhone className='text-5xl' />
                        <div className='ml-4'>
                            <h1>Phone Number</h1>
                            <h2>+84 456 456 456</h2>
                        </div>
                    </div>
                    <div className='flex m-4'>
                        <TfiLocationPin className='text-5xl' />
                        <div className='ml-4'>
                            <h1>Address</h1>
                            <h2>254 Nguyen Van Linh</h2>
                        </div>
                    </div>

                </div>
                <div className='col-span-8 mt-16 ml-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='block'>
                            <h1 className='text-base font-semibold m-2'>Your Name (required)</h1>
                            <input type="text" placeholder='Your name' className='border w-full p-4 rounded-lg' />
                            <h1 className='text-base font-semibold m-2'>Your Email (required)</h1>
                            <input type="text" placeholder='Your email' className='border w-full p-4 rounded-lg' />
                        </div>
                        <div className='block'>
                            <h1 className='text-base font-semibold m-2'>Your Phone (required)</h1>
                            <input type="text" placeholder='Your phone' className='border w-full p-4 rounded-lg' />
                            <h1 className='text-base font-semibold m-2'>Your Email (required)</h1>
                            <input type="text" placeholder='Your email' className='border w-full p-4 rounded-lg' />
                        </div>
                    </div>
                    <div className='w-full'>
                        <h1 className='text-base font-semibold m-2'>Your Messeger</h1>
                        <textarea cols="30" rows="7" className='border w-full rounded-lg'></textarea>
                    </div>
                    <div className='w-full text-center mt-3'>
                        <button className='px-6 py-2 border rounded-lg bg-blue-400 text-white'>Send </button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Contact

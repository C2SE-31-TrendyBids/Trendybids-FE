import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaPhoneAlt,
  FaMailBulk
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="lg:h-screen flex items-end justify-center">
      <div className="bg-gray-900 w-full">
        <div className="w-full max-w-[85rem] pt-10 pb-6 px-4 sm:px-6 lg:px-8 lg:pt-16 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="col-span-full lg:col-span-1">
              <a
                href="/home"
                className="flex-none text-xl font-semibold text-white"
              >
                <h2 className="text-3xl font-bold text-white">
                  Trendy<span className="text-blue-500">Bids</span>
                </h2>
              </a>

              <div className="mt-6">
                <a
                  className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all duration-500"
                  href="https://www.facebook.com/NameSangg/"
                >
                  <i>
                    <FaFacebook className="text-2xl" />
                  </i>
                </a>
                <a
                  className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all duration-500"
                  href="https://www.instagram.com/"
                >
                  <i>
                    <FaInstagram className="text-2xl" />
                  </i>
                </a>
                <a
                  className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all duration-500"
                  href="https://github.com/C2SE-31-TrendyBids"
                >
                  <i>
                    <FaGithub className="text-2xl" />
                  </i>
                </a>
                <a
                  className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all duration-500"
                  href="https://www.youtube.com/"
                >
                  <i>
                    <FaYoutube className="text-2xl" />
                  </i>
                </a>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Service</h4>

              <div className="mt-3 grid space-y-3">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 transition-all"
                    href="/"
                  >
                    Home
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 transition-all"
                    href="/"
                  >
                    Auction
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 transition-all"
                    href="/"
                  >
                    Post Product
                  </a>
                </p>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="font-semibold text-gray-100">Company</h4>

              <div className="mt-3 grid space-y-3">
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 transition-all"
                    href="/blog"
                  >
                    Blog US
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 transition-all"
                    href="/about"
                  >
                    About US
                  </a>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 transition-all"
                    href="/chat"
                  >
                    Chat US
                  </a>{" "}
                  <span className="inline ms-1 text-xs bg-white/10 backdrop-blur-lg text-white py-1 px-2 rounded">
                    We're hiring
                  </span>
                </p>
                <p>
                  <a
                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 transition-all"
                    href="/contact"
                  >
                    Contact US
                  </a>
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold text-gray-100">Stay up to date</h4>

              <form className="mt-8 flex flex-wrap sm:flex-nowrap max-w-md gap-3">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  className="min-w-0 flex-auto rounded-md border-gray-700 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-0 focus:ring-0 focus:ring-inset focus:border-gray-700 sm:text-sm  placeholder:text-white"
                  placeholder="Enter your email"
                />

                <button
                  type="submit"
                  className="flex-none rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-bold text-gray-50 shadow-sm hover:bg-blue-600 transition-all duration-500"
                >
                  Subscribe
                </button>
              </form>
              <div className="flex items-center mt-4 text-sm text-gray-400">
                <span className="mr-2">
                  <FaPhoneAlt />
                </span>
                <p> +84 397 881 543</p>
              </div>
              <div className="flex items-center mt-4 text-sm text-gray-400">
                <span className="mr-2">
                  <FaMailBulk />
                </span>
                <p> TrendyBids@gmail.com</p>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                "Auctioning Excellence: Where Every Bid Holds Value."
              </p>
            </div>
          </div>

          <div className="mt-5 sm:mt-12 flex justify-center items-center">
            <div className="flex justify-center items-center">
              <p className="text-base font-semibold text-gray-400">
                2024 © TrendyBids -<a href="/">TrendyBids.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,jsx,js}"],
    theme: {
        extend: {
            fontFamily: {
                'work-sans': ['Work Sans', 'sans-serif'],
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.no-scrollbar::-webkit-scrollbar': {
                    'display': 'none',
                },
                '.no-scrollbar': {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none"
                },
                '.fill-available': {
                    "width": '-webkit-fill-available',
                },
                '.h-screen-header': {
                    "height": 'calc(100vh - 68px)'
                },
                '.h-sidebar-item': {
                    "height": 'calc(100% - 98px)'
                },
                '.w-msg-channel-lg': {
                    "width": 'calc(100% - 360px)'
                },
                '.w-msg-channel-md': {
                    "width": 'calc(100% - 80px)'
                },
                '.truncate-2-lines': {
                    "display": "-webkit-box",
                    "-webkit-line-clamp": "2",
                    "-webkit-box-orient": "vertical",
                    "overflow": "hidden"
                },
                '.modal-backdrop': {
                    "position": 'fixed',
                    "top": 0,
                    "left": 0,
                    "width": '100%',
                    "height": '100%',
                    "background": 'rgba(0, 0, 0, 0.5)',
                    "backdrop-filter": 'blur(5px)',
                }
            };
            addUtilities(newUtilities)
        },
        require('tailwindcss-animated')
    ]
}




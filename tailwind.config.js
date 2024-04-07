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
        function ({addUtilities}) {
            const newUtilities = {
                '.no-scrollbar::-webkit-scrollbar': {
                    'display': 'none',
                },
                '.no-scrollbar': {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none"
                },
                '.fill-available': {
                    width: '-webkit-fill-available',
                },
                '.h-screen-header': {
                    height: 'calc(100vh - 92px)'
                },
                '.h-sidebar-item': {
                    height: 'calc(100% - 98px)'
                },
                '.w-message-channel': {
                    width: 'calc(100% - 360px)'
                }
            };
            addUtilities(newUtilities)
        }
    ]
}




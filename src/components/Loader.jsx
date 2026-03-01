import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">

            {/* Animation Container */}
            <div className="relative w-64 h-32 flex items-center justify-center overflow-hidden">

                {/* Rolling Road Line */}
                <div className="absolute bottom-4 left-0 w-[200%] h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-[slideLeft_1s_linear_infinite]"></div>

                {/* Ambulance SVG */}
                <div className="animate-[driving_0.5s_infinite_alternate] z-10 text-primary">
                    <svg width="80" height="auto" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.141 10.536L15.908 6.496C15.539 6.035 14.957 5.8 14.364 5.8H6.5C5.122 5.8 4 6.922 4 8.3V14H4.5C4.5 15.657 5.843 17 7.5 17C9.157 17 10.5 15.657 10.5 14H14.5C14.5 15.657 15.843 17 17.5 17C19.157 17 20.5 15.657 20.5 14H21C21.552 14 22 13.552 22 13V12.115C22 11.455 21.684 10.835 21.141 10.536H19.141ZM7.5 15.5C6.673 15.5 6 14.827 6 14C6 13.173 6.673 12.5 7.5 12.5C8.327 12.5 9 13.173 9 14C9 14.827 8.327 15.5 7.5 15.5ZM17.5 15.5C16.673 15.5 16 14.827 16 14C16 13.173 16.673 12.5 17.5 12.5C18.327 12.5 19 13.173 19 14C19 14.827 18.327 15.5 17.5 15.5ZM16.5 10V7.3L19.2 10H16.5ZM12 9.5H10.5V11C10.5 11.276 10.276 11.5 10 11.5H9C8.724 11.5 8.5 11.276 8.5 11V9.5H7C6.724 9.5 6.5 9.276 6.5 9V8C6.5 7.724 6.724 7.5 7 7.5H8.5V6C8.5 5.724 8.724 5.5 9 5.5H10C10.276 5.5 10.5 5.724 10.5 6V7.5H12C12.276 7.5 12.5 7.724 12.5 8V9C12.5 9.276 12.276 9.5 12 9.5Z" />
                    </svg>

                    {/* Siren Flash (Absolute to SVG) */}
                    <div className="absolute top-1 left-7 w-2 h-2 rounded-full bg-red-500 animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                    <div className="absolute top-1 left-9 w-2 h-2 rounded-full bg-blue-500 animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite_0.4s]"></div>
                </div>

                {/* Wind lines for speed effect */}
                <div className="absolute top-8 right-10 w-8 h-0.5 bg-gray-300 rounded-full animate-[slideLeft_0.6s_linear_infinite_0.2s]"></div>
                <div className="absolute top-14 right-4 w-12 h-0.5 bg-gray-200 rounded-full animate-[slideLeft_0.8s_linear_infinite_0.5s]"></div>
                <div className="absolute top-20 right-14 w-6 h-0.5 bg-gray-300 rounded-full animate-[slideLeft_0.7s_linear_infinite]"></div>
            </div>

            <style jsx>{`
                @keyframes slideLeft {
                    0% { transform: translateX(100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(-100%); opacity: 0; }
                }
                @keyframes driving {
                    0% { transform: translateY(0px) rotate(0deg); }
                    100% { transform: translateY(-2px) rotate(-1deg); }
                }
            `}</style>

            <h3 className="mt-4 text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                <span className="animate-pulse">Loading</span>
                <span className="flex gap-1">
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                    <span className="animate-bounce delay-300">.</span>
                </span>
            </h3>
            <p className="text-gray-500 text-sm font-medium mt-1 animate-pulse">Fetching the best care for you</p>
        </div>
    );
};

export default Loader;

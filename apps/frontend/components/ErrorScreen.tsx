import Link from "next/link";
import { ServerErrorIllustration } from "./icons/ServerErrorIllustration";
import { Navbar } from "./Navbar";



export const ErrorScreen = ({ message, heading = "Server Error" }: { message?: string, heading?: string }) => (
    <>
        <Navbar />
        <div className="max-w-2xl my-10 mx-auto">
            <div className="prose mb-10">
                <h1>{heading}</h1>
            </div>
            <ServerErrorIllustration />
            <div className="flex flex-col mt-10 mb-2 bg-red-100 px-6 py-4 text-sm border-2 rounded-b shadow-sm border-red-500">
                <div className="flex gap-1 items-center">
                    <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-red-500 stroke-current"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 8V12V8ZM12 16H12.01H12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="ml-3">
                        <div className="w-full text-gray-900 mt-0">
                            Something went terribly wrong. Please allow us some time to fix it.
                        </div>
                    </div>
                </div>

                {message &&
                    <div className="text-xs mt-3 ml-1">
                        Details: {message}
                    </div>}


            </div>
            <div className="flex justify-center gap-3">
                <Link href='/'><button className="btn btn-primary">Home</button></Link>
                <a href="mailto:idevsubham@gmail.com"><button className="btn btn-primary">Report this issue</button></a>
            </div>
        </div>
    </>
)

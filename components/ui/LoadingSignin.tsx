export const LoadingSignin = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="w-[90%] lg:w-96 lg:p-16 p-10  flex flex-col  gap-6 rounded-lg border border-gray-200 bg-darkwhite">
                <div className="flex flex-col gap-3 items-center animate-pulse">
                    <div className="w-[80%] bg-gray-200 h-5 rounded-full"></div>
                    <div className="w-[60%] bg-gray-200 h-2 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-3 items-center animate-pulse">
                    <div className="w-[80%] bg-gray-200 h-4 rounded-full"></div>
                </div>
                    <div className="flex w-full items-center gap-6 border border-gray-200 p-4 lg:px-6 rounded-lg animate-pulse">
                        <div className="w-12 bg-gray-200 h-10 rounded-full"></div>
                        <div className="w-[80%] bg-gray-200 h-4 rounded-full"></div>
                    </div>
            </div>
        </div>
    )
}


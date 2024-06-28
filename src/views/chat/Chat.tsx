import {useState} from "react";
import Loader from "../components/Loader.tsx";

function Chat() {
    const [isLoading] = useState(false);

    return (
        <div className={"h-dvh"}>
            {isLoading ? (
                <Loader/>
            ) : (
                <div className={"h-full relative"}>
                    <header className="bg-white shadow absolute w-full">
                        <div className="px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Chat</h1>
                        </div>
                    </header>
                    <main className={"bg-gray-100 pt-20 h-full"}>
                        <div className="px-4 sm:px-6 lg:px-8 h-full">
                            <div className={"w-8/12 mx-auto"}>
                                main chat
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}

export default Chat;

import LoaderIcon from "./svg/LoaderIcon.tsx";

function Loader()  {
    return (
        <div className="text-center h-full flex items-center">
            <div role="status" className={"basis-full"}>
                <LoaderIcon
                    className={"inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"}/>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Loader;


import {memo} from "react";
import {UserIcon} from "../../../shared/ui/icon/UserIcon.tsx";
import {Dot} from "../styles";

const LoadingQuestion = memo(function LoadingQuestion() {
    return(
        <div className="flex gap-4 mb-5 items-start">
            <div className="flex items-center justify-center bg-violet-400 w-10 h-10 rounded-full overflow-hidden">
                <UserIcon className="w-full h-full pt-1 fill-white" />
            </div>
            <div className="mt-auto pb-1">
                <div className="flex gap-2">
                    <Dot $delay="-0.2s" />
                    <Dot $delay="-0.1s" />
                    <Dot $delay="0s" />
                </div>
            </div>
        </div>
    )
});

export default LoadingQuestion;
import {memo} from "react";
import {UserIcon} from "../../../shared/ui/icon/UserIcon.tsx";

type Props = {
    text: string;
};
const ChatQuestion = memo(function ChatQuestion({ text }: Props) {
    return (
        <div className="flex gap-4 mb-5 items-start">
            <div className="flex items-center justify-center shrink-0 bg-violet-400 w-10 h-10 rounded-full overflow-hidden">
                <UserIcon className="w-full h-full pt-1 fill-white" />
            </div>
            <div className="max-w-lg pt-2 pb-2">{text}</div>
        </div>
    )
});

export default ChatQuestion;
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { MessageCircle } from "lucide-react";

interface MessageContainerProps {
	selectedChat?: {
		username: string;
	};
}

const MessageContainer = ({ selectedChat }: MessageContainerProps) => {
	if (!selectedChat) {
		return <NoChatSelected />;
	}

	return (
		<div className='w-full flex flex-col'>
			{/* Header */}
			<div className='bg-slate-500 px-4 py-2 mb-2'>
				<span className='label-text'>To:</span>{" "}
				<span className='text-gray-900 font-bold'>{selectedChat.username}</span>
			</div>

			{/* Messages & Input */}
			<Messages />
			<MessageInput />
		</div>
	);
};

const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋</p>
				<p>Select a chat to start messaging</p>
				<MessageCircle className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

export default MessageContainer;

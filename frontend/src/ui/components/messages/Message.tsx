interface MessageProps {
	message?: {
		fromMe: boolean;
		body: string;
		timestamp?: string; // Optional timestamp
	};
}

const Message = ({ message }: MessageProps) => {
	if (!message) return null; // Prevents crashing if message is undefined

	const fromMe = message.fromMe;
	const chatClass = fromMe ? "chat-end" : "chat-start";
	const img = fromMe
		? "https://avatar.iran.liara.run/public/boy?username=johndoe"
		: "https://avatar.iran.liara.run/public/boy?username=janevictor";

	const bubbleBg = fromMe ? "bg-blue-500" : "";
	const timestamp = message.timestamp || "Now"; // Fallback if timestamp is not provided

	return (
		<div className={`chat ${chatClass}`}>
			{/* Avatar */}
			<div className='hidden md:block chat-image avatar'>
				<div className='w-6 md:w-10 rounded-full'>
					<img alt='User Avatar' src={img} />
				</div>
			</div>

			{/* Message Bubble */}
			<p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
				{message.body}
			</p>

			{/* Timestamp */}
			<span className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>
				{timestamp}
			</span>
		</div>
	);
};

export default Message;

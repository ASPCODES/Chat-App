import React from "react";

interface MessageProps {
  message: {
    fromMe: boolean;
    body: string;
    timestamp?: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { fromMe, body, timestamp } = message;

  const chatClass = fromMe ? "chat-end" : "chat-start";
  const img = fromMe
    ? "https://avatar.iran.liara.run/public/boy?username=johndoe"
    : "https://avatar.iran.liara.run/public/boy?username=janevictor";

    const bubbleBg = fromMe ? "bg-blue-500" : "";

	return (
		<div className={`chat ${chatClass}`}>
			{/* Avatar */}
			<div className="hidden md:block chat-image avatar">
				<div className="w-6 md:w-10 rounded-full">
                <img alt='Tailwind CSS chat bubble component' src={img} />
				</div>
			</div>

			{/* Message Bubble */}
			<p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
				{body}
			</p>

			{/* Timestamp */}
			<span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
				{timestamp ?? "N/A"}
			</span>
		</div>
    );
};

export default Message;

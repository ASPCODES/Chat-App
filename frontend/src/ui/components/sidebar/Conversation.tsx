interface ConversationProps {
	conversation?: {
		fullName: string;
		profilePic: string;
		emoji?: string;
		onClick?: () => void;
	};
}

const Conversation = ({ conversation }: ConversationProps) => {
	if (!conversation) return null; // Prevents crashes

	return (
		<div
			className='flex flex-col gap-1'
			onClick={conversation.onClick} // Optional click handler
		>
			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
				{/* Avatar */}
				<div className='avatar online'>
					<div className='w-8 md:w-12 rounded-full'>
						<img src={conversation.profilePic} alt='User Avatar' />
					</div>
				</div>

				{/* User Info */}
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200 text-sm md:text-md'>{conversation.fullName}</p>
						{conversation.emoji && <span className='text-xl hidden md:inline-block'>{conversation.emoji}</span>}
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className='divider my-1' />
		</div>
	);
};

export default Conversation;

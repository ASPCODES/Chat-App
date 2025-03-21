const MessageSkeleton = () => {
	return (
		<div className="flex flex-col gap-3">
			{/* Left-aligned skeleton (receiver) */}
			<div className="flex gap-3 items-center">
				<div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
				<div className="flex flex-col gap-1">
					<div className="skeleton h-4 w-full max-w-[160px] md:max-w-[200px]"></div>
					<div className="skeleton h-4 w-full max-w-[120px] md:max-w-[160px]"></div>
				</div>
			</div>

			{/* Right-aligned skeleton (sender) */}
			<div className="flex gap-3 items-center justify-end">
				<div className="flex flex-col gap-1 items-end">
					<div className="skeleton h-4 w-full max-w-[160px] md:max-w-[200px]"></div>
				</div>
				<div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
			</div>
		</div>
	);
};

export default MessageSkeleton;

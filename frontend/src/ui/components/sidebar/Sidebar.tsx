import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-72 lg:w-96 h-full'>
			<SearchInput />
			<div className='divider px-3' />
			<div className='flex-1 overflow-y-auto'>
				<Conversations />
			</div>
			<LogoutButton />
		</div>
	);
};

export default Sidebar;

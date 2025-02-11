import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex min-h-[80vh] md:h-[550px] w-full md:max-w-screen-md rounded-md md:rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-lg'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};

export default Home;

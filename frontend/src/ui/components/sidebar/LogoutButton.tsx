import { LogOut } from "lucide-react";

const LogoutButton = () => {
	const logout = () => {
		// Actual logout logic (e.g., clearing tokens, redirecting, etc.)
		alert("You are logged out");
	};

	return (
		<button
			className='mt-auto flex items-center justify-center p-2 bg-transparent text-white cursor-pointer'
			onClick={logout}
			aria-label="Log out"
		>
			<LogOut className='w-6 h-6' />
		</button>
	);
};

export default LogoutButton;

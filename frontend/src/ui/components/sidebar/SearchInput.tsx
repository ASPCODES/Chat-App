import { Search } from "lucide-react";

const SearchInput = () => {
	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent page refresh
		// Add search logic here (e.g., filtering data or redirecting)
		alert("Search submitted");
	};

	return (
		<form className='flex items-center gap-2' onSubmit={handleSearchSubmit}>
			<input
				type='text'
				placeholder='Search…'
				className='input-sm md:input input-bordered rounded-full sm:rounded-full w-full'
				aria-label="Search input" // Improved accessibility
			/>
			<button
				type='submit'
				className='btn md:btn-md btn-sm btn-circle bg-sky-500 text-white'
				aria-label="Search button" // Improved accessibility
			>
				<Search className='w-4 h-4 md:w-6 md:h-6 outline-none' />
			</button>
		</form>
	);
};

export default SearchInput;

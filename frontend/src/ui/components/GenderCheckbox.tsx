import { useState } from "react";

const GenderRadio = () => {
	const [gender, setGender] = useState("");

	return (
		<div className='flex gap-4'>
			<div className='form-control'>
				<label className='label gap-2 cursor-pointer'>
					<span className='label-text'>Male</span>
					<input
						type='radio'
						name='gender'
						value='male'
						checked={gender === "male"}
						onChange={() => setGender("male")}
						className='radio border-slate-900'
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className='label gap-2 cursor-pointer'>
					<span className='label-text'>Female</span>
					<input
						type='radio'
						name='gender'
						value='female'
						checked={gender === "female"}
						onChange={() => setGender("female")}
						className='radio border-slate-900'
					/>
				</label>
			</div>
		</div>
	);
};

export default GenderRadio;

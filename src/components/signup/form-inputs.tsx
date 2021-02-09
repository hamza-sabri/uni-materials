import { formInterface } from '../../interfaces/forms/signup-form';

export default function FormInputs({ formPage, signupResult, setSignupResult }: formInterface) {
	const { inputTypes, inputMessages, keysAndIDs, pageNumber } = formPage;

	const textInputs = ()=>{
		return inputMessages.map((inputHint, index) => (
			<input
				placeholder={inputHint}
				key={index}
				type={inputTypes[index]}
				id={keysAndIDs[index]}
				value={signupResult[keysAndIDs[index]]}
				disabled={false}
				onChange={({ target }) =>
					setSignupResult!({ ...signupResult, [keysAndIDs[index]]: target.value })}
			/>
		))
	
	}

	const dropdownInputs = ()=>{
		return (
			<div>
				<select className="uni-selector">
					<option value="item-1" key="item-1" >Item 1</option>
					<option value="item-2" key="item-2" >Item 2</option>
					<option value="item-3" key="item-3" >Item 3</option>
					<option value="item-4" key="item-4" >Item 4</option>
					<option value="item-5" key="item-5" >Item 5</option>
					<option value="item-6" key="item-6" >Item 6</option>
				</select>
				<select className="uni-selector">
					<option value="item-1" key="item-1" >Item 1</option>
					<option value="item-2" key="item-2" >Item 2</option>
					<option value="item-3" key="item-3" >Item 3</option>
					<option value="item-4" key="item-4" >Item 4</option>
					<option value="item-5" key="item-5" >Item 5</option>
					<option value="item-6" key="item-6" >Item 6</option>
				</select>
				<select className="uni-selector">
					<option value="item-1" key="item-1" >Item 1</option>
					<option value="item-2" key="item-2" >Item 2</option>
					<option value="item-3" key="item-3" >Item 3</option>
					<option value="item-4" key="item-4" >Item 4</option>
					<option value="item-5" key="item-5" >Item 5</option>
					<option value="item-6" key="item-6" >Item 6</option>
				</select>
			</div>
		)
	}
	
	return (
		<div className="inputs-container">
			{pageNumber !== 3 ? textInputs(): dropdownInputs()}
		</div>
	);
}

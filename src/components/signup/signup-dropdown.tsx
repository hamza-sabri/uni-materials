import { signupDropdownInterface } from '../../interfaces/forms/signup-form';

export function SignupDropdown({
	doc, setUniIndex, unisNames, formPage,
	signupResult, setSignupResult
}: signupDropdownInterface) {
	const { locations, fields } = doc;
	const { keysAndIDs } = formPage;
	const options: string[][] = [ unisNames, locations, fields ];

	const selectionHandler = (target: any, clickedList: number) => {
		setSignupResult!({ ...signupResult, [keysAndIDs[clickedList]]: target.value });
		if (target.id === 'universityName') setUniIndex(target.selectedIndex);
	};

	const createASelector = (index: number) => {
		const selectedItem: string = signupResult[keysAndIDs[index]] || options[index][0];
		return (
			<select
				id={keysAndIDs[index]}
				onChange={({ target }) => {
					selectionHandler(target, index);
				}}
				className="uni-selector"
				value={selectedItem}
			>
				{options[index].map((currentOption) => (
					<option key={currentOption} value={currentOption}>
						{currentOption}
					</option>
				))}
			</select>
		);
	};

	return (
		<div className="selector-container">
			<label>universities</label> {createASelector(0)}
			<label>locations</label> {createASelector(1)}
			<label>fields</label> {createASelector(2)}
		</div>
	);
}

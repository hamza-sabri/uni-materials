import { useContext, useState } from 'react';
import { UniDataContext } from '../../contexts/signup-context/uni-data-context';
import { formInterface } from '../../interfaces/forms/signup-form';
import { SignupDropdown } from './signup-dropdown';

export default function FormInputs({ formPage, signupResult, setSignupResult }: formInterface) {
	const unisDataList = useContext(UniDataContext);
	const unisNames = unisDataList.map(({ doc }) => doc.name);
	const { inputTypes, inputMessages, keysAndIDs, pageNumber } = formPage;
	const [ uniIndex, setUniIndex ] = useState(0);

	const textInputs = () => {
		return inputMessages.map((inputHint, index) => (
			<input
				placeholder={inputHint}
				key={index}
				type={inputTypes[index]}
				id={keysAndIDs[index]}
				value={signupResult[keysAndIDs[index]]}
				disabled={false}
				onChange={({ target }) => setSignupResult!({ ...signupResult, [keysAndIDs[index]]: target.value })}
			/>
		));
	};

	const dropdownInputs = () => {
		const { doc } = unisDataList[uniIndex];
		return <SignupDropdown {...{ setUniIndex, doc, unisNames, formPage, signupResult, setSignupResult }} />;
	};

	return <div className="signup-inputs-container">{pageNumber !== 3 ? textInputs() : dropdownInputs()}</div>;
}

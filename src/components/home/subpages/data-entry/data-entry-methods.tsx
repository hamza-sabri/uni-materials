import React from 'react';

type DataEntryMethodsInterface = {
	img: string;
	method: string;
	routeTo: string;
	alt: string;
};

export default function DataEntryMethods({ img, method, routeTo, alt }: DataEntryMethodsInterface) {
	const onMethodClicked = () => {
        console.log('clicked')
    };

	return (
		<div className="data-entry-method" onClick={onMethodClicked}>
			{/* <img src={img} alt={alt} className="data-entry-method-img" />
			<div className="method-container">
				<div className="method">{method}</div>
			</div> */}
		</div>
	);
}

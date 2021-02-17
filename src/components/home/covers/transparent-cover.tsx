import React from 'react';

import '../../styles/transparent-cover/transparent-cover-style.css';

// for the current implementation this is only used if we want to display something
// in the middle of the screan with a shadow like effect behind it
// TODO make it more genaric depending on more props
export default function TransparentCover({ child }: { child?: JSX.Element }) {
	return <div className="transparent-cover">{child ? child : <div />}</div>;
}

import React from 'react';
import UniManagerPage from '../../../pages/uni-manager-page';

import '../../../styles/dynamic-content/dynamic-content-section.css';
import UniManager from './uni-manager/uni-manager';
export default function DynamicContentSection() {
	return <div className="dynamic-content-section">
		<UniManagerPage></UniManagerPage>
	</div>

	// return <UniManager/>

}

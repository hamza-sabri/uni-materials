import React from 'react';
import { sideBarSectionInterface } from '../interfaces/side-bar/side-bar-section-interface';

// icons
import tempIcon from '../assets/home-assets/search.svg';

// pages
import DataEntryPage from '../pages/data-entry-page';

const dataEntrySectionCards: sideBarSectionInterface = {
	sectionTitle: 'Data Entry',
	sectionCards: [
		{ cardName: 'Data Entry', routeTo: <DataEntryPage />, cardIcon: tempIcon },
		{ cardName: 'Home', routeTo: <div />, cardIcon: tempIcon }
	]
};

export { dataEntrySectionCards };

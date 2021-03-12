import React from 'react';
import { sideBarSectionInterface } from '../interfaces/side-bar/side-bar-section-interface';

// icons
import tempIcon from '../assets/home-assets/search.svg';

// pages
import { dataEntryRoute, homePageRoute, uniMangerRoute } from './pages-route';

const dataEntrySectionCards: sideBarSectionInterface = {
	sectionTitle: 'Data Entry',
	sectionCards: [
		{ cardName: 'Home', routeTo: homePageRoute, cardIcon: tempIcon },
		{ cardName: 'Data Entry', routeTo: dataEntryRoute, cardIcon: tempIcon },
		{ cardName: 'Uni manager', routeTo: uniMangerRoute, cardIcon: tempIcon }
	]
};

export { dataEntrySectionCards };

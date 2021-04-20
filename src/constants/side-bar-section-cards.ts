import { sideBarSectionInterface } from '../interfaces/side-bar/side-bar-section-interface';

// icons
import tempIcon from '../assets/home-assets/search.svg';

// pages
import { cretateTopics, dataEntryRoute, homePageRoute, updatematerialsRoute, uniMangerRoute, materialInfoRoute, profileRoute } from './pages-route';

const dataEntrySectionCards: sideBarSectionInterface = {
	sectionTitle: 'Data Entry',
	sectionCards: [
		{ cardName: 'Home', routeTo: homePageRoute, cardIcon: tempIcon },
		{ cardName: 'Create Material', routeTo: dataEntryRoute, cardIcon: tempIcon },
		{ cardName: 'Update Materials', routeTo: updatematerialsRoute, cardIcon: tempIcon },
		{ cardName: 'Create Topic', routeTo: cretateTopics, cardIcon: tempIcon },
		{ cardName: 'Update Topics', routeTo: cretateTopics, cardIcon: tempIcon },
		{ cardName: 'Uni manager', routeTo: uniMangerRoute, cardIcon: tempIcon },
		{ cardName: 'Profile', routeTo: profileRoute, cardIcon: tempIcon },

		{ cardName: 'Update Topics', routeTo: '/', cardIcon: tempIcon },
		{ cardName: 'Materials info', routeTo: materialInfoRoute, cardIcon: tempIcon },
		{ cardName: 'Uni manager', routeTo: uniMangerRoute, cardIcon: tempIcon }
	]
};

export { dataEntrySectionCards };

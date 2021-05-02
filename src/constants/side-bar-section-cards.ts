import { sideBarSectionInterface } from '../interfaces/side-bar/side-bar-section-interface';

// icons
import homeIcon from '../assets/home/side-bar/home.svg';
import createIcon from '../assets/home/side-bar/create.svg';
import editIcon from '../assets/home/side-bar/edit.svg';
import createTopicIcon from '../assets/home/side-bar/create-topic.svg';
import infoIcon from '../assets/home/side-bar/info.svg';
import managerIcon from '../assets/home/side-bar/teamwork.svg';
import profileIcon from '../assets/home/side-bar/profile.svg';
import examsIcon from '../assets/home/side-bar/online-test.svg';
import rulesIcon from '../assets/home/side-bar/regulation.svg';
import settingsIcon from '../assets/home/side-bar/settings.svg';
import tableIcon from '../assets/home/side-bar/table.svg';
import feedbackIcon from '../assets/home/side-bar/feedback.svg';
import logOutIcon from '../assets/home/side-bar/logout.svg';
import guideIcon from '../assets/home/side-bar/guide.svg';

// pages
import { cretateTopics, dataEntryRoute, scheduleRoute, updatematerialsRoute, uniMangerRoute, materialInfoRoute, singinPageRoute, notFoundRoute, profileRoute, guidanceRoute } from './pages-route';

const dataEntrySectionCards: sideBarSectionInterface = {
	sectionTitle: 'Data Entry',
	sectionCards: [
		{ cardName: 'Home', routeTo: profileRoute, cardIcon: homeIcon },
		{ cardName: 'Create Material', routeTo: dataEntryRoute, cardIcon: createIcon },
		{ cardName: 'Update Materials', routeTo: updatematerialsRoute, cardIcon: editIcon },
		{ cardName: 'Create Topic', routeTo: cretateTopics, cardIcon: createTopicIcon },
		{ cardName: 'Materials info', routeTo: materialInfoRoute, cardIcon: infoIcon },
		{ cardName: 'Profile', routeTo: profileRoute, cardIcon: profileIcon },
		{ cardName: 'Exams', routeTo: notFoundRoute, cardIcon: examsIcon },
		{ cardName: 'Facts & Rules', routeTo: notFoundRoute, cardIcon: rulesIcon },
		{ cardName: 'Schedule', routeTo: scheduleRoute, cardIcon: tableIcon },
		{ cardName: 'Settings', routeTo: notFoundRoute, cardIcon: settingsIcon },
		{ cardName: 'Feedback', routeTo: notFoundRoute, cardIcon: feedbackIcon },
		{ cardName: 'Uni managers', routeTo: uniMangerRoute, cardIcon: managerIcon },
		{ cardName: 'Guidance', routeTo: guidanceRoute, cardIcon: guideIcon }, 
		{ cardName: 'Log out', routeTo: singinPageRoute, cardIcon: logOutIcon },

	]
};

export { dataEntrySectionCards };

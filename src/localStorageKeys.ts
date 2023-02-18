import { dotObject } from './utils';

export const localStorageKeys = {
	GroupContainer: {
		TableSize: 'GroupContainer-TableSize',
		VisitedGroups: 'GroupContainer-VisitedGroups',
	},
};

export const dotLSK = dotObject.bind(null, localStorageKeys);

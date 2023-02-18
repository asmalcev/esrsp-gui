import { dotObject } from './utils';

export const localStorageKeys = {
	GroupContainer: {
		TableSize: 'GroupContainer-TableSize',
	},
};

export const dotLSK = dotObject.bind(null, localStorageKeys);

import { createContext, useState, useContext } from 'react';
import { localStorageKeys } from '../localStorageKeys';
import {
	getLocalStorage,
	getSessionStorage,
	setLocalStorage,
	setSessionStorage,
} from '../utils';

export type RecordContext = {
	setRecord: (
		key: string,
		value: unknown[],
		saveInStorage: boolean,
		storage: 'session' | 'local',
	) => void;
	getRecord: (key: string) => unknown;
};

export const RecordContext = createContext<RecordContext>({
	getRecord: (key: string) => null,
	setRecord: (
		key: string,
		value: unknown[],
		saveInStorage: boolean = false,
		storage: 'session' | 'local' = 'session',
	) => {},
});

const fillRecordsFromStorage = (
	records: Record<string, unknown[]>,
	getFromStorage: (key: string, _: string) => string,
) => {
	const keys = JSON.parse(getFromStorage(localStorageKeys.RecordContext, '[]'));

	for (const key of keys) {
		records[key] = JSON.parse(getFromStorage(key, '[]'));
	}
};

export const RecordContextProvider = (props) => {
	const recordsFromStorage = {};

	fillRecordsFromStorage(recordsFromStorage, getSessionStorage);
	fillRecordsFromStorage(recordsFromStorage, getLocalStorage);

	const [records, setRecords] =
		useState<Record<string, unknown[]>>(recordsFromStorage);

	const setRecord = (
		key: string,
		value: unknown[],
		saveInStorage: boolean = false,
		storage: 'session' | 'local' = 'session',
	) => {
		const nextRecords = {};

		if (!records[key]) {
			nextRecords[key] = value;
		}

		for (const k of Object.keys(records)) {
			if (k === key) {
				nextRecords[k] = value;
			} else {
				nextRecords[k] = records[k];
			}
		}

		if (saveInStorage) {
			if (storage === 'session') {
				/* При сохранении record-а в sessionStorage, RecordContext должен запомнить
				 * ключ, по которому затем сможет получить его значение обратно
				 */
				const recordsKeys = new Set(
					JSON.parse(
						getSessionStorage(
							localStorageKeys.RecordContext,
							JSON.stringify([]),
						),
					),
				);
				recordsKeys.add(key);
				setSessionStorage(
					localStorageKeys.RecordContext,
					JSON.stringify(Array.from(recordsKeys)),
				);

				setSessionStorage(key, JSON.stringify(value));
			} else {
				// то же самое, что и выше, но для localStorage
				const recordsKeys = new Set(
					JSON.parse(
						getLocalStorage(localStorageKeys.RecordContext, JSON.stringify([])),
					),
				);
				recordsKeys.add(key);
				setLocalStorage(
					localStorageKeys.RecordContext,
					JSON.stringify(Array.from(recordsKeys)),
				);

				setLocalStorage(key, JSON.stringify(value));
			}
		}

		setRecords(nextRecords);
	};

	const getRecord = (key: string) => records[key];

	const contextObj = {
		getRecord,
		setRecord,
	};

	return <RecordContext.Provider value={contextObj} {...props} />;
};

export const useRecord = () => useContext(RecordContext);

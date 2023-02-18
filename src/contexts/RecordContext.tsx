import { createContext, useState, useContext } from 'react';

export type RecordContext = {
	setRecord: (key: string, value: unknown[]) => void;
	getRecord: (key: string) => unknown;
};

export const RecordContext = createContext({
	getRecord: (key) => {
		return null;
	},
	setRecord: (key, value) => {},
});

export const RecordContextProvider = (props) => {
	const [records, setRecords] = useState<Record<string, unknown[]>>({});

	const setRecord = (key: string, value: unknown[]) => {
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

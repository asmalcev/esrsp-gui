import { createContext, useState, useContext } from 'react';

export type ReloadContext = {
	reload: () => {};
	_: number;
};

export const ReloadContext = createContext({
	reload: () => {},
	_: 1,
});

export const ReloadContextProvider = (props) => {
	const [_, set_] = useState<number>(1);

	const reload = () => {
		set_(_ + 1);
	};

	const contextObj = {
		reload,
		_,
	};

	return <ReloadContext.Provider value={contextObj} {...props} />;
};

export const useReload = () => useContext(ReloadContext);

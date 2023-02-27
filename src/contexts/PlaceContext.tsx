import { createContext, useState, useContext } from 'react';

export type PlaceContext = {
	places: Record<string, JSX.Element>;
	setPlace: (key: string, element: JSX.Element) => void;
};

export const PlaceContext = createContext<PlaceContext>({
	places: {},
	setPlace: (key: string, element: JSX.Element) => {},
});

export const PlaceContextProvider = (props) => {
	const [places, setPlaces] = useState<Record<string, JSX.Element>>({});

	const setPlace = (key: string, element: JSX.Element) => {
		setPlaces({
			...places,
			[key]: element,
		});
	};

	const contextObj = {
		places,
		setPlace,
	};

	return <PlaceContext.Provider value={contextObj} {...props} />;
};

export const usePlaces = () => useContext(PlaceContext);

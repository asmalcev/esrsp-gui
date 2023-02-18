const debounce = (fn: Function, time: number) => {
	let timeout;

	return function () {
		let self = this;
		const functionCall = function () {
			return fn.apply(self, arguments);
		};
		clearTimeout(timeout);
		timeout = setTimeout(functionCall, time);
	};
};

const throttle = (func: Function, ms: number) => {
	let isThrottled: boolean = false,
		savedArgs,
		savedThis;

	function wrapper() {
		if (isThrottled) {
			savedArgs = arguments;
			savedThis = this;
			return;
		}

		func.apply(this, arguments);

		isThrottled = true;

		setTimeout(function () {
			isThrottled = false;
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
};

const groupBy = (xs: any[], key: string) => {
	return xs.reduce((rv, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

const isOddWeek = (date: Date): Boolean => {
	const startDate = new Date(date.getFullYear(), 0, 1);
	const days = Math.floor(
		(date.getTime() - startDate.getTime()) / // diff in ms
			(24 * 60 * 60 * 1000),
	);

	const weekNumber = Math.ceil((date.getDay() + 1 + days) / 7);

	return Boolean(weekNumber % 2);
};

const getddmm = (date: Date): string => {
	const dd: number = date.getDate();
	const mm: number = date.getMonth() + 1;

	const sdd: string = dd < 10 ? `0${dd}` : String(dd);
	const smm: string = mm < 10 ? `0${mm}` : String(mm);

	return `${sdd}.${smm}`;
};

const isUndefined = (value) => typeof value === 'undefined';

const isObject = (value) => value instanceof Object;

const getMethodFromDiff = (old, current) => {
	if (old === '') return 'POST';
	if (current === '' && current !== old) return 'DELETE';
	return 'PUT';
};

/* https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
 * Author: mplungjan
 */
const toLocalISOTime = (date: Date) => {
	const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
	return new Date(date.getTime() - tzoffset).toISOString().slice(0, -1);
};

const dotObject = (storage: object, request: string) => {
	const keys = request.split('.');
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];

		if (!storage[key] || (i < keys.length - 1 && !isObject(storage[key]))) {
			return request;
		} else {
			storage = storage[key];
		}
	}
	return storage;
};

const getLocalStorage = (key: string, standardValue: string) =>
	window.localStorage.getItem(key) || standardValue;

const setLocalStorage = (key: string, value: string) =>
	window.localStorage.setItem(key, value);

const compareDates = (date1: Date, date2: Date) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

export {
	debounce,
	throttle,
	groupBy,
	isOddWeek,
	getddmm,
	isUndefined,
	isObject,
	getMethodFromDiff,
	toLocalISOTime,
	dotObject,
	getLocalStorage,
	setLocalStorage,
	compareDates,
};

import { localStorageKeys } from '../src/contexts/AuthContext';

const debounce = function(fn, time) {
	let timeout;

	return function() {
		let self = this;
		const functionCall = function() {
			return fn.apply(self, arguments);
		};
		clearTimeout(timeout);
		timeout = setTimeout(functionCall, time);
	}
}

function throttle(func, ms) {

	let isThrottled = false,
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

		setTimeout(function() {
			isThrottled = false;
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}

const groupBy = (xs, key) => {
	return xs.reduce((rv, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
}

const isOddWeek = (date : Date) : Boolean => {
	const startDate = new Date(date.getFullYear(), 0, 1);
	const days = Math.floor(
		(date.getTime() - startDate.getTime()) / // diff in ms
		(24 * 60 * 60 * 1000)
	);

	const weekNumber = Math.ceil(
		(date.getDay() + 1 + days) / 7);

	return Boolean(weekNumber % 2);
}

const getddmm = (date : Date) : string => {
	const dd = date.getDate();
	const mm = date.getMonth() + 1;

	const sdd = dd < 10 ? `0${dd}` : dd;
	const smm = mm < 10 ? `0${mm}` : mm;

	return `${sdd}.${smm}`;
}

const jwtfetch = (
	url: string,
	body?: object
) => fetch(url, {
	method: 'POST',
	body: JSON.stringify({
		jwt: window.localStorage[localStorageKeys.jwt],
		...body
	})
});

export {
	debounce,
	throttle,
	groupBy,
	isOddWeek,
	getddmm,
	jwtfetch
};
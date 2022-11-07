const debounce = (fn: () => any, time: number) => {
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

const throttle = (func: () => any, ms: number) => {
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

export { debounce, throttle, groupBy, isOddWeek, getddmm };

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

export {
	debounce,
	throttle
};
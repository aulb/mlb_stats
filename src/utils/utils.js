export const getYearMonthDay = (date) => {
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() + 1;
	const day = date.getUTCDate();
	return { year, month, day };
}

export const pad = str => (originalString, desiredLength) => {
	const padBy = desiredLength - originalString.length;
	let zeroes = '';
	for (let i = 0; i < padBy; i++) {
		zeroes += str;
	}	
	return `${zeroes}${originalString}`;
}

export const padZero = pad('0');

// Default states for the stateful components

export const genericErrorHandling = () => {
	console.log('Network error, something went wrong.');
}

export const transformGameObject = (gameObject) => {
	// Object {} : one game that day
	// Games can be one of three things, so just transform them into the proper
	// Array  [] : multiple games that day
	// undefined : no games that day
	// Solution: transform everything into an array, to avoid duplicate logic

	// If `gameObject` is type array, return as is
	if (Array.isArray(gameObject)) {
		return gameObject;
	}

	// If `gameObject` is an {}, put it in an array
	if (gameObject !== null && typeof(gameObject) === 'object') {
		return [gameObject];
	} 

	// If `gameObject` is null, return []
	if (gameObject === undefined || gameObject === null) {
		return [];
	}
}


export const swapGames = (faves) => {
	return;
}

/*
 * This file contains utility methods for specific components.
 */ 
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


export const sortByFavoriteTeam = (gameData, favoriteTeam) => {
	// Modifies the gameData array to sort by favorite team
	// Favorite teams comes first in the list
	let front = 0;
	let i = 0;

	for (let i = 0; i < gameData.length; i++) {
		// Check the home team name and away team name
		let { home_team_name, away_team_name } = gameData[i];
		// If one of them is a match, swap with the "front" game
		if (home_team_name === favoriteTeam || away_team_name === favoriteTeam) {
			// Swap index `i` with index `front`
			let temp = gameData[i];
			gameData[i] = gameData[front];
			gameData[front] = temp;
			front++;
		} 		
	}
	return gameData;
};

export const transformInningScores = (inningScores) => {
	// Transform the inning scores into a more manageable object
	const result = {
		'home': [], 
		'away': []
	};

	for (let i = 0; i < inningScores.length; i++) {
		result['home'].push(inningScores[i]['home']);
		result['away'].push(inningScores[i]['away']);
	}

	return result;
}

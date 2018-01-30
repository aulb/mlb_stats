// http://www.daigo.org/2009/10/abbreviation-to-full-mlb-team-names/
// All teams
export let MLB_TEAMS = {};
MLB_TEAMS["BOS"] = "Red Sox";
MLB_TEAMS["NYY"] = "Yankees"; 
MLB_TEAMS["ARI"] = "Diamondbacks"; 
MLB_TEAMS["ATL"] = "Braves"; 
MLB_TEAMS["BAL"] = "Orioles"; 
MLB_TEAMS["CHC"] = "Cubs"; 
MLB_TEAMS["CHW"] = "White Sox"; 
MLB_TEAMS["CIN"] = "Reds"; 
MLB_TEAMS["CLE"] = "Indians"; 
MLB_TEAMS["COL"] = "Rockies"; 
MLB_TEAMS["DET"] = "Tigers"; 
MLB_TEAMS["FLA"] = "Marlins"; 
MLB_TEAMS["HOU"] = "Astros"; 
MLB_TEAMS["KCR"] = "Royals"; 
MLB_TEAMS["LAA"] = "Angels"; 
MLB_TEAMS["LAD"] = "Dodgers"; 
MLB_TEAMS["MIL"] = "Brewers"; 
MLB_TEAMS["MIN"] = "Twins"; 
MLB_TEAMS["NYM"] = "Mets"; 
MLB_TEAMS["OAK"] = "Athletics"; 
MLB_TEAMS["PHI"] = "Phillies"; 
MLB_TEAMS["PIT"] = "Pirates"; 
MLB_TEAMS["SDP"] = "Padres"; 
MLB_TEAMS["SFG"] = "Giants"; 
MLB_TEAMS["SEA"] = "Mariners"; 
MLB_TEAMS["STL"] = "Cardinals"; 
MLB_TEAMS["TBR"] = "Rays"; 
MLB_TEAMS["TEX"] = "Rangers"; 
MLB_TEAMS["TOR"] = "Blue Jays"; 
MLB_TEAMS["WSN"] = "Nationals";

// Resetting for when next/previous day is clicked
// Constants needed to reset the main MLBListView states
export const DEFAULT_LIST_STATE = {
	date: new Date(2016, 2, 29),
	// Data is populated as 
	// [{gameData1}, {gameData2}, ...]
	data: [],
	numberOfGames: 0,
	isDataLoaded: false,
	favoriteTeam: 'Blue Jays'
};

// Constants needed to reset the MLBGameTab states
export const HOME_TEAM = true;
export const AWAY_TEAM = false;
export const DEFAULT_TAB_STATE = {
	active: true,
	homeTeamName: '',
	awayTeamName: '',
	homeData: {},
	awayData: {},
	pitching: {},
	isDetailsLoaded: false
};

// Constants needed to reset the MLBGameCard states
export const HIDE = true;
export const SHOW = false;
export const DEFAULT_GAME_STATE = {
	gameStatus: '',
	homeTeamName: '',
	awayTeamName: '',
	homeCode: '',
	awayCode: '',
	homeScore: 0,
	awayScore: 0,
	detailEndpoint: '',
	// Game details from ListView
	isDataLoaded: false,
	// Details from the first card click
	isDetailsLoaded: false,
	// Number of innings
	playedInnings: 0,
	revealDetails: false,
	// Data after Details button is clicked
	detailedData: {},
	// Turn the detail button into hide button
	buttonAction: HIDE
};

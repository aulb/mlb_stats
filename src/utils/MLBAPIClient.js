import axios from 'axios';

// Things to be mindful about
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const config = {
	timeout: 20000,
	baseURL: 'http://gd2.mlb.com/components/game/mlb/',
	method: 'get',
};

export default axios.create(config);

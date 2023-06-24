const axios = require('axios');
const { apiInfoClean, getDbGameByName } = require('../utils');
const { API_KEY } = process.env;


const getGameByName = async (name) => {
    const dbGames = await getDbGameByName(name);
    const apiReq = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    const apiGames = apiReq.data.results.map((game) => apiInfoClean(game));
    const allGames = dbGames.concat(apiGames);


    let allGamesFound = [];

    for (let i = 0; i < 15; i++) {
        allGamesFound.push(allGames[i]);
    }

    if (allGamesFound.length !== 0) {
        return allGamesFound;
    } else {
        throw Error('404 NOT FOUND: please try with other name');
    }
};


module.exports={
    getGameByName
};
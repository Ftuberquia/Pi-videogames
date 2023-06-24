const axios = require("axios");
const { apiInfoClean, getDbGameById } = require("../utils");
const { API_KEY } = process.env

const getGameById = async (idVideogame) => {
    if(Number(idVideogame)){
        const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
        const game = response.data;
        const apiGame = apiInfoClean(game);
        return apiGame;
    }else if(!Number(idVideogame)){
        const dbGame = await getDbGameById(idVideogame);
        return dbGame;
    }else{
        throw Error('404 videogame not found');
    }

};


module.exports={
    getGameById
};
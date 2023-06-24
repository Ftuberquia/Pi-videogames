const { dbInfo, apiVideogames } = require('../utils');


const gamesSaved = async () => {
    const apiGames = await apiVideogames();
    const dbVideogames = await dbInfo();
    const allGames = apiGames.concat(dbVideogames);
    return allGames
};   



module.exports={
    gamesSaved
};
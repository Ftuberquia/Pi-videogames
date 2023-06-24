const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;


/* ------------------------------------------ API INFO ---------------------------------------- */

const apiInfoClean = (videogame) => {
    return{
        id: videogame.id,
        name: videogame.name,
        description: videogame.description? videogame.description : 'sin descripcion',
        platforms: videogame.platforms.map((platform) => platform.platform.name),
        background_image: videogame.background_image,
        released: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres.map((genre) => genre.name)
    };
};

const apiVideogames = async() => { 

    let apiGames = [];

    const responses = await Promise.all([
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    ]);

    responses.forEach((response) => {
        apiGames = apiGames.concat(response.data.results);
    });
    const videogames = apiGames.map((game) => apiInfoClean(game));
 
    return videogames;
};



const getApiGenres = async () => {
    await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(async (res) => {
        const response = res.data.results;
        const apiGenres = response.map((genre) => genre.name);
        apiGenres.forEach(async (genre) => {
            await Genre.findOrCreate({
                where: {
                    name: genre
                }
            });
        });
        return apiGenres;
    })
    .catch((error) => {return error.message});
};





/* ------------------------------------- DATABASE INFO ------------------------------------- */

const dbInfo = async () => {
    const dbVideogames = await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }    
        }    
    });    



    let gameMap = dbVideogames.map((videogame) => {
        return{
            id: videogame.id,
            name: videogame.name,
            description: videogame.description? videogame.description : 'sin descripcion',
            platforms: videogame.platforms.map((platform) => platform),
            background_image: videogame.background_image,
            released: videogame.released,
            rating: videogame.rating,
            genres: videogame.genres.map((genre) => genre.name),
            createdInDb: videogame.createdInDb
        };    
    });    
    return gameMap;
};    


const getDbGameByName = async (name) => {
    const games = await Videogame.findAll({
        where:{
            name: {
                [Op.iLike]: `%${name}%`
            }    
        },
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            } 
        }    
    }); 

    

    const gamesFound = games.map((videogame) => {
        return{
        id: videogame.id,
        name: videogame.name,
        description: videogame.description? videogame.description : 'sin descripcion',
        platforms: videogame.platforms?.map((platform) => platform),
        background_image: videogame.background_image,
        released: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres?.map((genre) => genre.name),
        createdInDb: videogame.createdInDb
    }
    });
    

    return gamesFound;
};    




const getDbGenres = async () => {
    const dbGenres = await Genre.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
    });
    return dbGenres;
};



const getDbGameById = async (idVideogame) => {
    const dbGame = await Videogame.findOne({
        where:{
            id: idVideogame
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            } 
        }
    });

    const videogame = dbGame;

    const gameFound = {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description? videogame.description : 'sin descripcion',
        platforms: videogame.platforms?.map((platform) => platform),
        background_image: videogame.background_image,
        released: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres?.map((genre) => genre.name),
        createdInDb: videogame.createdInDb
    }

    return gameFound;
};


module.exports={
    apiInfoClean,
    dbInfo,
    getDbGameByName,
    getApiGenres,
    getDbGenres,
    getDbGameById,
    apiVideogames
};
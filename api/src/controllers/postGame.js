const { Videogame, Genre } = require('../db');

const postGame = async ( name, description, platforms, background_image, released, rating, genres, createdInDb ) => {
    const newGame = await Videogame.create({
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        genres,
        createdInDb
    });


    genres.forEach(async (genre) => {
        let dbGenre = await Genre.findAll({
            where:{
                name: genre
            }
        });
        if(dbGenre){
           newGame.addGenre(dbGenre) 
        }else{
            throw Error('Please try with another genre');
        }
        
    });

    return newGame
};

module.exports={
    postGame
};
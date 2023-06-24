const { getDbGenres, getApiGenres } = require('../utils');


const getGenres = async () => {
    const dbGenres = await getDbGenres();
    if (!dbGenres.length) {
        const apiGenres = await getApiGenres();
        return apiGenres
    } else {
        return dbGenres;
    }
};


module.exports={
    getGenres
};
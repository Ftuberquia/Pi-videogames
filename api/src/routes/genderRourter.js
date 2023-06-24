const { Router } = require("express");
const { getGenres } = require("../controllers/genresControllers.js/getGenres");

const genderRouter = Router();


genderRouter.get('/', async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports=genderRouter;
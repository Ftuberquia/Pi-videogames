const { gamesSaved } = require("../controllers/gamesControllers/getGames");
const { getGameById } = require("../controllers/gamesControllers/getGameById");
const { getGameByName } = require("../controllers/gamesControllers/getGameByName");
const { postGame } = require("../controllers/gamesControllers/postGame");
const { validatePostData } = require("../middleware/index");



module.exports={
  gamesSaved,
  getGameById,
  getGameByName,
  postGame,
  validatePostData,

};
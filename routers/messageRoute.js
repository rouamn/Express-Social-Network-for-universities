const  express =  require  ( 'express');
const MessageControllers=  require(  '../Controllers/MessageControllers.js');
const userAuth = require("../middleware/authMiddleware.js");
const router = express.Router()
router.post('/add', MessageControllers.addMessage);

router.get('/:chatId',MessageControllers.getMessages);


module.exports = router;
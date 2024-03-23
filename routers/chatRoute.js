const  express =  require  ( 'express');
const chatController=  require(  '../Controllers/chatController.js');
const userAuth = require("../middleware/authMiddleware.js");

const router = express.Router()

router.post('/create', chatController.createChat);
router.get('/:userId' , chatController.userChats);
router.get('/find/:firstId/:secondId', chatController.findChat);
router.get('/sidebar', chatController.getUsersForSidebar);

module.exports = router;
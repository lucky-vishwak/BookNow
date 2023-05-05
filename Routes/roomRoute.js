const express=require('express');
const { verifyTokenAdmin, verifyTokenUser } = require('../Middlewares/verifyToken');

const roomRoute=express.Router();

const upload=require('./../Middlewares/multer').multerObj


const roomController=require('./../Controllers/roomController')



roomRoute.post('/add-room',verifyTokenAdmin,upload.single('image'),roomController.addRoom);

roomRoute.get('/allrooms',roomController.allrooms)

roomRoute.post('/edit-room',verifyTokenAdmin,roomController.updateRoom);

roomRoute.post('/room-specific-access',verifyTokenUser,roomController.roomSpecificAccess);

roomRoute.post('/filter',verifyTokenUser,roomController.filterByType);

roomRoute.post('/room-events/:roomName',roomController.roomEvents);


module.exports={roomRoute};
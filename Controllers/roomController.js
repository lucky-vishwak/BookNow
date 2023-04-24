const roomModel=require('./../Models/roomModel').roomModel;

async function addRoom(req,res){
    let roomObj=req.body.roomObj;
    roomObj=JSON.parse(roomObj);
    roomObj['image']=req.file.path;
    console.log(roomObj);
   let obj=await roomModel.findOne({roomName:roomObj.roomName});
    if(obj!==null){
        res.send({mesage:'room name already exist'});
        return;
    }
    await roomModel.create(roomObj);
    res.send({message:'created successfully'})
}

async function allrooms(req,res){
    let allrooms=await roomModel.find({})
    res.send({message:"success",rooms:allrooms})
}

module.exports={addRoom,allrooms}
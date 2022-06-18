const exp=require('express');
const userApp=exp.Router();
const expressAsyncHandler=require('express-async-handler');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

userApp.use(exp.json());

require('dotenv').config();

userApp.get('/getusers',expressAsyncHandler(async(request,response)=>{
    let userCollectionObj=request.app.get("userCollectionObj");
    let users=await userCollectionObj.find().toArray();
    response.send({message:"All users",payload:users});
}));


userApp.post('/login',expressAsyncHandler(async(request,response)=>{
    let userCollectionObj=request.app.get("userCollectionObj");
    let userCredObj=request.body;
    let userOfDb=await userCollectionObj.findOne({username:userCredObj.username});
    if(userOfDb==null){
        response.send({message:"invalid user"});
    }
    else{
        let status=await bcryptjs.compare(userCredObj.password,userOfDb.password);
        if(status==false){
            response.send({message:"invalid password"});
        }
        else{
            let token=jwt.sign({username:userOfDb.username},process.env.SECRET_KEY,{expiresIn:60});
            response.send({message:"login success",payload:token,userObj:userOfDb});
        }
    }
}));


userApp.post('/create-user',expressAsyncHandler(async(request,response)=>{
    let userCollectionObj=request.app.get("userCollectionObj");
    let newUserObj=request.body;
    let userOfDb=await userCollectionObj.findOne({username:newUserObj.username})
    if(userOfDb!=null){
        response.send({message:"Username already existed... choose another"})
    }
    else{
        let hashedPassword=await bcryptjs.hash(newUserObj.password,6);
        newUserObj.password=hashedPassword;
        await userCollectionObj.insertOne(newUserObj);
        response.send({message:"user created successfully"});
    } 
}));
userApp.put('/update-user',(request,response)=>{
    
});

userApp.delete('/remove-user/:id',(request,response)=>{
   
});

module.exports=userApp;
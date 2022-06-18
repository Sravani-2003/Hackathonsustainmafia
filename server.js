const exp=require('express');
const app=exp();
const mclient=require('mongodb').MongoClient;

const path=require('path');

require('dotenv').config();

const Dburl=process.env.DATABASE_CONNECTION_URL

const port=process.env.PORT

app.use(exp.static(path.join(__dirname,'./build')))

const userApp=require('./APIS/userApi');
const productApp=require('./APIS/productApi');


mclient.connect(Dburl)
.then((client)=>{
    let dbObj=client.db("yathin2022");
    let userCollectionObj=dbObj.collection("usercollection");
    let productCollectionObj=dbObj.collection("productcollection");
    app.set("userCollectionObj",userCollectionObj);
    app.set("productCollectionObj",productCollectionObj);
    console.log('Database Connection Succesful')
})
.catch(err=>console.log('error in DB connection',err))




app.use('/user-api',userApp)
app.use('/product-api',productApp)

app.use('*',(request,respose)=>{
    respose.sendFile(path.join(__dirname,'./build/index.html'));
})

app.use((request,response,next)=>{
    response.send({message:"Invalid path: ${request.url}"})
})

app.use((error,request,response,next)=>{
    response.send(error.message)
})

app.listen(port,()=>console.log('server listening on port 4000....'))
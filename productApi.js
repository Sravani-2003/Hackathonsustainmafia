const exp=require('express');
const productApp=exp.Router();
const expressAsyncHandler=require('express-async-handler');

productApp.use(exp.json());


productApp.get('/getproducts',expressAsyncHandler(async(request,response)=>{
    let productCollectionObj=request.app.get("productCollectionObj");
    let products=await productCollectionObj.find().toArray();
    response.send({message:"All products",payload:products})

}));

productApp.get('/getproducts/:id',expressAsyncHandler(async(request,response)=>{
    let reqId=(+request.params.id);
    let productCollectionObj=request.app.get("productCollectionObj");
    let product=await productCollectionObj.findOne({productId:reqId});
    if(product==null){
        response.send({message:"product is not found"});
    }
    else{
        response.send({message:"product is found",payload:product});
    }
}));

productApp.post('/create-product',expressAsyncHandler(async(request,response)=>{
    let productObj=request.body;
    let productCollectionObj=request.app.get("productCollectionObj");
    let result=await productCollectionObj.insertOne(productObj);
    response.send({message:"Product created successfully"});
    
}));

productApp.put('/update-product',expressAsyncHandler(async(request,response)=>{
    let productCollectionObj=request.app.get("productCollectionObj");
    let productObj=request.body;
    let result =await productCollectionObj.updateOne({productId:productObj.productId},{$set:{...productObj}});
    response.send({message:"product modified"});
}));

productApp.delete('/delete-product/:id',expressAsyncHandler(async(request,response)=>{
    let delId=(+request.params.id);
    let productCollectionObj=request.app.get("productCollectionObj");
    let result=await productCollectionObj.deleteOne({productId:delId});
    response.send({message:"product deleted from database"})
}));

module.exports=productApp;
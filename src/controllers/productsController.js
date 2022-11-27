import { ObjectID } from "bson";
import { productsCollection } from "../database/db.js"

//Registro de produtos
export async function registerProducts(req,res){
    const product = req.product;
    
    try{
        await productsCollection.insertOne(product)
        res.status(200).send("Produto cadastrado com sucesso")
    } catch(error){
        console.log(error)
    }
}

//Pegar lista de produtos
export async function getProducts(req,res){
    const category = req.params.category;
    const id = req.query.id
    let products;
    try{
        if(category){
            products = await productsCollection.find({category}).toArray()
        } else if(id) {
            products = await productsCollection.find({_id: ObjectID(id)}).toArray()
        } else{
            products = await productsCollection.find().toArray()
        }
        
        res.send(products)
    } catch(error){
        console.log(error)
    }
}

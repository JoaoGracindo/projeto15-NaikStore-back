import { productsCollection } from "../database/db.js"

export async function registerProducts(req,res){
    const product = req.product
    
    try{
        await productsCollection.insertOne(product)
        res.status(200).send("Produto cadastrado com sucesso")
    } catch(error){
        console.log(error)
    }
}
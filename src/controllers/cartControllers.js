import { ObjectId } from "mongodb";
import { usersCollection, salesCollection } from "../database/db.js";
import { paymentSchema } from "../models/paymentModel.js";




export function getCartProducts(req, res){
    const user = res.locals.user;
    res.send(user.card)


    

}

export async function addToCart(req, res){
    const user = res.locals.user

    const productToAdd = req.body

    for(let i = 0; i < user.card.length; i++){
        const isDuplicated =  user.card[i]._id === productToAdd._id

        if(isDuplicated){
         
            return res.status(409).send("Esse produto já está no carrinho")
        }
    }


 

    const cardChange = 
        {
         $set: {card: [...user.card, productToAdd]}
        }

        try{
            await usersCollection.updateOne({_id: ObjectId(user._id)}, cardChange )
            
            res.sendStatus(201)

        }catch (err){

            res.status(500).send(err)
        }

   
    
}

export async function removeFromCart(req, res){
    const user = res.locals.user

    const productToRemove = req.body;
    console.log(req)
    console.log(productToRemove)

    const newCard = user.card.filter(product => product.name === productToRemove.name)

    const cardChange = 
        {
        $set: {card:  [newCard]}
        }

        try{
            await usersCollection.updateOne({_id: ObjectId(user._id)}, cardChange )
            res.sendStatus(200)

        }catch (err){

            res.status(500).send(err)
        }


    
}

export async function checkout(req, res){
    const user = res.locals.user;
    console.log(req.body)
    const {error} = paymentSchema.validate(req.body, { abortEarly: false })
    console.log(error)

    if(error){
        return res.status(400).send("Verifique as informaçoes digitadas")
    }

    const sale = {
        userEmail: user.email,
        payment: "Credit Card",
        products: user.card
    }
    console.log(sale)
    


    const cardChange = 
        {
        $set: {card:  []}
        }

        try{
            await salesCollection.insertOne(sale)
            await usersCollection.updateOne({_id: ObjectId(user._id)}, cardChange )
            res.sendStatus(200)

        }catch (err){

            res.status(500).send(err)
        }

    
}
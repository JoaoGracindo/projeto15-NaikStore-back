import { usersCollection } from "../database/db.js";




export function getCartProducts(req, res){
    const {user} = res.locals.user

    res.send(user.card)

}

export async function addToCart(req, res){
    const {user} = res.locals.user

    const {productToAdd} = req.body

    const isDuplicated = user.card.filter(product => product.name === productToAdd.name)

    if(isDuplicated){
        return res.status(409).send("Esse produto já está no carrinho")
    }

    const cardChange = 
        {
        $set: {card: [...user.card, productToAdd] }
        }

        try{
            await usersCollection.updateOne(user, cardChange )
            res.sendStatus(201)

        }catch (err){

            res.status(500).send(err)
        }

   
    
}

export async function removeFromCart(req, res){
    const {user} = res.locals.user

    const {productToRemove} = req.body

    const newCard = user.card.filter(product => product.name === productToRemove.name)

    const cardChange = 
        {
        $set: {card:  newCard}
        }

        try{
            await usersCollection.updateOne(user, cardChange )
            res.sendStatus(200)

        }catch (err){

            res.status(500).send(err)
        }


    
}

export async function removeAllFromCart(req, res){
    const {user} = res.locals.user


    const cardChange = 
        {
        $set: {card:  []}
        }

        try{
            await usersCollection.updateOne(user, cardChange )
            res.sendStatus(200)

        }catch (err){

            res.status(500).send(err)
        }

    
}
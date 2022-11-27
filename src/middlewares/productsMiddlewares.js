import { productSchema } from "../models/productsModel.js"

export function validateProducts(req,res, next){
    const {name, price, numbers, imgUrl, category}= req.body

    //Verifica se algum parametro do body esta vazio
    const isEmpety = !name || !price || !imgUrl || !category || numbers.length === 0

    if(isEmpety){
       return res.status(400).send("Produto invalido")
    }

    const {error} = productSchema.validate(req.body)
    
    if(error){
        return res.status(400).send("Verifique as informaçoes digitadas")
    }

    req.product = req.body
    next()
}
import joi from "joi"

export const productSchema = joi.object({
    name: joi.string().required().min(3),
    price: joi.string().required(),
    numbers: joi.array().required(),
    imgUrl: joi.string().required(),
    category: joi.string().required()
}) 
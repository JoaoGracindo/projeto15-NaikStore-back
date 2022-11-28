import joi from "joi"

export const paymentSchema = joi.object({
    number: joi.string().required().min(6),
    date: joi.string().required(),
    cvv: joi.string().required(),
}) 
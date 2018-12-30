import Joi from 'joi'


const name = Joi.string().max(50).min(3).required()
const slug = Joi.string().max(40).min(3).required()
const image = Joi.string().max(200).min(3).required()
const description = Joi.string().max(400).min(3)
const regular_price = Joi.number().positive().required()
const sale_price = Joi.number().positive().required()
const date_on_sale_from = Joi.string().max(100).min(3)
const date_on_sale_to = Joi.string().max(100).min(3)
const manage_stock = Joi.boolean()
const stock_quantity = Joi.number().positive()
const sku = Joi.string().max(50).min(3)

export function productEditValidation(product) {
  const productInputSchema = {
    id:Joi.objectId(),
    product: {
      name,
      slug,
      image,
      description,
      regular_price,
      sale_price,
      date_on_sale_from,
      date_on_sale_to,
      manage_stock,
      stock_quantity,
      sku
    }
  }
  return Joi.validate(product, productInputSchema)
}

export function productCreateValidation(product) {
  const productInputSchema = {
    product: {
      name,
      slug,
      image,
      description,
      regular_price,
      sale_price,
      date_on_sale_from,
      date_on_sale_to,
      manage_stock,
      stock_quantity,
      sku
    }
  }
  return Joi.validate(product, productInputSchema)
}

export function productDeleteValidaton(id) {
  const deleteInputSchema = { id:Joi.objectId() }
  return Joi.validate(id, deleteInputSchema)
}

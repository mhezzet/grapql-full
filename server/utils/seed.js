import mongoose from 'mongoose'
import faker from 'faker'
import { Product } from '../modules/product'
import uuid from 'uuid/v4'
import logger from '../utils/logging'

function random() {
  return {
    name: faker.name.findName(),
    slug: `${faker.name.suffix()}_${faker.lorem.word()}_${faker.helpers.slugify(
      faker.name.findName()
    )}_${faker.name.suffix()}`,
    image: 'https://picsum.photos/400/300/?random',
    description: faker.lorem.sentence(),
    regular_price: faker.random.number(),
    sale_price: faker.random.number(),
    date_on_sale_from: faker.date.future(),
    date_on_sale_to: faker.date.future(),
    manage_stock: faker.random.boolean(),
    stock_quantity: faker.random.number(),
    sku: uuid()
  }
}

export default async function() {
  let seed = []
  let product = {}

  const products = await Product.find({})
  if (products.length > 6) return

  for (let index = 0; index < 20; index++) {
    product = random()
    seed = [...seed, product]
  }
  await Product.insertMany(seed)
  logger.info('💯 Seeded the db')
}

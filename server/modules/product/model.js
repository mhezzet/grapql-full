import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      minlength: 3,
      required: true
    },
    slug: {
      type: String,
      maxlength: 40,
      minlength: 3,
      trim: true,
      lowercase: true,
      required: true,
      unique: true
    },
    image: {
      type: String,
      maxlength: 200,
      minlength: 3,
      required: true
    },
    description: {
      type: String,
      maxlength: 400,
      minlength: 3
    },
    regular_price: {
      type: Number,
      min: 0,
      required: true
    },
    sale_price: {
      type: Number,
      min: 0,
      required: true
    },
    date_on_sale_from: {
      type: String,
      maxlength: 100,
      minlength: 3
    },
    date_on_sale_to: {
      type: String,
      maxlength: 100,
      minlength: 3
    },
    manage_stock: {
      type: Boolean,
      default: true
    },
    stock_quantity: {
      type: Number,
      required: true
    },
    sku: {
      type: String,
      maxlength: 50,
      minlength: 3,
      unique: true
    }
  },
  {
    timestamps: true
  }
)

productSchema.plugin(uniqueValidator)

export default mongoose.model('product', productSchema)

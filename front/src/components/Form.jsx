import React, { useState } from 'react'
import * as yup from 'yup'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const schema = yup.object().shape({
  name: yup
    .string()
    .max(50)
    .min(3)
    .required(),
  slug: yup
    .string()
    .max(40)
    .min(3)
    .required(),
  image: yup
    .string()
    .max(200)
    .min(3)
    .required(),
  description: yup
    .string()
    .max(400)
    .min(3),
  regular_price: yup
    .number()
    .positive()
    .required(),
  sale_price: yup
    .number()
    .positive()
    .required(),
  date_on_sale_from: yup
    .string()
    .max(100)
    .min(3),
  date_on_sale_to: yup
    .string()
    .max(100)
    .min(3),
  manage_stock: yup.boolean(),
  stock_quantity: yup.number().positive(),
  sku: yup
    .string()
    .max(50)
    .min(3)
})

export default function Form({ old = {}, submitHandler, type = 'create' }) {
  const [product, setProduct] = useState({ ...old })
  const [error, setError] = useState()

  const changeHandler = (name, value) => {
    setProduct({ ...product, [name]: value })
  }

  const onSubmit = e => {
    e.preventDefault()
    schema
      .validate(product)
      .then(() => {
        setError('')
        submitHandler(product)
      })
      .catch(error => setError(error))
  }
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        margin: 'auto'
      }}
    >
      <Typography
        variant="caption"
        gutterBottom
        style={{ color: 'red', margin: 'auto' }}
      >
        {error && error.message}
      </Typography>
      <TextField
        id="outlined-name"
        label="Name"
        defaultValue={product.name}
        onChange={e => changeHandler('name', e.target.value)}
        margin="normal"
        variant="outlined"
        error={error && error.path === 'name'}
      />
      <TextField
        id="outlined-name"
        label="Slug"
        defaultValue={product.slug}
        onChange={e => changeHandler('slug', e.target.value)}
        margin="normal"
        variant="outlined"
        error={error && error.path === 'slug'}
      />
      <TextField
        id="outlined-name"
        label="SKU"
        defaultValue={product.sku}
        onChange={e => changeHandler('sku', e.target.value)}
        margin="normal"
        variant="outlined"
        error={error && error.path === 'sku'}
      />
      <TextField
        id="outlined-name"
        label="Image"
        defaultValue={product.image}
        onChange={e => changeHandler('image', e.target.value)}
        margin="normal"
        variant="outlined"
        error={error && error.path === 'image'}
      />
      <TextField
        id="outlined-name"
        label="Description"
        multiline
        rowsMax="4"
        defaultValue={product.description}
        onChange={e => changeHandler('description', e.target.value)}
        margin="normal"
        variant="outlined"
        error={error && error.path === 'description'}
      />
      <TextField
        id="outlined-number"
        label="Regular Price"
        defaultValue={product.regular_price}
        onChange={e => changeHandler('regular_price', Number(e.target.value))}
        type="number"
        margin="normal"
        variant="outlined"
        error={error && error.path === 'regular_price'}
      />
      <TextField
        id="outlined-name"
        label="Sale Price"
        defaultValue={product.sale_price}
        onChange={e => changeHandler('sale_price', Number(e.target.value))}
        type="number"
        margin="normal"
        variant="outlined"
        error={error && error.path === 'sale_price'}
      />
      <TextField
        id="outlined-name"
        label="Stock Quantity"
        defaultValue={product.stock_quantity}
        onChange={e => changeHandler('stock_quantity', Number(e.target.value))}
        type="number"
        margin="normal"
        variant="outlined"
        error={error && error.path === 'stock_quantity'}
      />
      <TextField
        id="outlined-name"
        label="Manage Stock"
        select
        value={product.manage_stock}
        onChange={e => changeHandler('manage_stock', e.target.value)}
        margin="normal"
        variant="outlined"
        error={error && error.path === 'manage_stock'}
      >
        <MenuItem value={true}>true</MenuItem>
        <MenuItem value={false}>false</MenuItem>
      </TextField>
      <TextField
        id="outlined-name"
        label="date on sale to"
        defaultValue={product.date_on_sale_to}
        onChange={e => changeHandler('date_on_sale_to', e.target.value)}
        margin="normal"
        variant="outlined"
        error={error && error.path === 'date_on_sale_to'}
      />
      <TextField
        id="outlined-name"
        label="Date on Sale From"
        defaultValue={product.date_on_sale_from}
        onChange={e => changeHandler('date_on_sale_from', e.target.value)}
        margin="normal"
        variant="outlined"
        error={error && error.path === 'date_on_sale_from'}
      />
      <Button type="submit">{type}</Button>
    </form>
  )
}

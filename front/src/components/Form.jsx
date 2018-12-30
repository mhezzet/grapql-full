import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

export default function Form({ old = {}, submitHandler, type = 'create' }) {
  const [product, setProduct] = useState({ ...old })

  const changeHandler = (name, value) => {
    setProduct({ ...product, [name]: value })
  }

  const onSubmit = e => {
    e.preventDefault()
    submitHandler(product)
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
      <TextField
        id="outlined-name"
        label="Name"
        defaultValue={product.name}
        onChange={e => changeHandler('name', e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="Slug"
        defaultValue={product.slug}
        onChange={e => changeHandler('slug', e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="SKU"
        defaultValue={product.sku}
        onChange={e => changeHandler('sku', e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="Image"
        defaultValue={product.image}
        onChange={e => changeHandler('image', e.target.value)}
        margin="normal"
        variant="outlined"
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
      />
      <TextField
        id="outlined-number"
        label="Regular Price"
        defaultValue={product.regular_price}
        onChange={e => changeHandler('regular_price', Number(e.target.value))}
        type="number"
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="Sale Price"
        defaultValue={product.sale_price}
        onChange={e => changeHandler('sale_price', Number(e.target.value))}
        type="number"
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="Stock Quantity"
        defaultValue={product.stock_quantity}
        onChange={e => changeHandler('stock_quantity', Number(e.target.value))}
        type="number"
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="Manage Stock"
        select
        value={product.manage_stock}
        onChange={e => changeHandler('manage_stock', e.target.value)}
        margin="normal"
        variant="outlined"
      >
        <MenuItem value={true}>true</MenuItem>{' '}
        <MenuItem value={false}>false</MenuItem>
      </TextField>
      <TextField
        id="outlined-name"
        label="date on sale to"
        defaultValue={product.date_on_sale_to}
        onChange={e => changeHandler('date_on_sale_to', e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        label="Date on Sale From"
        defaultValue={product.date_on_sale_from}
        onChange={e => changeHandler('date_on_sale_from', e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button type="submit">{type}</Button>
    </form>
  )
}

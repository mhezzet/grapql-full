import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Gallery from './views/Gallery'
import Product from './views/Product'
import ProductForm from './views/ProductForm'
import NotFound from './views/NotFound'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/dashboard/products" component={Dashboard} />
          <Route exact path="/dashboard/products/:type/:slug" component={ProductForm}/>
          <Route exact path="/dashboard/products/:type" component={ProductForm}/>
          <Route exact path="/products/:slug" component={Product} />
          <Route exact path="/products" component={Gallery} />
          <Route exact path="/" component={Gallery} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

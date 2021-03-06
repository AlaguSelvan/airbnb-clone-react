import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Provider } from 'react-redux' 

import Header from 'components/shared/Header'
import ProtectedRoute from 'components/shared/auth/ProtectedRoute'
import LoggedInRoute from 'components/shared/auth/LoggedInRoute'
import  RentalListing from 'components/rental/rental-listing/RentalListing'
import RentalSearchListing from 'components/rental/rental-listing/RentalSearchListing'
import RentalCreate from 'components/rental/rental-create/RentalCreate'
import RentalManage from 'components/rental/rental-manage/RentalManage'
import  RentalDetail from 'components/rental/rental-detail/RentalDetail'
import BookingManage from 'components/booking/booking-manage/BookingManage'
import Login from 'components/login/Login'
import {Register} from 'components/register/Register'
import * as actions from 'actions'
import './App.css'
const store = require('./reducers').init()
class App extends Component {

  componentDidMount() {
    this.checkAuthState()
  }
  
  checkAuthState() {
    store.dispatch(actions.checkAuthState())
  }

  logout = () => {
    store.dispatch(actions.logout())
  }

  render() {
  return (
      <Provider store={store}>
      <BrowserRouter>
  <div className='App'>
      <Header logout={this.logout} />
  <div className='container'>

  <Switch>
  <Route exact path='/rentals' component ={RentalListing} />
  <Route exact path='/' render = {()=>{ return <Redirect to = 'rentals' /> }} />
  <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
  <ProtectedRoute exact path='/rentals/new' component={RentalCreate} />
  <ProtectedRoute exact path='/rentals/manage' component={RentalManage} />
  <ProtectedRoute exact path='/bookings/manage' component={BookingManage} />
  <ProtectedRoute exact path='/rentals/:id' component={RentalDetail} />
  <Route exact path='/login' component={Login} />
  </Switch>
  <LoggedInRoute exact path='/register' component={Register} />
      </div>
      </div>
      </BrowserRouter>
      </Provider>
    )
  }
}

export default App

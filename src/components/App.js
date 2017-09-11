import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import {getCustomerList, postCustomer, createCustomer, getCustomer, deleteCustomer, updateCustomer } from '../customers.js';


class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }

  }

  componentDidMount() {
    getCustomerList().then(list => {
      console.log(list);
      this.setState({customerList: list});
    });
  }

  startNewCustomer = () => {
    this.setState({
      creating: true,
      initialLoad: true,
      currentCustomer: null
    });
  }

  createCustomer = (customer) => {
    postCustomer(customer)
      .then((response) => {
        getCustomerList().then((list) => {
          this.setState({
            initialLoad: true,
            creating: false,
            customerList: list
          });
        });
      });
  }

  selectCustomer = (id) => {
    getCustomer(id)
      .then((response) => {
        this.setState({
          currentCustomer: response,
          initialLoad: false
        });
      });
  }

  saveEdit = (id, customerObj) => {
    updateCustomer(id, customerObj)
      .then((response) => {
        getCustomerList().then((list) => {
          this.setState({
            customerList: list,
            currentCustomer: response
          });
        });
      });
  }

  removeCustomer = (id) => {
    deleteCustomer(id)
      .then((resonse) => {
        getCustomerList().then((list) => {
          this.setState({
            customerList: list,
            currentCustomer: null,
            initialLoad: true
          });
        });
      });
  }


  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
              customerList={this.state.customerList || []}
              startNewCustomer={this.startNewCustomer}
              selectCustomer={this.selectCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    createCustomer={this.createCustomer}
                    saveEdit={this.saveEdit}
                    removeCustomer={this.removeCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;

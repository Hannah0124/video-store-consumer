import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Rental from './Rental';
import './CustomerDetails.css';


const CustomerDetails = (props) => {
  const BASE_URL = "http://localhost:3000/";
  
  const [rentalList, setRentalList] = useState([]);
  const [customer, setCustomer] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
    

  const onInputChange = event => {
    const {name, value} = event.target; 
    const customerCopy = {...customer}

    console.log('name ', name);
    console.log('value ', value);

    customerCopy.name = value;
    setCustomer(customerCopy);

    // console.log('customer? ', customer)
  };

  const findCustomer = (currentCustomerName) => {
    console.log("currentCustomerName ", currentCustomerName);
    console.log('customers', props.customers)
    const newCustomer = props.customers.find((customer) => {
      return customer.name.toLowerCase() === currentCustomerName.toLowerCase();
    });

    if (!newCustomer) {
      setErrorMessage('No customer match found');
    } else {
      setCustomer(newCustomer);
      console.log('id??? ', newCustomer.id)
      onSearch(newCustomer.id);
    }
  } 



  const onSubmit = event => {
    event.preventDefault();

    findCustomer(customer.name);

    // clear text fields for next submission
    // setCustomer({});
  }

  const onSearch = (customerId) => {    
    
    axios.get(BASE_URL + "customers/" + `${customerId}`)
      .then((response) => {
        const currentRentalList = response.data;
        console.log("currentRentalList!!: ", currentRentalList)
        if (currentRentalList.length === 0) {
          console.log("no rentals found");
        } else {
          const rentalsCopy = currentRentalList.map(rental => {

            return (
              <section key={rental.id}>
                <Rental 
                  checkoutDate={rental.checkout_date}
                  dueDate={rental.due_date}
                  name={rental.name}
                  returned={rental.returned}
                  title={rental.title}
                />
            </section>
            );
          });

          setRentalList(rentalsCopy);
        }

        
      })
      .catch((error) => {
        // setErrorMessage("error: " + error.cause);
        console.log("failed search: " + error);
      });    
    };
  
  return (
    // after making search, can add a movie from results to rental library (local API)
    <div className="search-container body-container">

      {errorMessage &&
      <div className="alert">
        <h2>{errorMessage}</h2>
      </div>}

      <form className="" onSubmit={onSubmit}>
        <header className="search-box-title">Search for the customer details</header>
        <div className="search-box-container">
          <input
            className="search-box"
            type="text"
            name="text"
            placeholder="search here"
            onChange={onInputChange}
            value={customer.name}
          />
          <input type="submit" value="Search" className="search-btn" />
        </div>
      </form>

      {
        rentalList && customer &&
        <div className="rental-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Checkout Date</th>
                <th>Due Date</th>
                <th>Returned</th>
              </tr>
            </thead>
            <tbody>
              {rentalList}
            </tbody>
          </table>
        </div>
      }
    </div>
  )}

export default CustomerDetails;

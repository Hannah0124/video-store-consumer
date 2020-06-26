import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Rental from './Rental';
import './CustomerDetails.css';


const CustomerDetails = (props) => {
  const BASE_URL = "https://doge-rental.herokuapp.com/";
  
  const [rentalList, setRentalList] = useState([]);
  const [customer, setCustomer] = useState({name: ''});
  const [errorMessage, setErrorMessage] = useState("");
  const [flash, setFlash] = useState("");
    
  const onInputChange = event => {
    const {value} = event.target; 
    const customerCopy = {...customer}

    customerCopy.name = value;
    setCustomer(customerCopy);

  };

  const findCustomer = (currentCustomerName) => {
    const newCustomer = props.customers.find((customer) => {
      return customer.name.toLowerCase() === currentCustomerName.toLowerCase();
    });

    if (!newCustomer) {
      setErrorMessage('No customer match found');
    } else {
      setCustomer(newCustomer);
      getCustomer(newCustomer.id);
    }
  } 



  const onSubmit = event => {
    event.preventDefault();

    findCustomer(customer.name);

    // clear text fields for next submission
    // setCustomer({});
  }

  const getCustomer = (customerId) => {    
    
    axios.get(`${BASE_URL}customers/${customerId}`)
      .then((response) => {
        const currentRentalList = response.data;

        if (currentRentalList.length === 0) {
          setErrorMessage("no rentals found");
        } else {
          const rentalsCopy = currentRentalList.map(rental => {

            return (
              // <section key={rental.id}>
                <Rental 
                  key={rental.id}
                  customerId={rental.customer_id}
                  checkoutDate={rental.checkout_date}
                  dueDate={rental.due_date}
                  name={rental.name}
                  returned={rental.returned}
                  title={rental.title}
                  returnRentalCallback={returnRental}
                />
            // </section>
            );
          });

          setRentalList(rentalsCopy);
        }

        
      })
      .catch((error) => {
        setErrorMessage("error: " + error.cause);
        // console.log("failed search: " + error); // TODO
      });    
    };
  

  // http://localhost:3000/rentals/Psycho/return?customer_id=5

  const returnRental = (movieTitle, customerId) => {
    axios.post(BASE_URL + 'rentals/' + movieTitle + '/return?customer_id=' + customerId)
      .then((response) => {
        findCustomer(customer.name);
        
        setFlash(`${movieTitle} was succefully returned!`)

        setTimeout(() => {
          setFlash("");
        }, 3000);
        
      })
      .catch((error) => {
        setErrorMessage("error: " + error.cause);
      })
  }

  return (
    // after making search, can add a movie from results to rental library (local API)
    <div className="search-container body-container">

      {errorMessage &&
      <div className="alert">
        <p>{errorMessage}</p>
      </div>}

      {flash && <p className="flash-message">{flash}</p>}

      <form className="" onSubmit={onSubmit}>
        <header className="search-box-title">Search for customer details</header>
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
                <th></th>
                <th></th>
                <th>Title</th>
                <th></th>
                <th></th>
                <th>Checkout Date</th>
                <th></th>
                <th></th>
                <th>Due Date</th>
                <th></th>
                <th></th>
                <th>Returned</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rentalList}
            </tbody>
          </table>
        </div>
      }
    </div>
  )};


CustomerDetails.propTypes = {
  customers: PropTypes.array.isRequired,
};
      


export default CustomerDetails;

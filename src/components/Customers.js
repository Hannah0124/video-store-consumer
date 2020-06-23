import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Customer from './Customer';


const Customers = (props) => {

  const[customers, setCustomers] = useState([]);
  const[errorMessage, setErrorMessage] = useState(null); 

  useEffect(() => {
    axios.get(props.baseUrl + "customers/")
    
    .then((response) => {
      const apiData = response.data;
      console.log("customers:", apiData);

      const customerObjects = apiData.map((customer, i) => {
        console.log("customer: ", customer);

        return {
          id: customer.id,
          name: customer.name,
          accountCredit: customer.account_credit,
          address: customer.address,
          moviesCheckedOutCount: customer.movies_checked_out_count,
          phone: customer.phone,
          postalCode: customer.postal_code,
          registeredAt: customer.registered_at,
          state: customer.state
        }
      });

      setCustomers(customerObjects);

      })

      .catch((error) => {
        // console.log("error: ", error.message)
        setErrorMessage(error.message);
      });
  }, []);


  const customerComponents = customers.map((customer, i) => {
    return (
      <section key={customer.id}>
        {errorMessage &&
        <div className="validation-errors-display__list">
          <h2>{errorMessage}</h2>
        </div>}

        <Customer 
          id={customer.id}
          name={customer.name}
          accountCredit={customer.account_credit}
          moviesCheckedOutCount={customer.movies_checked_out_count}
          phone={customer.phone}
          postalCode={customer.postal_code}
          registeredAt={customer.registered_at}
          state={customer.state}
        />
      </section>
    );
  });

  return (
    // can see a list of all customers - make a call to the internal video store API?

    // can select a customer
    // selection will then be visible across the app - use a state to store this info?
    <div>
      <h1>Customers</h1>
      <div className="customer">{customerComponents}</div>
    </div>
  );
};

export default Customers;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Customer from './Customer';


const Customers = (props) => {

  const[customers, setCustomers] = useState([]);
  const[errorMessage, setErrorMessage] = useState(null); 
  const doggos = [];
  
  const getDoggo = () => {
    for (let i = 0; i < customers.length; i++) {
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        doggos.push(response.message);
      })
      .catch(error => {
        console.log(error);
      });
    };  
  }  

  useEffect(() => {
    axios.get(props.baseUrl + "customers/")
    
    .then((response) => {
      getDoggo();
      const apiData = response.data;
      const customerObjects = apiData.map((customer, i) => {
        return {
          id: customer.id,
          name: customer.name,
          accountCredit: customer.account_credit,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          postalCode: customer.postal_code,
          moviesCheckedOutCount: customer.movies_checked_out_count,
          phone: customer.phone,
          registeredAt: customer.registered_at,
          // image: doggos[i]
        }
      });

      setCustomers(customerObjects);
      
      })

    .catch((error) => {
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
          accountCredit={customer.accountCredit}
          moviesCheckedOutCount={customer.moviesCheckedOutCount}
          phone={customer.phone}
          address={customer.address}
          postalCode={customer.postalCode}
          registeredAt={customer.registeredAt}
          state={customer.state}
          city={customer.city}
          // image={customer.image}
          selectCustomerCallback={props.selectCustomerCallback}
        />
      </section>
    );
  });

  return (
    <div>
      <h1>Customers</h1>
      <div className="customer">{customerComponents}</div>
    </div>
  );
};

export default Customers;
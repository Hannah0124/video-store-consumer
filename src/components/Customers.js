import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Customer from './Customer';

import './Customers.css';

const Customers = (props) => {

  const customerComponents = props.customers.map((customer, i) => {
    return (
      <section key={customer.id} className="customer-components">
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
          selectCustomerCallback={props.selectCustomerCallback}
        />
      </section>
    );
  });

  return (
    <div className="customers-container">
      <h1 className="customers-title">Customers</h1>
      <div className="customer-components">{customerComponents}</div>
    </div>
  );
};

export default Customers;
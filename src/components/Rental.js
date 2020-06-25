import React from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './Rental.css';


const Rental = (props) => {
  return (      
    <tr key={props.id}>
      <td>{props.name}</td>
      <td>{props.title}</td>
      <td>{props.checkoutDate}</td>
      <td>{props.dueDate}</td>
      <td>{props.returned === true ? 'true' : 'false'}</td>
      <td>
        {
          (props.returned === false) && <button onClick={() => props.returnRentalCallback(props.title, props.customerId)}>Return</button>
        }
      </td>
    </tr>
  );
};

export default Rental;
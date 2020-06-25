import React from 'react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './Rental.css';


const Rental = (props) => {
  return (      
    <tr key={props.id}>
      <td>{props.name}</td>
      <td></td>
      <td></td>
      <td>{props.title}</td>
      <td></td>
      <td></td>
      <td>{props.checkoutDate}</td>
      <td></td>
      <td></td>
      <td>{props.dueDate}</td>
      <td></td>
      <td></td>
      <td>{props.returned === true ? 'true' : 'false'}</td>
      <td></td>
      <td>
        {
          (props.returned === false) && <button onClick={() => props.returnRentalCallback(props.title, props.customerId)} className="button-bg return-btn">Return</button>
        }
      </td>
    </tr>
  );
};

export default Rental;
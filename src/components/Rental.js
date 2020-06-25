import React from 'react'
import PropTypes from 'prop-types';
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

Rental.propTypes = {
  customerId: PropTypes.number.isRequired,
  checkoutDate: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  returned:  PropTypes.bool.isRequired,
  title:  PropTypes.string.isRequired,
  returnRentalCallback: PropTypes.func.isRequired,
};
                  
export default Rental;

import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Customer.css';


const Customer = (props) => {
  const onSelectClick = () => {    
    props.selectCustomerCallback(props);    
  };
  
  return (
    <div className="customer-container">
      <img src={"https://placedog.net/200/200/" + props.id} alt="dog" className="rounded-circle" />
      

      <div className="customer-info">
        <h4 className="customer-name"><Link to={`/customerdetails`} className="">
        {props.name}
        </Link></h4>
        <p className="gray-font">{props.address}</p>
        <p className="gray-font">{props.city}, {props.state} {props.postalCode}</p>
        <p className="gray-font">{props.phone}</p>
        <p><strong>Movies Checked Out: </strong>{props.moviesCheckedOutCount}</p>
      </div>

      <button className="button-bg" onClick={onSelectClick}>
        Select Customer
      </button>
    </div>
  );
};


Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  accountCredit: PropTypes.number,
  moviesCheckedOutCount: PropTypes.number,
  phone: PropTypes.string,
  address: PropTypes.string,
  postalCode: PropTypes.string,
  registeredAt: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  selectCustomerCallback: PropTypes.func.isRequired,
};


export default Customer;

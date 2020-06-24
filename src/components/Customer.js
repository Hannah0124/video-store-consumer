import React from 'react'
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
        <h4 className="customer-name">{props.name}</h4>
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


// // TODO
// Customer.propTypes = {
//   id: PropTypes.number.isRequired,
//   imageUrl: PropTypes.string,
//   overview: PropTypes.string,
//   releaseDate: PropTypes.string,  
//   title: PropTypes.string.isRequired
// };

export default Customer;

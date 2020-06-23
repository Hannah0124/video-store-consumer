import React from 'react'
import PropTypes from 'prop-types';


const Customer = (props) => {
  const onSelectClick = () => {    
    props.selectCustomerCallback(props);    
  };
  
  return (
    <div className={props.id}>
      <img src="https://placedog.net/300/300?random" alt="dog" />
      <h1>{props.name}</h1>

      <div>
        <p>{props.address}</p>
        <p>{props.state}, {props.postalCode}</p>
        <p>{props.phone}</p>
        <p><strong>Movies Checked Out: </strong>{props.moviesCheckedOutCount}</p>
      </div>

      <button className="" onClick={onSelectClick}>
        Select customer
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

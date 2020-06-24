import React from 'react'
import PropTypes from 'prop-types';


const Customer = (props) => {
  const onSelectClick = () => {    
    props.selectCustomerCallback(props);    
  };
  
  return (
    <div className={props.id}>
      <img src={"https://placedog.net/200/200/" + props.id} alt="dog" />
      <h1>{props.name}</h1>

      <div>
        <p>{props.address}</p>
        <p>{props.city}, {props.state} {props.postalCode}</p>
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

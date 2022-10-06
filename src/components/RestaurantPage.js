import React, { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import Orders from './Orders'
import RestaurantList from './RestaurantList'
import RestaurantSearchBar from "./RestaurantSearchBar";
import SideBar from "./SideBar";


function RestaurantPage () {
    const [service, setService] = useState(null);
    const [header, setHeader] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [addressChange, onAddressChange] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        fetch(`http://localhost:9292/delivery/${window.location.href.slice(-1)}/restaurants`)
        .then((r) => r.json())
      .then((service) => setService(service));
  }, []);

  useEffect(() => {
    setId(window.location.href.slice(-1))
  }, [])

  useEffect(() => {
    let id = window.location.href.slice(-1)
    switch (id) {
        case '1': 
            setHeader("Grubhub");
            break;
        case '2':
            setHeader("Postmates");
            break;
        case '3':
            setHeader("Doordash");
            break;
        case '4':
            setHeader("Uber Eats");
            break;
        case '5':
            setHeader("JoyRun");
            break;
        default:
            setHeader("Invalid ID");
    }
  }, [])

  if (!service) return <h2>Loading available restaurants...</h2>;

  const displayedRestaurants = service.filter((service) => {
    return service.category.toLowerCase().includes(searchTerm.toLowerCase()) || service.name.toLowerCase().includes(searchTerm.toLowerCase());
  })

  function handleAddressSubmit(e){
    e.preventDefault();
    setAddress(addressChange);
  }

  function handleClick(e){
    e.preventDefault();
    setAddress("");
  }

  return (
    <div className="restaurant-page">
      <SideBar />
      <div className="main-column">
        <div className="restaurant-header">
          <span role="img">
              <img className="delivery-picture" src="https://cdn-icons-png.flaticon.com/512/1048/1048329.png"></img>
          </span>
          <h1 className="restaurant-header">Uber Eats</h1>
        </div>
        <div className="sponsored-restaurant">
          <img className="sponsored-pic" src="https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"/>
          <p className="sponsor-text">Sponsored</p>
        </div>
        <RestaurantSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
        <RestaurantList services={displayedRestaurants} id={id}/>
      </div>
      <div className="order-column">
        <h3>My Order:</h3>
        <div className="order-column-top">
            <p>Deliver to:</p>
            <p className="address-text">{address ? address : <AddressForm addressChange={addressChange} onAddressChange={onAddressChange} handleAddressSubmit={handleAddressSubmit}/>}</p>
            {address ? <button onClick={handleClick}>change address</button> : null}
        </div>
        <br className="order-line-break"/>
      </div>
    </div>
  );
}

export default RestaurantPage;
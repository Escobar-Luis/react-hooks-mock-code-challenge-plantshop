import React, { useState, createRef } from "react";

function PlantCard({plant, onNewPrice, onDelete}) {
  const [isCLicked, setIsClicked] = useState(true)
  const[price, setPrice] = useState(0)
  const[newP, setNewP] = useState(0)

  function handleChange () {
    setIsClicked(!isCLicked)
  }
function handleDelete() {
  fetch(`http://localhost:6001/plants/${plant.id}`, {
    method: "DELETE"
  })
  .then(r=>r.json())
  .then(() => onDelete(plant))
}
  function updatePrice (e) {
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        price : price
      })
    })
    .then(r=>r.json())
    .then((updatedItem) => onNewPrice(updatedItem))
    
  }
  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {isCLicked ? (
        <>
        <button className="primary" onClick={handleChange}>In Stock</button>
        <form type='submit' onSubmit={updatePrice}>
        <button type='submit'>Change Price</button>
        <input onChange={(e) => setPrice(e.target.value)}type='number' step="0.01"></input>
        </form>
        </>) : (
          <>
          <button onClick={handleChange}>Out of Stock</button>
          <button onClick={handleDelete} style={{color: 'Red'}}>Wanna Delete?</button>
          </>
          )}
    </li>
  );
}

export default PlantCard;

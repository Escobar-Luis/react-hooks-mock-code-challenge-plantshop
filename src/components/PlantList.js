import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onNewPrice, onDelete}) {
  return (
    <ul className="cards">{plants.map((plant)=> {
      return (
        <PlantCard onDelete={onDelete} onNewPrice={onNewPrice} key={plant.id} plant={plant} />
      )
    })}</ul>
  );
}

export default PlantList;

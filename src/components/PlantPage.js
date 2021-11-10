import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const[plantData, setPlantData] = useState([])
  const[search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(r=>r.json())
    .then((plants) => setPlantData(plants))
  }, [])
  
  function handleAddPlant (newPlant) {
    setPlantData([...plantData, newPlant])
  }

  function handleDelete(deletedPlant) {
    const updatedPlants = plantData.filter((plant) => plant.id !== deletedPlant.id)
    setPlantData(updatedPlants)
  }

  const visiblePlants = plantData.filter((plant) => plant.name.includes(search))

  function handleNewPrice (updatedItem) {
    const updatedPlants=plantData.map((plant) => {
      if (plant.id === updatedItem.id) {
        return updatedItem
      } else {
        return plant
      }
    })
    setPlantData(updatedPlants)
  }
  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant}/>
      <Search setSearch={setSearch}/>
      <PlantList onDelete={handleDelete} onNewPrice={handleNewPrice} plants={visiblePlants}/>
    </main>
  );
}

export default PlantPage;

import { useState, useEffect } from "react";
import inventoryService from "../services/inventoryService";

import AddAndUpdateInventory from "../components/AddAndUpdateInventory";
import InventoryList from "../components/InventoryList";

function InventoryHome() {
  const [inventory, setInventory] = useState([]);

  const handleCallback = (newInventory) => {
    setInventory([...inventory, newInventory]);
    console.log("From Parent: ", newInventory);
  };

  const toggleEditOrDeleteHome = (items) => {
    setInventory([...items]);
  };

  useEffect(() => {
    async function fetchInventory() {
      try {
        let result = await inventoryService.getInventories(false);

        for (let index = 0; index < result.length; index++) {
          result[index] = {
            ...result[index],
            isDelete: false,
            isEdit: false,
          };
        }
        setInventory([...result]);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    }
    fetchInventory();
  }, []);
  return (
    <>
      <section className="heading">
        <div>Inventory Home</div>
      </section>
      <section className="content">
        <AddAndUpdateInventory parentCallback={handleCallback} />
      </section>
      <InventoryList
        inventories={inventory}
        toggleEditOrDeleteHome={(items) => toggleEditOrDeleteHome(items)}
      />
    </>
  );
}

export default InventoryHome;

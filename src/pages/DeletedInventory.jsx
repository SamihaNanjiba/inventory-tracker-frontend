import { useState, useEffect } from "react";
import inventoryService from "../services/inventoryService";

import DeletedInventoryList from "../components/DeletedInventoryList";

function InventoryHome() {
  const [deletedInventory, setDeletedInventory] = useState([]);

  const renderParentList = (items) => {
    setDeletedInventory([...items]);
  };

  useEffect(() => {
    async function fetchDeletedInventory() {
      try {
        let result = await inventoryService.getInventories(true);
        setDeletedInventory([...result]);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    }
    fetchDeletedInventory();
  }, []);

  return (
    <>
      <section className="heading">
        <div>Deleted Inventories</div>
      </section>

      <DeletedInventoryList
        deletedInventory={deletedInventory}
        renderList={(items) => renderParentList(items)}
      />
    </>
  );
}

export default InventoryHome;

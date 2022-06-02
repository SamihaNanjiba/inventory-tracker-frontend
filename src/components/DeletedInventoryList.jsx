import inventoryService from "../services/inventoryService";
import InventoryItem from "./InventoryItem";

const DeletedInventoryList = ({ deletedInventory, renderList }) => {
  const restoreParentItem = async (id) => {
    try {
      await inventoryService.updateInventoryItem(id, {
        is_deleted: false,
        deletion_comment: "",
      });
      const idx = deletedInventory.findIndex((item) => item._id === id);
      deletedInventory[idx].is_deleted = false;
      deletedInventory[idx].deletion_comment = "";
      renderList(deletedInventory);
    } catch (error) {}
  };

  return (
    <>
      <section className="content">
        {deletedInventory.length > 0 ? (
          <div className="items">
            {deletedInventory.map(
              (item) =>
                item.is_deleted && (
                  <InventoryItem
                    key={item._id}
                    item={item}
                    restoreItem={(id) => restoreParentItem(id)}
                  />
                )
            )}
          </div>
        ) : (
          <h3>You don't have any deleted items in your inventory yet</h3>
        )}
      </section>
    </>
  );
};

export default DeletedInventoryList;

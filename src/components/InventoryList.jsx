import InventoryItem from "./InventoryItem";
import DeleteInventory from "./DeleteInventory";
import AddAndUpdateInventory from "./AddAndUpdateInventory";

const InventoryList = ({ inventories, toggleEditOrDeleteHome }) => {
  const refreshParentList = (id, form) => {
    const idx = inventories.findIndex((item) => item._id === id);

    if (inventories[idx].isDelete) {
      inventories[idx].is_deleted = true;
      inventories[idx].deletion_comment = form.deletion_comment;
      inventories[idx].isDelete = false;
    } else {
      inventories[idx] = form;
      inventories[idx].isEdit = false;
    }
    toggleEditOrDeleteHome(inventories);
  };

  const toggleEditOrDelete = (id, isDelete) => {
    const idx = inventories.findIndex((item) => item._id === id);
    if (isDelete) {
      inventories[idx].isDelete = !inventories[idx].isDelete;
      inventories[idx].isEdit = false;
    } else {
      inventories[idx].isEdit = !inventories[idx].isEdit;
      inventories[idx].isDelete = false;
    }
    toggleEditOrDeleteHome(inventories);
  };

  return (
    <>
      <section className="content">
        {inventories.length > 0 ? (
          <div className="items">
            {inventories.map((item, idx) => (
              <div key={idx}>
                {!item.is_deleted && (
                  <InventoryItem
                    key={`${item._id}-item`}
                    item={item}
                    toggleEdit={(id) => toggleEditOrDelete(id, false)}
                    toggleDelete={(id) => toggleEditOrDelete(id, true)}
                  />
                )}
                {item.isDelete && (
                  <DeleteInventory
                    key={`${item._id}-delete`}
                    id={item._id}
                    isDelete={item.isDelete}
                    item={item}
                    refreshList={(id, form) => refreshParentList(id, form)}
                  />
                )}
                {item.isEdit && (
                  <AddAndUpdateInventory
                    key={`${item._id}-edit`}
                    id={item._id}
                    isEdit={item.isEdit}
                    item={item}
                    refreshList={(id, form) => refreshParentList(id, form)}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <h3>You don't have any items in your inventory yet</h3>
        )}
      </section>
    </>
  );
};

export default InventoryList;

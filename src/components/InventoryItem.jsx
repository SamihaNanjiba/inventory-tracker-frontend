function InventoryItem({ item, toggleDelete, toggleEdit, restoreItem }) {
  return (
    <>
      <div className="item">
        <h2>{item.name}</h2>
        <p>{item.is_deleted ? item.deletion_comment : item.description}</p>
        <p>In Stock: {item.count}</p>
        <div className="item-buttons">
          {item.is_deleted ? (
            <>
              <button
                className="btn btn-inline-block btn-restore"
                onClick={() => restoreItem(item._id)}
              >
                Restore
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-inline-block"
                onClick={() => toggleEdit(item._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-inline-block btn-delete"
                onClick={() => toggleDelete(item._id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default InventoryItem;

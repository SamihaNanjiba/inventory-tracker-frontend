import { useState, useEffect } from "react";
import inventoryService from "../services/inventoryService";
const initialState = {
  is_deleted: true,
  deletion_comment: "",
};

const DeleteInventory = ({ id, isDelete, refreshList }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (isDelete) {
      setForm(form);
    }
  }, []);

  async function deleteItem() {
    try {
      await inventoryService.updateInventoryItem(id, form);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("Error: ", message);
    }
  }

  const onChange = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    deleteItem();
    refreshList(id, form);
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h2>Delete Inventory Item?</h2>

          <label htmlFor="deletion_comment">Comment</label>
          <input
            type="text"
            name="deletion_comment"
            id="deletion_comment"
            value={form.deletion_comment}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block btn-delete" type="submit">
            Delete
          </button>
        </div>
      </form>
    </section>
  );
};

export default DeleteInventory;

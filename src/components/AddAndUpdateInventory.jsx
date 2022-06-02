import { useEffect } from "react";
import { useState } from "react";
import inventoryService from "../services/inventoryService";

const initialState = {
  name: "",
  count: 0,
  is_deleted: false,
  description: "",
  deletion_comment: "",
};

const AddAndUpdateInventory = ({
  parentCallback,
  isEdit,
  item,
  refreshList,
}) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (isEdit) {
      setForm(item);
    }
  }, []);

  async function submitForm() {
    try {
      if (isEdit) {
        await inventoryService.updateInventoryItem(item._id, form);
      } else {
        await inventoryService.createInventoryItem(form);
      }
      clearState();
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

  const clearState = () => {
    setForm({ ...initialState });
  };

  const onChange = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitForm();
    if (isEdit) {
      refreshList(item._id, form);
    } else {
      parentCallback(form);
    }
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Item Name <span className="danger">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="count">
            Count <span className="danger">*</span>
          </label>
          <input
            type="number"
            name="count"
            id="count"
            min={0}
            value={form.count}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={form.description}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            {isEdit ? "Update Item" : "Add new Item"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddAndUpdateInventory;

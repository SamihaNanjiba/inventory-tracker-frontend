import axios from "axios";

const API_URL = "https://inventory-tracker-backend-9lef.onrender.com";
// const API_URL = "http://localhost:3000/api/inventory/";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export const getInventories = async (isDeleted) => {
  const response = await axios.get(
    API_URL,
    { params: { is_deleted: isDeleted } },
    config
  );
  return response.data;
};

const createInventoryItem = async (inventoryData) => {
  const response = await axios.post(API_URL, inventoryData, config);
  return response.data;
};
const updateInventoryItem = async (id, inventoryData) => {
  const response = await axios.put(API_URL + `${id}`, inventoryData, config);
  return response.data;
};

const inventoryService = {
  createInventoryItem,
  getInventories,
  updateInventoryItem,
};

export default inventoryService;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import InventoryHome from "./pages/InventoryHome";
import DeletedInventory from "./pages/DeletedInventory";
// import AddAndUpdateInventory from "./components/AddAndUpdateInventory";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<InventoryHome />} />
            <Route path="/deleted" element={<DeletedInventory />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div>
        <Link to="/">Inventory</Link>
      </div>
      <h1>Shopify Challenge</h1>
      <ul>
        <li>
          <Link to="/deleted">View Deleted Items</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;

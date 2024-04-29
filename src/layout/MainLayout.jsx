/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/pos.css";

function MainLayout({ children }) {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div style={{textAlign:"center", color:"white"}}>
            <b>POS Dashboard</b>
          </div>
          <div className="container">
            <Link to="/" className="navbar-brand">
              <button className="btn btn-warning">
                <b>Home</b>
              </button>
            </Link>
            <div className="container">
              <Link to="/pos" className="navbar-brand">
                <button className="btn btn-warning">
                  <b>POS</b>{" "}
                </button>
              </Link>{" "}
              
            </div>
            <div>
              <div className="container">
                <Link to="/itemList" className="navbar-brand">
                  <button className="btn btn-warning">
                    <b>Item List</b>{" "}
                  </button>
                </Link>{" "}
              </div>
            </div>
          </div>
        </nav>
        <main>
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-6 offset-md-3">
              </div>
            </div>
            {children}
          </div>
          <ToastContainer />
        </main>
      </header>
    </div>
  );
}

export default MainLayout;

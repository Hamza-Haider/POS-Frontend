import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <div className="bg-light p-5 mt-4 rounded-3">
        <h1>Welcome to our Point of Sale Software</h1>
        <p>If you have an issue, call +923408289955 anytimes</p>
        <p>You can also Email us at Zaibali355@gmail.com</p>
        <Link to="/pos" className="btn btn-primary">
          Click here to sell products
        </Link>
      </div>
    </MainLayout>
  );
}

export default HomePage;

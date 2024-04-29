import { useEffect, useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { ComponentToPrint } from "../component/ComponentToPrint";
import { useReactToPrint } from "react-to-print";

function POSPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false); // Track if discount has been applied

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get("http://localhost:5055/getAllItem");
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  };

  const addProductToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity++;
      updatedCart[existingProductIndex].totalAmount += product.Price;
      setCart(updatedCart);
    } else {
      const addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.Price,
      };
      setCart([...cart, addingProduct]);
    }
    toast(`Added ${product.Name} to cart`, toastOptions);
  };

  const removeProduct = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  const increaseQuantity = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === product.id);
    updatedCart[index].quantity++;
    updatedCart[index].totalAmount += product.Price;
    setCart(updatedCart);
  };

  const decreaseQuantity = (product) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === product.id);
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      updatedCart[index].totalAmount -= product.Price;
      setCart(updatedCart);
    }
  };

  const applyDiscount = () => {
    if (!discountApplied) {
      // Check if discount has not been applied yet
      const discountAmount = totalAmount * 0.05; // Calculate 5% discount
      setTotalAmount(totalAmount - discountAmount);
      setDiscountApplied(true); // Set discount applied to true
      toast("Discount applied successfully!", toastOptions);
    } else {
      toast("Discount already applied!", toastOptions);
    }
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = cart.reduce(
      (total, item) => total + item.totalAmount,
      0
    );
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <MainLayout>
      <div className="row">
        <div className="col-lg-8">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-md-6 col-lg-4 mb-3">
                  <div
                    className="pos-item px-2 text-center border p-3"
                    onClick={() => addProductToCart(product)}
                  >
                    <h5 className="mb-3">{product.Name}</h5>
                    <p className="mb-0">Barcode: {product.itemNumber}</p>
                    <p className="mb-0">Price: {product.Price}Rs</p>
                    <button className="btn btn-success mt-2">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-4">
          <div className="table-responsive bg-dark">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cartProduct, index) => (
                  <tr key={cartProduct.id}>
                    <td>{index + 1}</td>
                    <td>{cartProduct.Name}</td>
                    <td> {cartProduct.Price}Rs</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => decreaseQuantity(cartProduct)}
                        >
                          -
                        </button>
                        <span className="btn btn-light btn-sm">
                          {cartProduct.quantity}
                        </span>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => increaseQuantity(cartProduct)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{cartProduct.totalAmount}Rs</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeProduct(cartProduct)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 className="px-2 text-white">Total Amount: {totalAmount}Rs</h2>
          </div>

          <div className="mt-3">
            {totalAmount !== 0 ? (
              <div>
                <button className="btn btn-primary mr-2" onClick={handlePrint}>
                  Print Receipt
                </button>
                <button className="btn btn-warning mr-2" onClick={applyDiscount}>
                  5% Discount
                </button>
                <button className="btn btn-danger" onClick={() => setCart([])}>
                  Cancel
                </button>
              </div>
            ) : (
              "Please add a product to the cart"
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <ComponentToPrint
        
          cart={cart}
          totalAmount={totalAmount}
          ref={componentRef}
        />
      </div>
    </MainLayout>
  );
}

export default POSPage;

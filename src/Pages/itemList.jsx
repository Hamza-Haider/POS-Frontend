import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import AddItemForm from '../component/AddItemForm';
import UpdateItemForm from '../component/UpdateForm';
import DeleteItemButton from '../component/DeleteForm';
const ItemPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const token = localStorage.getItem('token');

        const { data } = await axios.get('http://localhost:5055/getAllItem', {
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        setItemsData(data);
        console.log('get data', data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5055/deleteItem/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItemsData(itemsData.filter((item) => item.id !== itemId));
      console.log('Item deleted:', itemId);
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const handleUpdateItem = async (itemId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5055/updateItem/${itemId}`, updatedData, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      setItemsData((prevItemsData) => {
        return prevItemsData.map((item) => {
          if (item.id === itemId) {
            return { ...item, ...updatedData };
          }
          return item;
        });
      });

      console.log('Item updated:', itemId);
      setSelectedItemId(null); // Reset selectedItemId after update
    } catch (error) {
      console.log('Error updating item:', error);
    }
  };

  return (
    <>
      
        <h1 className="font-bold text-3xl text-center ">Item List
        <div style={{float:"Left"}} >
              <Link to="/pos">
                <button className="btn btn-warning">
                  <b>POS</b>{" "}
                </button>
              </Link>{" "}
              
            </div>
        </h1>
        <AddItemForm />
        <div className="container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Barcode Number</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemsData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.itemNumber}</td>
                  <td>{item.Name}</td>
                  <td>{item.Quantity}</td>
                  <td>{item.Price}</td>
                  <td>
                    <button
                      className="btn btn-info mr-2"
                      onClick={() => setSelectedItemId(item.id)}
                    >
                      Update
                    </button>
                    <DeleteItemButton itemId={item.id} handleDelete={handleDeleteItem} />
                    {selectedItemId === item.id && (
                      <UpdateItemForm item={item} handleUpdate={(data) => handleUpdateItem(item.id, data)} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </>
  );
};

export default ItemPage;

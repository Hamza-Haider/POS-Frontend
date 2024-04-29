import React from "react"
import { useNavigate } from "react-router-dom"
const AdminPage = () => {
  const navigate = useNavigate()

  const handleAddUser = () => {
    // Redirect to the registration page
    navigate("/Register")
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl mb-4 font-bold">Admin Dashboard</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddUser}
          >
            ADD NEW USER
          </button>
        </div>
      </div>
    </>
  )
}
export default AdminPage


import { useContext } from "react"
import { Navigate } from "react-router"
import { UserAuthContext } from "../Context/LoginContext"

const PrivateRoutes = (props) => {
    
 const {isLoggedIn}=useContext(UserAuthContext)

  return (
    <>
      {isLoggedIn ? (
        <>{props.children}</>
      ) : (
        <>
          <Navigate to={"/Login"} />
        </>
      )}
    </>
  )
}

export default PrivateRoutes

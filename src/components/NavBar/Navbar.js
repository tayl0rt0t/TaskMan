import { Link } from "react-router-dom"

// import { set } from "mongoose"
import * as userService from '../../utilities/users-service'

export default function 
NavBar({user,setUser}){

    const handleLogout = () => {
        userService.logOut();
        setUser(null);
    }

    return(
        <nav>
            <>Welcome, {user.name}</>
            <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      <Link to='/task'>Tasks</Link>
      <Link to='' onClick={handleLogout}>Log Out</Link>
        </nav>
    )

}
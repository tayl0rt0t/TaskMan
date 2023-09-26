import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NewOrderPage from "./pages/NewOrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AuthPage from "./pages/AuthPage";
import NavBar from "./components/NavBar/Navbar";
import { getUser } from "./utilities/users-service";
import "./App.css";
import TaskItems from "./pages/TaskItems";


function App() {
  const [user, setUser] = useState(getUser());
  console.log(user);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser}/>
          <br/>
          <h1 className="heading">T A S K M A N</h1>
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path='/task' element={<TaskItems/>}/>
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser}/>
      )}
    </main>
  );
}

export default App;
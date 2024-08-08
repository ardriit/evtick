import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import CreateEvent from "./pages/CreateEvent";
import Events from "./pages/Events";
import ViewEvent from "./pages/ViewEvent";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Events/>} />
      <Route path="/createevent" element={<CreateEvent/>} />
      <Route path="/event/:id" element={<ViewEvent/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;

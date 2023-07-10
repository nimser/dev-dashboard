import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import CardList from "./components/CardList";
import UserForm from "./components/UserForm";
import ResourceForm from "./components/ResourceForm";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/create" element={<ResourceForm />} />
          <Route path="/register" element={<UserForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/update/:id" element={<ResourceForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

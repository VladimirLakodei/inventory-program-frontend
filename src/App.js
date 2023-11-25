import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import { Home, AddAct, ActItem, FullAct, Registration, Login } from "./pages";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acts" element={<Home />} />
          <Route path="/acts/:id" element={<FullAct />} />
          <Route path="/acts/:id/edit" element={<AddAct />} />
          <Route path="/acts/:id/item/:itemId" element={<ActItem />} />
          <Route path="/acts/:id/add-item" element={<ActItem />} />
          <Route path="/add-act" element={<AddAct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

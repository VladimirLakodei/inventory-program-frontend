import React from "react";
import { Routes, Route } from "react-router-dom"
import Container from "@mui/material/Container";

import { Header } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, fetchAuthMe } from "./redux/slices/auth";
import { Home, AddAct, FullAct, Registration, Login } from "./pages";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    if (isAuth || window.localStorage.getItem('token')) {
      dispatch(fetchAuthMe());
    }
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acts/:id" element={<FullAct />} />
          <Route path="/add-act" element={<AddAct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

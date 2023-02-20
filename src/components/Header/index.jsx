import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {
    if (window.confirm('Ви точно хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>ARCHAKOV BLOG</div>
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link href="/acts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

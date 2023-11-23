import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    const token = data.payload?.user?.token;

    if (token) {
      window.localStorage.setItem('token', token);
    } else {
      alert('Не вдалось авторизуватись!');
    }
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="E-Mail"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Вкажіть пошту' })}
            // Невірно вказана пошта
            fullWidth
          />
          <TextField
            className={styles.field}
            label="Пароль"
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Вкажіть пароль' })}
            fullWidth />
          <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
            Увійти
          </Button>
      </form>
    </Paper>
  );
};

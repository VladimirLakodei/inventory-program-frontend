import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";

export const Registration = () => {
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
      password: '',
      firstName: '',
      lastName: '',
      middleName: '',
    }
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    const token = data.payload && data.payload.user && data.payload.user.token;

    if (token) {
      window.localStorage.setItem('token', token);
    } else {
      alert('Не вдалось зареєструватись!');
    }
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення облікового запису
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          className={styles.field}
          label="Ім'я"
          type="text"
          error={Boolean(errors.firstName?.message)}
          helperText={errors.firstName?.message}
          {...register('firstName', { required: 'Вкажіть Ім\'я' })} />
        <TextField
          fullWidth
          className={styles.field}
          label="Прізвище"
          type="text"
          error={Boolean(errors.lastName?.message)}
          helperText={errors.lastName?.message}
          {...register('lastName', { required: 'Вкажіть Прізвище' })} />
        <TextField
          fullWidth
          className={styles.field}
          label="По батькові"
          type="text"
          error={Boolean(errors.middleName?.message)}
          helperText={errors.middleName?.message}
          {...register('middleName', { required: 'Вкажіть По батькові' })} />
        <TextField
          fullWidth
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Вкажіть пошту' })} />
        <TextField
          fullWidth
          className={styles.field}
          label="Пароль"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Вкажіть пароль' })} />

        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зареєструватись
        </Button>
      </form>
    </Paper>
  );
};

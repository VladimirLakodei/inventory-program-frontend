import React from "react";
import axios from "../../axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";

import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddAct.module.scss";

export const AddAct = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      title : '',
      number : '',
      location : '',
      materiallyResponsible: '',
    }
  });

  const onChangeDescription = React.useCallback((value) => {
    setDescription(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "200px",
      autofocus: true,
      placeholder: "Опис...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/login" />;
  }

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const { data } = await axios.post('/acts', { description, ...values });
      const id = data._id;
      navigate(`/acts/${id}`);
    } catch (error) {
      setLoading(false);
      alert('Не вдалось створити акт!');
    }
  }

  return (
    <Paper style={{ padding: 30 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          classes={{ root: styles.textField }}
          variant="standard"
          label="Назва"
          margin="normal"
          fullWidth
          type="text"
          error={Boolean(errors.title?.message)}
          helperText={errors.title?.message}
          {...register('title', { required: 'Вкажіть назву' })} />
        <TextField
          classes={{ root: styles.textField }}
          variant="standard"
          label="Номер"
          margin="normal"
          fullWidth
          type="text"
          error={Boolean(errors.number?.message)}
          helperText={errors.number?.message}
          {...register('number', { required: 'Вкажіть номер' })}
        />
        <TextField
          classes={{ root: styles.textField }}
          variant="standard"
          label="Місце розташування"
          margin="normal"
          fullWidth
          type="text"
          error={Boolean(errors.location?.message)}
          helperText={errors.location?.message}
          {...register('location', { required: 'Вкажіть місце розташування' })}
        />
        <TextField
          classes={{ root: styles.textField }}
          variant="standard"
          label="Матеріально відповідальний"
          margin="normal"
          fullWidth
          type="text"
          error={Boolean(errors.materiallyResponsible?.message)}
          helperText={errors.materiallyResponsible?.message}
          {...register('materiallyResponsible', { required: 'Вкажіть місце матеріально відповідального' })}
        />
        <SimpleMDE
          className={styles.editor}
          value={description}
          onChange={onChangeDescription}
          options={options}
        />
        <div className={styles.buttons}>
          <Button disabled={!isValid || isLoading} type="submit" size="large" variant="contained">
            Створити
          </Button>
          <Button size="large">Відміна</Button>
        </div>
      </form>
    </Paper>
  );
};

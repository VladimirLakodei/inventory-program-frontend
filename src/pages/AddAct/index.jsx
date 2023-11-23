import axios from "../../axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAct } from "../../redux/slices/act";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddAct.module.scss";

export const AddAct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isEditing = Boolean(id);
  const { act } = useSelector((state) => state.act);
  const [isLoading, setLoading] = React.useState(false);
  const [actData, setAct] = React.useState({
    title: id ? "-" : "",
    number: id ? "-" : "",
    location: id ? "-" : "",
    materiallyResponsible: id ? "-" : "",
  });
  const [description, setDescription] = React.useState("");

  useEffect(() => {
    setAct({
      title: id ? "-" : "",
      number: id ? "-" : "",
      location: id ? "-" : "",
      materiallyResponsible: id ? "-" : "",
    });
    dispatch(fetchAct(id));
  }, [id]);

  useEffect(() => {
    setAct({ ...act });
    setDescription(act?.description || "");
  }, [act]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    values: actData,
    defaultValues: {
      title: "",
      number: "",
      location: "",
      materiallyResponsible: "",
    },
  });

  const onChangeDescription = React.useCallback((value) => {
    setDescription(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "200px",
      autofocus: false,
      placeholder: "Опис...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const onCancel = async () => {
    navigate(`/`);
  };

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      let _id = id;

      const { data } = isEditing
        ? await axios.patch(`/acts/${id}`, { ...values, description })
        : await axios.post("/acts", { ...values, description });

      _id = isEditing ? _id : data._id;
      navigate(`/acts/${_id}`);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Не вдалось створити акт!");
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/login" />;
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
          {...register("title", { required: "Вкажіть назву" })}
        />
        <TextField
          classes={{ root: styles.textField }}
          variant="standard"
          label="Номер"
          margin="normal"
          fullWidth
          type="text"
          error={Boolean(errors.number?.message)}
          helperText={errors.number?.message}
          {...register("number", { required: "Вкажіть номер" })}
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
          {...register("location", { required: "Вкажіть місце розташування" })}
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
          {...register("materiallyResponsible", {
            required: "Вкажіть місце матеріально відповідального",
          })}
        />
        <SimpleMDE
          className={styles.editor}
          value={description}
          onChange={onChangeDescription}
          options={options}
        />
        <div className={styles.buttons}>
          <Button
            disabled={!isValid || isLoading}
            type="submit"
            size="large"
            variant="contained"
          >
            {isEditing ? "Редагувати" : "Створити"}
          </Button>
          <Button size="large" onClick={onCancel}>
            Відміна
          </Button>
        </div>
      </form>
    </Paper>
  );
};

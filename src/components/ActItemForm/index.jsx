import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./ActItemForm.module.scss";

export const ActItemForm = ({
  formData,
  setFormData,
  onSubmit,
  onDelete,
  onCancel,
  isLoading,
  isEditing,
  isDelete,
}) => {
  const isValid = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      inventoryNumber: "",
      unit: "",
      quantity: "",
      initialValue: "",
      sum: "",
      note: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Назва об'єкта"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Інвентарний (номенклатурний) номер"
        type="text"
        name="inventoryNumber"
        value={formData.inventoryNumber}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Одиниця виміру"
        type="text"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Кількість"
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Первісна (переоцінена) вартість"
        type="number"
        name="initialValue"
        value={formData.initialValue}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Сума"
        type="number"
        name="sum"
        value={formData.sum}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Примітка"
        type="text"
        name="note"
        value={formData.note}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
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
        {isDelete && (
          <Button onClick={onDelete} variant="contained" color="error">
            Видалити
          </Button>
        )}
        <Button size="large" onClick={onCancel}>
          Відміна
        </Button>
      </div>
    </form>
  );
};

import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActItem } from "../../redux/slices/act-item";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import { ActItemForm } from "../../components/ActItemForm";
import Paper from "@mui/material/Paper";

import "easymde/dist/easymde.min.css";

export const ActItem = () => {
  const { itemId: id, id: actId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isEditing = Boolean(id);
  const { actItem } = useSelector((state) => state.actItem);
  const [isLoading, setLoading] = React.useState(false);

  const [formData, setFormData] = useState({
    name: "",
    inventoryNumber: "",
    unit: "",
    quantity: "",
    initialValue: "",
    sum: "",
    note: "",
  });

  useEffect(() => {
    setFormData({
      name: id ? "-" : "",
      inventoryNumber: id ? "-" : "",
      unit: id ? "-" : "",
      quantity: id ? "-" : "",
      initialValue: id ? "-" : "",
      sum: id ? "-" : "",
      note: id ? "-" : "",
    });
    if (id) {
      dispatch(fetchActItem(id));
    }
  }, [id]);

  useEffect(() => {
    setFormData({
      name: actItem && actItem.name ? actItem.name : "",
      inventoryNumber:
        actItem && actItem.inventoryNumber ? actItem.inventoryNumber : "",
      unit: actItem && actItem.unit ? actItem.unit : "",
      quantity: actItem && actItem.quantity ? actItem.quantity : "",
      initialValue: actItem && actItem.initialValue ? actItem.initialValue : "",
      sum: actItem && actItem.sum ? actItem.sum : "",
      note: actItem && actItem.note ? actItem.note : "",
    });
  }, [actItem]);

  const onCancel = async () => {
    navigate(`/acts/${actId}`);
  };

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      let _id = id;

      const { data } = isEditing
        ? await axios.patch(`/acts/${actId}/items/${id}`, values)
        : await axios.post(`/acts/${actId}/items`, values);

      _id = isEditing ? _id : data._id;
      navigate(`/acts/${actId}`);
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Не вдалось створити акт!");
    }
  };

  const onDelete = async (values) => {
    if (window.confirm("Ви точно хочете видалити поле?")) {
      setLoading(true);

      try {
        await axios.delete(`/acts/${actId}/items/${id}`);
        setLoading(false);
        navigate(`/acts/${actId}`);
      } catch (error) {
        setLoading(false);
        console.error(error);
        alert("Не вдалось створити акт!");
      }
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <ActItemForm
        formData={formData}
        setFormData={setFormData}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onDelete={onDelete}
        isLoading={isLoading}
        isEditing={isEditing}
        isDelete={id}
      />
    </Paper>
  );
};

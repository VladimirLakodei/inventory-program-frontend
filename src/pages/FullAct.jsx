import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";

import { Act } from "../components/Act";
import { DataGrid } from "@mui/x-data-grid";

export const FullAct = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [isLoadingRows, setLoadingRows] = React.useState(true);
  const { id } = useParams();

  const columns = [
    { field: "name", headerName: "Назва об'єкта", width: 150 },
    {
      field: "inventoryNumber",
      headerName: "Інвентарний (номенклатурний) номер",
      width: 150,
    },
    { field: "unit", headerName: "Одиниця виміру", width: 80 },
    {
      field: "quantity",
      headerName: "Кількість",
      type: "number",
      width: 80,
    },
    {
      field: "initialValue",
      headerName: "Первісна (переоцінена) вартість",
      description: "This column has a value getter and is not sortable.",
      width: 80,
      // sortable: false,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: "sum",
      headerName: "Сума",
      type: "number",
      width: 80,
    },
    {
      field: "note",
      headerName: "Примітка",
      width: 80,
    },
  ];

  React.useEffect(() => {
    axios
      .get(`/acts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Помилка отримання акту!");
        setData([]);
        setLoading(false);
      });

    axios
      .get(`/acts/${id}/items`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setRows(res.data.map((item) => ({ ...item, id: item._id })));
        }
        setLoadingRows(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Помилка отримання полів акту!");
        setRows([]);
        setLoadingRows(false);
      });
  }, [id]);

  if (isLoading) {
    return <Act isLoading={isLoading} isFullAct />;
  }

  return (
    <>
      <Act
        id={data._id}
        title={data.title}
        description={data.description}
        user={{ fullName: data.materiallyResponsible }}
        createdAt={data.createdAt}
        viewsCount={150}
        commentsCount={3}
        isFullAct
        isEditable
      >
        {isLoadingRows ? (
          "Поля акту завантажуються..."
        ) : (
          <div style={{ display: "flex", height: "658px" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onRowClick={(row) => {
                  navigate(`/acts/${data._id}/item/${row.id}`);
                }}
              />
            </div>
          </div>
        )}
      </Act>
    </>
  );
};

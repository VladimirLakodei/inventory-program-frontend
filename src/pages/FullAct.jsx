import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

import { Act } from "../components/Act";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { DataGrid } from '@mui/x-data-grid';

export const FullAct = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  const columns = [
    { field: 'name', headerName: 'Назва об\'єкта', width: 150 },
    { field: 'inventoryNumber', headerName: 'Інвентарний (номенклатурний) номер', width: 150 },
    { field: 'unit', headerName: 'Одиниця виміру', width: 80 },
    {
      field: 'quantity',
      headerName: 'Кількість',
      type: 'number',
      width: 80,
    },
    {
      field: 'initialValue',
      headerName: 'Первісна (переоцінена) вартість',
      description: 'This column has a value getter and is not sortable.',
      width: 80,
      // sortable: false,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'sum',
      headerName: 'Сума',
      type: 'number',
      width: 80,
    },
    {
      field: 'note',
      headerName: 'Примітка',
      width: 80,
    },
  ];

  // Первісна (переоцінена) вартість
  // Сума
  // Примітка
  // 2747.94
  const rows = [
    { id: 1, name: 'Системний блок', inventoryNumber: '1111.71199', unit: 'шт', quantity: 5, initialValue: 2747.94, sum: 2747.94 },
    { id: 2, name: 'Системний блок', inventoryNumber: '1112.71199', unit: 'шт', quantity: 9, initialValue: 2747.94, sum: 2747.94 },
    { id: 3, name: 'Системний блок', inventoryNumber: '1113.71199', unit: 'шт', quantity: 2, initialValue: 2747.94, sum: 2747.94 },
    { id: 4, name: 'Системний блок', inventoryNumber: '1114.71199', unit: 'шт', quantity: 7, initialValue: 2747.94, sum: 2747.94 },
    { id: 5, name: 'Системний блок', inventoryNumber: '1115.71199', unit: 'шт', quantity: 1, initialValue: 2747.94, sum: 2747.94 },
    { id: 6, name: 'Системний блок', inventoryNumber: '1116.71199', unit: 'шт', quantity: 5, initialValue: 2747.94, sum: 2747.94 },
    { id: 7, name: 'Системний блок', inventoryNumber: '1117.71199', unit: 'шт', quantity: 6, initialValue: 2747.94, sum: 2747.94 },
    { id: 8, name: 'Системний блок', inventoryNumber: '1118.71199', unit: 'шт', quantity: 3, initialValue: 2747.94, sum: 2747.94 },
    { id: 9, name: 'Системний блок', inventoryNumber: '1119.71199', unit: 'шт', quantity: 1, initialValue: 2747.94, sum: 2747.94 },
  ];

  React.useEffect(() => {
    axios
      .get(`/acts/${id}`)
      .then((res) => {
        console.log('res', res)
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert('Помилка отримання акту!');
        setData([]);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Act isLoading={isLoading} isFullAct />
  }
 
  return (
    <>
      <Act
        id={data._id}
        title={data.description}
        user={{ fullName: data.materiallyResponsible }}
        createdAt={data.createdAt}
        viewsCount={150}
        commentsCount={3}
        isFullAct
      >
        <div style={{ display: 'flex', height: '658px' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </div>
        </div>
      </Act>
      {/* <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock> */}
    </>
  );
};

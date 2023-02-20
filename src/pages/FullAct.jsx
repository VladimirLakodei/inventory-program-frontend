import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

import { Act } from "../components/Act";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullAct = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

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
        <div>
          act table
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

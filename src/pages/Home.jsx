import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchActs } from "../redux/slices/acts";
import { selectIsAuth } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
 
import { Act } from "../components/Act";
// import { TagsBlock } from "../components/TagsBlock";
// import { CommentsBlock } from "../components/CommentsBlock";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { acts } = useSelector(state => state.acts);

  const isAuth = useSelector(selectIsAuth);
  const isActsLoading = acts.status === 'loading';

  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchActs());
    } else {
      navigate('/login');
    }
  }, [isAuth, dispatch, navigate]);

  return (
    <>
      {/* <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs> */}
      <Grid container spacing={4}>
        {/* Filters and Sort */}
        {/* <Grid xs={4} item>
          <TagsBlock
            items={["react", "typescript", "заметки"]}
            isLoading={false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
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
          />
        </Grid> */}
        <Grid xs={8} item>
          {(isActsLoading ? [...Array(5)] : acts.list).map((element, index) => (
            isActsLoading ?
            <Act
            id={index}
            key={index} />
            :
            <Act
              id={element._id}
              key={element._id}
              title={element.title}
              number={element.number}
              description={element.description}
              user={{ fullName: element.materiallyResponsible }}
              createdAt={element.createdAt}
              viewsCount={150}
              commentsCount={3}
              isEditable
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

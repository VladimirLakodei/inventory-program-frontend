import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchActs } from "../redux/slices/acts";
import { selectIsAuth } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { ActSearchForm } from "../components/ActSearchForm";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { Act } from "../components/Act";
export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { acts } = useSelector((state) => state.acts);
  const [isFilter, setIsFilter] = React.useState(false);

  const isAuth = useSelector(selectIsAuth);
  const isActsLoading = acts.status === "loading";

  const handleSearch = (searchTerm, searchProperty) => {
    setIsFilter(true);
    dispatch(fetchActs({ item: { searchTerm, searchProperty } }));
  };

  const handleFilterClear = () => {
    setIsFilter(false);
    dispatch(fetchActs());
  };

  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchActs());
    } else {
      navigate("/login");
    }
  }, [isAuth, dispatch, navigate]);

  return (
    <div>
      {isFilter && (
        <Button onClick={handleFilterClear}>Очистити фільтри</Button>
      )}
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isActsLoading ? [...Array(5)] : acts.list).map((element, index) =>
            isActsLoading ? (
              <Act id={index} key={index} />
            ) : (
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
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <ActSearchForm onSearch={handleSearch} />
        </Grid>
      </Grid>
    </div>
  );
};

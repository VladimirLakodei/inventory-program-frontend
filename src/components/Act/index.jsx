import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRemoveAct } from "../../redux/slices/acts";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
// import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import styles from "./Act.module.scss";
import { UserInfo } from "../UserInfo";
import { ActSkeleton } from "./Skeleton";

export const Act = ({
  id,
  title,
  createdAt,
  description,
  user,
  children,
  isFullAct,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    if (window.confirm('Ви точно хочете видалити акт?')) {
      dispatch(fetchRemoveAct(id));
    }
  }

  if (isLoading) {
    return <ActSkeleton />;
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullAct })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => {onClickRemove()}}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {/* <img
        className={clsx(styles.image, { [styles.imageFull]: isFullAct })}
        src={imageUrl}
        alt={title}
      /> */}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullAct })}
          >
            {isFullAct ? title : <Link to={`/acts/${id}`}>{title}</Link>}
          </h2>
          <p>{description}</p>
          {/* <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul> */}
          {children && <div className={styles.content}>{children}</div>}
          {/* <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

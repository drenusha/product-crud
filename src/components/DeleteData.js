import React from "react";
import Button from "@mui/material/Button";
import AuthUser from './AuthUser';

const DeleteData = (props) => {
  const { http } = AuthUser();
  const removeRow = () => {

    http
      .delete(`/products/${props.id}`)
      .then((response) => {
        props.onDelete();
      })
      .catch((err) => { });
  };

  return (
    <Button onClick={removeRow}>Delete</Button>
  );
};
export default DeleteData;

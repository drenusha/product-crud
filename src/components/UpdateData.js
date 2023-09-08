import React, { useState } from "react";
import Button from "@mui/material/Button";
import "antd/dist/reset.css";
import "./UpdateData.css";
import TextField from '@mui/material/TextField';
import { Modal } from "antd";
import AuthUser from './AuthUser';


const UpdateData = (props) => {
  const [visible, setVisible] = useState(false);

  const [product_name, setProductName] = useState();
  const [product_price, setProductPrice] = useState();
  const [errors, setErrors] = useState({
    product_name: "",
    product_price: "",
  });
  const { http } = AuthUser();

  const productsData = props.values;

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setErrors({
      product_name: "",
      product_price: "",
    });
  };

  const validateFields = () => {
    const validationErrors = {};

    if (!product_name) {
      validationErrors.product_name = "Product name is required.";
    }

    if (!product_price || isNaN(product_price)) {
      validationErrors.product_price = "Please provide a valid product price.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const UpdateCostumerById = async (e) => {

    if (!validateFields()) {
      return;
    }

    try {
      const ProdData = { product_name, product_price };

      await http
        .put(`/products/${productsData.id}`, ProdData)
        .then((response) => props.onUpdate());
      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={showModal}>
        Edit
      </Button>

      <Modal
        open={visible}
        onOk={UpdateCostumerById}
        onCancel={hideModal}
        okText="Update"
        cancelText="Cancel"
        okButtonProps={props.id}
      >
        <form>
          <div className="edit_form">
            <TextField
              id="productName outlined-helperText"
              size="small"
              label="Product name"
              variant="outlined"
              defaultValue={productsData.product_name}
              onChange={(e) => setProductName(e.target.value)}
              error={!!errors.product_name}
              helperText={errors.product_name}
            />
            <TextField
              id="productPrice outlined-helperText"
              size="small"
              label="Product price"
              type="number"
              variant="outlined"
              defaultValue={productsData.product_price}
              onChange={(e) => setProductPrice(e.target.value)}
              error={!!errors.product_price}
              helperText={errors.product_price}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
export default UpdateData;

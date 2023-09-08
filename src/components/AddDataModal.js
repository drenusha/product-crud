import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./AddData.css";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AuthUser from './AuthUser';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  border: '1px solid #1677ff',
  boxShadow: 24,
  borderRadius: 1,
  p: 5,
  paddingTop: 9,
};

const AddDataModal = (props) => {
  const [product_name, setProductName] = useState();
  const [product_price, setProductPrice] = useState();
  const [open, setOpen] = useState(false);
  const { http } = AuthUser();
  const [errors, setErrors] = useState({
    product_name: "",
    product_price: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({
      product_name: "",
      product_price: "",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!product_name) {
      validationErrors.product_name = "Product name is required.";
    }

    if (!product_price || isNaN(product_price)) {
      validationErrors.product_price = "Please provide a valid product price.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const AddProduct = { product_name, product_price };
      const AddProductRes = await http.post(`/products`, AddProduct);
      props.onAdd();
      setProductName("");
      setProductPrice("");
      handleClose()

    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div>
      <Button onClick={handleOpen}>Add Product</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form>
              <div className="add_form">
                <TextField
                  id="outlined-helperText"
                  size="small"
                  label="Product name"
                  variant="outlined"
                  value={product_name}
                  onChange={(e) => setProductName(e.target.value)}
                  error={!!errors.product_name}
                  helperText={errors.product_name}

                />
                <TextField
                  id="outlined-helperText"
                  size="small"
                  label="Product price"
                  variant="outlined"
                  type="number"
                  value={product_price}
                  onChange={(e) => setProductPrice(e.target.value)}
                  error={!!errors.product_price}
                  helperText={errors.product_price}
                />
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={onSubmit}
                >
                  Add
                </Button>

              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default AddDataModal;

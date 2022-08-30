import React from "react";
import { DialogContent, Dialog, DialogTitle, Typography } from "@mui/material";

const ProductDetail = (props) => {
  const { open, handleClose, productDetail } = props;
  return (
    <div>
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>
          <Typography variant="h2">{productDetail.name}</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">{productDetail.description}</Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;

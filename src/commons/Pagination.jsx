import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { handleProducts } from "../store/reducers/productsReducer";
import { useDispatch, useSelector } from "react-redux";

export default function PaginationControlled() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    console.log("event!: ", event)
    console.log("value!: ", value)
    setPage(value);
    dispatch(handleProducts(page));
  };
  const { allProducts } = useSelector((state) => state.allProducts);
  let pageCount = [];
  if (allProducts.length !== 0) {
    pageCount = Math.ceil(allProducts.length / 5);
  }
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ bgcolor: "#00897b" }}
      />
    </Stack>
  );
}

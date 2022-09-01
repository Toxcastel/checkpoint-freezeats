import { React, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { searchProducts } from "../store/reducers/productsReducer";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");

  const handleName = (e) => {
    setProductName(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProducts(productName));
    setProductName("");
  };

  return (
    <Search onSubmit={handleSearch}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={handleName}
        value={productName}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchBar;

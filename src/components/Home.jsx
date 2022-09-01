import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { handleProducts} from "../store/reducers/productsReducer";
import * as React from "react";
import Cards from "../commons/Card"
import Header from "../commons/Header";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleProducts());
  }, [dispatch]);

  return (
 <>
 <Header />
 <Cards />
 </>
  );
};

export default Home;

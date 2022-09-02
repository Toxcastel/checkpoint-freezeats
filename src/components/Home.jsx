import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { handleProducts } from "../store/reducers/productsReducer";
import { handleAllProducts } from "../store/reducers/allProductsReducer";
import * as React from "react";
import Cards from "../commons/Card"
import Header from "../commons/Header";
import Pagination from "../commons/Pagination";


const Home = () => {
  const dispatch = useDispatch();
  //const cart = useSelector(state=>state.cart)


  useEffect(() => {
    dispatch(handleProducts());
    console.log('aca');
    dispatch(handleAllProducts());
  }, []);



  return (
 <>
 <hr></hr>
 <Header />
 <hr></hr>
 <Cards />
 <Pagination />
 
 </>
  );
};

export default Home;

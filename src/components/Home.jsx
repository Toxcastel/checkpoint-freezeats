import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { handleProducts } from "../store/reducers/productsReducer";
import { handleAllProducts } from "../store/reducers/allProductsReducer";
import * as React from "react";
import Cards from "../commons/Card"
import Header from "../commons/Header";
import { fetchCart } from "../store/reducers/cartReducer";


const Home = () => {
  const dispatch = useDispatch();
  //const cart = useSelector(state=>state.cart)
 
  
  useEffect(() => {
    dispatch(handleProducts());
    dispatch(handleAllProducts());
  }, [dispatch]);



  return (
 <>
 <Header />
 <hr></hr>
 <Cards />
 
 </>
  );
};

export default Home;

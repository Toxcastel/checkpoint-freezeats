import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [product, setProduct] = useState("");

  useEffect(() => {
    axios.get('api/:category').then((data) => setProduct(data.data));
  }, []);

  return (
    <div className="display">
      <div>
        <figure>
          <img
            src={'https://static.wixstatic.com/media/223d16_22931a02a8b24a3caebd5edfb8d47526~mv2.jpg/v1/fill/w_1434,h_1076,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/223d16_22931a02a8b24a3caebd5edfb8d47526~mv2.jpg'}
            alt="post"
            height={345}
            width={270}
            className="search"
          />
        </figure>
      </div>
      <div>
        <div>
          <div>
            <h3 >Nombre:</h3>
            <p>{product.name}</p>
          </div>
        </div>

        <div>
          <h4 >Descripcion:</h4>
          <p>{product.description}</p>
        </div>
      </div>
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
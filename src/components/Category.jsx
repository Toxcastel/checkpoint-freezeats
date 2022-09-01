import { Link } from "react-router-dom";
import CategoryContainer from "./CategoryContainer";


const Category = () => {
  

  return (
      <div>
      <CategoryContainer />
      <Link to="/">
        <button type="button" class="btn btn-info">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Category;

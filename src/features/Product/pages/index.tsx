
import {Link} from "react-router-dom";

const ProductsPage = () => {
    return (
        <div className={`flex justify-between items-center h-full w-full text-center`}>
            <Link to={'new'}>Create Taxes</Link>


        </div>
    );
};

export default ProductsPage;
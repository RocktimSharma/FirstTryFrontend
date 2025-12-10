import {Heart} from "lucide-react";
import {Link} from "react-router-dom";

const ProductsPage = () => {
    return (
        <div className={`flex justify-between items-center h-full w-full text-center`}>

            <div className={`flex flex-col w-full justify-center items-center`}>
                <Heart  className={`animate-bounce`} size={256} fill="#ff0000" color="#ff0000" strokeWidth={1} />
                <h1 className={`text-pink-500`}> I LOVE YOU </h1>
                <h2> BHABONA </h2>
                <Link to={'new'}>Add New Product</Link>
            </div>

        </div>
    );
};

export default ProductsPage;
import {Heart} from "lucide-react";

const ProductPage = () => {
    return (
        <div className={`flex justify-between items-center h-full w-full text-center`}>

            <div className={`flex flex-col w-full justify-center items-center`}>
                <Heart  className={`animate-bounce`} size={256} fill="#ff0000" color="#ff0000" strokeWidth={1} />
                <h1 className={`text-pink-500`}> I LOVE YOU </h1>
                <h2> BHABONA </h2>

            </div>

        </div>
    );
};

export default ProductPage;
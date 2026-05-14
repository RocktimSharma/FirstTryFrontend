
import {Link} from "react-router-dom";

const TaxesPage = () => {
    return (
        <div className={`flex justify-between items-center h-full w-full text-center`}>
            <Link to={'new'}>Create Taxes</Link>


        </div>
    );
};

export default TaxesPage;
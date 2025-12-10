
import {PageSubHeader} from "@components/common/PageSubHeader.tsx";
import ProductCreateFrom from "@features/Product/forms/create.tsx";


const ProductCreatePage = () => {
    return (
        <div>
            <PageSubHeader
                title="Add New Product"
                subTitle="Back to product list"
                primaryButton={{
                    label: "Save Changes",
                    onClick: () => console.log("Saved!"),
                    variant: "default",
                }}
                secondaryButton={{
                    label: "Save as Draft",
                    onClick: () => console.log("Draft saved!"),
                    variant: "outline",
                }}

            />
            <ProductCreateFrom/>
        </div>
    );
};

export default ProductCreatePage;
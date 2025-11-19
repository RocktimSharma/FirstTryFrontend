
import {PageSubHeader} from "@components/common/PageSubHeader.tsx";
import {Button} from "@components/ui/button.tsx";

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
        </div>
    );
};

export default ProductCreatePage;
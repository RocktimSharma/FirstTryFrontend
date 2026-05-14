import {PageSubHeader} from "@components/common/PageSubHeader.tsx";
import CreateTaxForm from "@features/fms/taxes/forms/create.tsx";

const TaxCreatePage = () => {
    return (
        <div>
            <PageSubHeader
                title="Create New Tax"
                subTitle="Back to tax list"
                primaryButton={{
                    label: "Save Tax",
                    onClick: () => console.log("Tax saved!"),
                    variant: "default",
                }}
                secondaryButton={{
                    label: "Save as Draft",
                    onClick: () => console.log("Draft saved!"),
                    variant: "outline",
                }}
            />
            <CreateTaxForm/>
        </div>
    );
};

export default TaxCreatePage;
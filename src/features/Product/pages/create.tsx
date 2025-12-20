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
            {/*<div className="sticky bottom-0 w-full bg-background border-t gap-2 py-3 flex justify-between items-center z-50">*/}
            {/*    <Button*/}
            {/*        className="bg-muted font-md border-none text-xs rounded-sm text-foreground font-normal shadow-none hover:bg-primary/5 hover:text-foreground"*/}
            {/*        variant="destructive"*/}
            {/*    >*/}
            {/*        Discard Changes*/}
            {/*    </Button>*/}
            {/*    <div className={'space-x-2'}>*/}
            {/*        <Button*/}
            {/*            className="bg-muted font-md border-none text-xs rounded-sm text-foreground font-normal shadow-none hover:bg-primary/5 hover:text-foreground"*/}
            {/*            variant="outline"*/}
            {/*        >*/}
            {/*            Save as Draft*/}
            {/*        </Button>*/}

            {/*        <Button*/}
            {/*            className="rounded-sm shadow-none text-xs"*/}
            {/*            variant="default"*/}
            {/*        >*/}
            {/*            Save Changes*/}
            {/*        </Button>*/}
            {/*    </div>*/}

            {/*</div>*/}
        </div>
    );
};

export default ProductCreatePage;
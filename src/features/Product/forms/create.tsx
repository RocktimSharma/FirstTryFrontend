import {ExtendedCard} from "@components/extensions/card.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {CardContent} from "@components/ui/card.tsx";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedTextarea} from "@components/extensions/textarea.tsx";

import {Select, SelectContent, SelectValue,} from "@components/ui/select"
import {ExtendedSelectItem, ExtendedSelectTrigger} from "@components/extensions/select.tsx";
import ImageDropzone from "@features/Product/forms/ImageDropzone.tsx";

//https://github.com/kushagrasarathe/image-upload-shadcn/blob/main/src/components/image-upload.tsx

const ProductCreateFrom = () => {

    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 space-4 gap-4'}>
            <div className={`space-y-4`}>

                <div>
                    <p className={'mb-1 font-medium'}>Description</p>
                    <ExtendedCard>
                        <CardContent className={'space-y-3'}>
                            <FormField label="Product Name" required>
                                <ExtendedInput placeholder="Enter Product name"/>
                            </FormField>
                            <FormField label="Product Description">
                                <ExtendedTextarea placeholder="Enter Product name"/>
                            </FormField>
                        </CardContent>

                    </ExtendedCard>
                </div>
                <div>
                    <p className={'mb-1 font-medium'}>Brand & Category</p>
                    <ExtendedCard>
                        <CardContent className={'space-y-3'}>
                            <FormField label="Brand" required>
                                <Select>
                                    <ExtendedSelectTrigger>
                                        <SelectValue placeholder="Select product brand"/>
                                    </ExtendedSelectTrigger>
                                    <SelectContent>

                                        <ExtendedSelectItem value="havels">Havels</ExtendedSelectItem>
                                        <ExtendedSelectItem value="syska">Syska</ExtendedSelectItem>
                                        <ExtendedSelectItem value="blueberry">Blueberry</ExtendedSelectItem>
                                        <ExtendedSelectItem value="apple">Apple</ExtendedSelectItem>
                                        <ExtendedSelectItem value="Samsung">Samsung</ExtendedSelectItem>

                                    </SelectContent>
                                </Select>
                            </FormField>
                            <FormField label="Category">
                                <Select>
                                    <ExtendedSelectTrigger>
                                        <SelectValue placeholder="Select product category"/>
                                    </ExtendedSelectTrigger>
                                    <SelectContent>

                                        <ExtendedSelectItem value="Bulb">Bulb</ExtendedSelectItem>
                                        <ExtendedSelectItem value="Fan">Fan</ExtendedSelectItem>

                                    </SelectContent>
                                </Select>
                            </FormField>
                        </CardContent>

                    </ExtendedCard>
                </div>

            </div>
            <div>
                <p className={'mb-1 font-medium'}>Product Images</p>
                <ExtendedCard>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                        {/* Box 1 */}
                        <div className="aspect-square w-full">
                            <ImageDropzone />
                        </div>

                        {/* Box 2 */}
                        <div className="aspect-square w-full">
                            <ImageDropzone />
                        </div>

                        {/* Wrapper: becomes `contents` on mobile (so children become direct grid items),
      and becomes a 2-row grid at sm+ (so children stack and take the 3rd column). */}
                        <div className="contents sm:grid sm:grid-rows-2 sm:gap-3 sm:aspect-square">
                            {/* These are treated as independent grid items on mobile */}
                            <div className="aspect-square w-full h-full">
                                <ImageDropzone />
                            </div>

                            <div className="aspect-square w-full h-full">
                                <ImageDropzone />
                            </div>
                        </div>

                    </CardContent>


                </ExtendedCard>
            </div>
        </div>
    );
};

export default ProductCreateFrom;


import {ExtendedCard} from "@components/extensions/card.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {CardContent} from "@components/ui/card.tsx";
import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedTextarea} from "@components/extensions/textarea.tsx";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectValue,
} from "@components/ui/select"
import {ExtendedSelectTrigger,ExtendedSelectItem} from "@components/extensions/select.tsx";
import {IoCloudUploadOutline} from "react-icons/io5";
import {Input} from "@components/ui/input.tsx";
//https://github.com/kushagrasarathe/image-upload-shadcn/blob/main/src/components/image-upload.tsx
const ProductCreateFrom = () => {

    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 space-4'}>
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
                    <CardContent className={'space-y-3'}>
                        <div>
                            <div className="text-center">
                                <div className="border p-2 rounded-md max-w-min mx-auto">
                                    <IoCloudUploadOutline size="1.6em" />
                                </div>

                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Drag an image</span>
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-400">
                                    Select a image or drag here to upload directly
                                </p>
                            </div>
                            <Input

                                id="dropzone-file"
                                accept="image/png, image/jpeg"
                                type="file"
                                className="hidden"
                                // disabled={loading || uploadedImagePath !== null}
                                // onChange={handleImageChange}
                            />
                        </div>

                    </CardContent>
                </ExtendedCard>
            </div>
        </div>
    );
};

export default ProductCreateFrom;


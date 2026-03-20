import {CardContent, CardHeader, Card} from "@components/extensions/card.tsx";
import {ExtendedInput} from "@components/extensions/input.tsx";

import {FormField} from "@components/forms/FormField.tsx";
import {ExtendedTextarea} from "@components/extensions/textarea.tsx";
import {CircleQuestionMark, Plus, Trash, X} from 'lucide-react';
import {Select, SelectContent, SelectValue,} from "@components/ui/select"
import {ExtendedSelectItem, ExtendedSelectTrigger} from "@components/extensions/select.tsx";
import ImageDropzone from "@features/Product/forms/ImageDropzone.tsx";
import {Button} from "@components/ui/button.tsx";
import {Label} from "@components/ui/label.tsx";
import ChipInput from "@components/forms/ChipInput.tsx";
//https://github.com/kushagrasarathe/image-upload-shadcn/blob/main/src/components/image-upload.tsx

const ProductCreateFrom = () => {

    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 space-4 gap-4'}>
            <div className={`space-y-4`}>

                <div>
                    <p className={'mb-1 font-medium'}>Description</p>
                    <Card>
                        <CardContent className={'space-y-3'}>
                            <FormField label="Product Name" required>
                                <ExtendedInput placeholder="Enter Product name"/>
                            </FormField>
                            <FormField label="Product Description">
                                <ExtendedTextarea placeholder="Enter Product name"/>
                            </FormField>
                        </CardContent>

                    </Card>
                </div>
                <div>
                    <p className={'mb-1 font-medium'}>Brand & Category</p>
                    <Card>
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

                    </Card>
                </div>
                {/*Product Variant*/}
                <div>
                    <p className={'mb-1 font-medium'}>Variant</p>
                    <Card>
                        <CardHeader className={'flex items-center justify-between'}>
                            <p className={'font-medium'}>Product Variants</p>
                            <Button
                                className={'text-accent hover:text-accent hover:bg-transparent hover:underline font-medium'}
                                size={"sm"} variant={'ghost'}><Plus/> Add Variant</Button>
                        </CardHeader>
                        <CardContent className={'space-y-3'}>
                            <div className={'space-y-3'}>
                                <div className="flex items-center gap-2">
                                    {/* Chip */}
                                    <div
                                        className="flex flex-1 justify-between items-center gap-2 h-9 px-3 py-1 rounded-sm border ">
                                        <Label>Size</Label>
                                        <div className={'text-xs space-x-2'}>
                                        <span
                                            className="inline-flex items-center justify-center rounded-full h-7 bg-muted text-foreground py-1 px-3">M</span>
                                            <span
                                                className="inline-flex items-center justify-center rounded-full h-7 bg-muted text-foreground py-1 px-3">L</span>
                                            <span
                                                className="inline-flex items-center justify-center rounded-full h-7 bg-muted text-foreground py-1 px-3">XL</span>
                                            <span
                                                className="inline-flex items-center justify-center rounded-full h-7 bg-muted text-foreground py-1 px-3">XXL</span>
                                        </div>

                                    </div>-a
                                    {/* Delete button */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shadow-none text-destructive hover:text-destructive bg-transparent hover:bg-transparent hover:border-destructive"

                                    >
                                        <Trash className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <ChipInput/>
                                <div className="flex items-center gap-2">
                                    {/* Chip */}
                                    <div
                                        className="flex flex-1 justify-between items-center gap-2 h-9 px-3 py-1 rounded-sm border ">
                                        <Label>Color</Label>
                                        <div className={'text-xs space-x-2'}>
                                        <span
                                            className="inline-flex items-center justify-center rounded-full h-7 bg-muted text-foreground py-1 px-3">Red</span>
                                            <span
                                                className="inline-flex items-center justify-center rounded-full h-7 bg-muted text-foreground py-1 px-3">Blue</span>
                                            <span
                                                className="inline-flex items-center justify-center rounded-full h-7 bg-muted text-foreground py-1 px-3">Black</span>
                                            <span
                                                className="inline-flex items-center justify-center rounded-full h-7 bg-muted text-foreground py-1 px-3">Green</span>
                                        </div>

                                    </div>

                                    {/* Delete button */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shadow-none text-destructive hover:text-destructive bg-transparent hover:bg-transparent hover:border-destructive"

                                    >
                                        <Trash className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                <tr className="border-b text-muted-foreground">
                                    <th className="text-left font-light text-xs px-3 py-2">Variants</th>
                                    <th className="text-left font-light text-xs px-3 py-2">SKU</th>
                                    <th className="text-left font-light text-xs px-3 py-2">Barcode</th>
                                    <th className="w-10"></th>
                                </tr>
                                </thead>

                                <tbody>
                                {["M / Red", "L / Black", "XL / Green"].map((variant) => (
                                    <tr key={variant} className="border-b text-xs last:border-b-0">
                                        <td className="px-3 py-2">{variant}</td>
                                        <td className="px-3 py-2">SKU-{variant}</td>
                                        <td className="px-3 py-2">123456789</td>
                                        <td className="px-2 py-2 text-right">
                                            <button
                                                className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-muted">
                                                <X className="h-4 w-4"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </CardContent>

                    </Card>
                </div>


            </div>
            <div className={`space-y-4`}>
                {/*Product Images*/}
                <div>
                    <p className={'mb-1 font-medium'}>Product Images</p>
                    <Card>
                        <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                            {/* Box 1 */}
                            <div className="aspect-square w-full">
                                <ImageDropzone/>
                            </div>

                            {/* Box 2 */}
                            <div className="aspect-square w-full">
                                <ImageDropzone/>
                            </div>

                            {/* Wrapper: becomes `contents` on mobile (so children become direct grid items),
      and becomes a 2-row grid at sm+ (so children stack and take the 3rd column). */}
                            <div className="contents sm:grid sm:grid-rows-2 sm:gap-3 sm:aspect-square">
                                {/* These are treated as independent grid items on mobile */}
                                <div className="aspect-square w-full h-full">
                                    <ImageDropzone/>
                                </div>

                                <div className="aspect-square w-full h-full">
                                    <ImageDropzone/>
                                </div>
                            </div>

                        </CardContent>


                    </Card>
                </div>
                {/* Product Taxes */}
                <div>
                    <p className={'mb-1 font-medium'}>Additional Taxes</p>
                    <Card>
                        <CardHeader className={'flex items-center justify-between'}>
                            <p className={'font-medium'}>Product Taxes</p>
                            <Button
                                className={'text-accent hover:text-accent hover:bg-transparent hover:underline font-medium'}
                                size={"sm"} variant={'ghost'}><Plus/> Add Tax</Button>
                        </CardHeader>
                        <CardContent className={'space-y-2'}>
                            <div className={'flex gap-2 w-full'}>
                                <ExtendedInput className={'flex-1'} placeholder={'Product Tax'}></ExtendedInput>

                                <Button variant={'ghost'} size={'icon'}
                                        className={'shrink-0 text-primary hover:text-destructive bg-transparent hover:bg-transparent '}><X/></Button>
                            </div>
                            <div className={'flex gap-2 w-full'}>
                                <ExtendedInput className={'flex-1'} placeholder={'Product Tax'}></ExtendedInput>

                                <Button variant={'ghost'} size={'icon'}
                                        className={'shrink-0 text-primary hover:text-destructive bg-transparent hover:bg-transparent '}><X/></Button>
                            </div>
                            <div className={'flex gap-2 w-full'}>
                                <ExtendedInput className={'flex-1'} placeholder={'Product Tax'}></ExtendedInput>

                                <Button variant={'ghost'} size={'icon'}
                                        className={'shrink-0 text-primary hover:text-destructive bg-transparent hover:bg-transparent '}><X/></Button>
                            </div>
                        </CardContent>


                    </Card>
                </div>


                {/*Additional Information*/}
                <div>
                    <div className={'flex gap-2 items-center mb-1'}>
                        <p className={'font-medium mb-0'}>Additional Information </p>
                        <span className={'text-muted-foreground'}>    <CircleQuestionMark strokeWidth={1.5} size={18}/></span>
                    </div>

                    <Card>
                        <CardHeader className={'flex items-center justify-between'}>
                            <p className={'font-medium'}>Add More Information</p>
                            <Button
                                className={'text-accent hover:text-accent hover:bg-transparent hover:underline font-medium'}
                                size={"sm"} variant={'ghost'}><Plus/> Add Info</Button>
                        </CardHeader>
                        <CardContent className={'space-y-2'}>
                            <div className={'flex gap-2 w-full'}>
                                <ExtendedInput className={'flex-1'} placeholder={'key'}></ExtendedInput>
                                <ExtendedInput className={'flex-1'} placeholder={'value'}></ExtendedInput>
                                <Button variant={'ghost'} size={'icon'}
                                        className={'shrink-0 text-primary hover:text-destructive bg-transparent hover:bg-transparent '}><X/></Button>
                            </div>
                            <div className={'flex gap-2 w-full'}>
                                <ExtendedInput className={'flex-1'} placeholder={'key'}></ExtendedInput>
                                <ExtendedInput className={'flex-1'} placeholder={'value'}></ExtendedInput>
                                <Button variant={'ghost'} size={'icon'}
                                        className={'shrink-0 text-primary hover:text-destructive bg-transparent hover:bg-transparent '}><X/></Button>
                            </div>
                            <div className={'flex gap-2 w-full'}>
                                <ExtendedInput className={'flex-1'} placeholder={'key'}></ExtendedInput>
                                <ExtendedInput className={'flex-1'} placeholder={'value'}></ExtendedInput>
                                <Button variant={'ghost'} size={'icon'}
                                        className={'shrink-0 text-primary hover:text-destructive bg-transparent hover:bg-transparent '}><X/></Button>
                            </div>
                        </CardContent>


                    </Card>
                </div>
            </div>

        </div>
    );
};

export default ProductCreateFrom;


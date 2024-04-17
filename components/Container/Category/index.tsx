"use client";
import ItemBox from "@/components/Box/Item";
import { useState, useEffect } from "react";
import * as categoriesAPI from "@/libs/features/apiSlices/categories";
import {product} from "@prisma/client";
interface CategoryContainerProps {
    category_id: string;
}

interface FilterProps {
    name: string;
    value: string[];
}
export default function CategoryContainer({ category_id }: CategoryContainerProps){

    const { data: category } = categoriesAPI.useGetCategoryQuery(category_id);
    const { data: products } = categoriesAPI.useGetProductsQuery(category_id);
    const [activeModal, setActiveModal] = useState<string>("");
    const [filters, setFilters] = useState<FilterProps[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<FilterProps[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<product[]>([]);

    useEffect(() => {
        if (products) {
            products.forEach(product => {
                product.properties?.forEach(property => {
                    let filter = filters.find(filter => filter.name === property.name);
                    if (filter) {
                        if (!filter.value.includes(property.value))
                            filter.value.push(property.value);
                    } else 
                        filters.push({ name: property.name, value: [property.value] });
                });
            });
            setFilters([...filters]);
        }
    }, [filters, products]);

    useEffect(() => {
        if (selectedFilters.length > 0) {
            let filteredProducts = products?.filter(product => {
                let result = true;
                selectedFilters.forEach(filter => {
                    let property = product.properties?.find(property => property.name === filter.name);
                    if (property && !filter.value.includes(property.value))
                        result = false;
                });
                return result;
            });
            setSelectedProducts(filteredProducts || []);
        } else {
            setSelectedProducts(products || []);
        }
    }, [selectedFilters, products]);

    const handleCheckbox = (filter: FilterProps, value: string) => {
        let index = selectedFilters.findIndex(selectedFilter => selectedFilter.name === filter.name);
        if (index === -1) {
            setSelectedFilters([...selectedFilters, { name: filter.name, value: [value] }]);
        } else {
            let newSelectedFilters = [...selectedFilters];
            let valueIndex = newSelectedFilters[index].value.indexOf(value);
            if (valueIndex === -1) {
                newSelectedFilters[index].value.push(value);
            } else {
                newSelectedFilters[index].value.splice(valueIndex, 1);
                if (newSelectedFilters[index].value.length === 0)
                    newSelectedFilters.splice(index, 1);
            }
            setSelectedFilters(newSelectedFilters);
        }
    }

    return (
        <div className="mt-8 w-full max-w-[75%] mx-auto">
            <div className="rounded-md h-[300px] w-full bg-green-100">

            </div>


            <div
                className="mt-8 h-16 py-3 sticky top-0 bg-blue-light-bg flex space-x-2 z-10">
                {filters.map((filter, index) => (
                    <button key={index} className="rounded-md bg-white h-full w-max  flex items-center">
                        <h1 className="pl-2 pr-2" onClick={() => {
                            if (activeModal === filter.name)
                                setActiveModal("");
                            else
                                setActiveModal(filter.name);
                        }}>{filter.name}</h1>
                        {activeModal === filter.name && (
                            <div className="absolute bg-white rounded-md max-w-[300px] h-max shadow-lg p-4 top-16">
                                {filter.value.map((value, i) => (
                                    <div key={i} className="flex items-center">
                                        <input
                                            onChange={() => handleCheckbox(filter, value)}
                                            type="checkbox"
                                            className="mr-4"/>
                                        <h1 className="truncate overflow-hidden">{value}</h1>
                                    </div>
                                ))}
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-4 w-full">
                <div className="w-full">
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {selectedProducts.map((product, index) => (
                            <ItemBox key={index} product={product} showDetail={true}/>
                        ))}
                        {selectedProducts.map((product, index) => (
                            <ItemBox key={index} product={product} showDetail={true}/>
                        ))}
                        {selectedProducts.map((product, index) => (
                            <ItemBox key={index} product={product} showDetail={true}/>
                        ))}
                        {selectedProducts.map((product, index) => (
                            <ItemBox key={index} product={product} showDetail={true}/>
                        ))}
                        {selectedProducts.map((product, index) => (
                            <ItemBox key={index} product={product} showDetail={true}/>
                        ))}
                        {selectedProducts.map((product, index) => (
                            <ItemBox key={index} product={product} showDetail={true}/>
                        ))}
                        {selectedProducts.map((product, index) => (
                            <ItemBox key={index} product={product} showDetail={true}/>
                        ))}

                    </div>
                </div>
            </div>

        </div>
    )
}
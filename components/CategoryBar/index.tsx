"use client";
import * as Icons from "./Icons";
import {useState} from "react";

const categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
    'Category 7',
    'Category 8',
    'Category 9',
    'Category 10',
    'Category 11',
    'Category 12',
]

export default function CategoryBar() {

    const [isOpen, setIsOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide === categories.length - 5) {
            setCurrentSlide(0);
            return;
        }
        setCurrentSlide(currentSlide + 1);
    }

    const prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(categories.length - 5);
            return;
        }
        setCurrentSlide(currentSlide - 1);
    }

    const handleModal = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            document.body.classList.remove('overflow-hidden');
            return;
        }
        document.body.classList.add('overflow-hidden');
    }

    return (
        <nav className="sticky top-0 flex justify-center h-20 bg-white pt-2 pb-2">
            <div className="flex w-full max-w-[75%] space-x-4">
                <div
                    onClick={handleModal}
                    className="rounded-lg hover:bg-blue-light-bg w-[200px] h-full flex justify-center items-center space-x-2">
                    <Icons.Category className="w-5 h-5 text-black"/>
                    <a>Category</a>
                </div>

                <div className="flex w-full space-x-4 justify-between">
                    <div className="h-full flex space-x-4 overflow-x-hidden">
                        {categories.slice(currentSlide, currentSlide + 4).map((category, index) => (
                            <div key={index}
                                 className="rounded-lg w-44 h-full flex space-x-4 p-4 items-center hover:bg-blue-light-bg">
                                <div className="w-10 h-10 bg-red-200"></div>
                                <a className="font-semibold w-max">{category}</a>
                            </div>
                        ))}
                        <div className="rounded-lg w-44 h-full flex space-x-4 p-4 items-center hover:bg-blue-light-bg">
                            <div className="w-10 h-10 bg-red-200"></div>
                            <a className="font-semibold w-max">{categories[currentSlide + 4]}</a>
                        </div>
                    </div>

                    <div className="h-full flex space-x-4 items-center">
                        <div onClick={nextSlide} className="rounded-full p-2 bg-blue-light-bg">
                            <Icons.Prev className="w-5 h-5 text-black"/>
                        </div>
                        <div onClick={nextSlide} className="rounded-full p-2 bg-blue-light-bg">
                            <Icons.Next className="w-5 h-5 text-black"/>
                        </div>
                    </div>
                </div>

            </div>

            {/*Modal*/}
            {isOpen && (
                <div
                    style={{top: window.scrollY > 80 ? 80 : 160 - window.scrollY}}
                    className={`fixed left-0 right-0 bottom-0 flex justify-center pt-5 transition-opacity duration-200 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="bg-white w-[75%] h-[540px] rounded-lg p-4 flex space-x-4">
                        <ul className="min-w-[20%] h-full space-y-2 overflow-y-auto">
                            {categories.map((category, index) => (
                                <div key={index}
                                     className="rounded-md hover:bg-blue-light-bg w-full h-12 pl-6 items-center">
                                    <div className="flex items-center space-x-4 h-full">
                                        <div className="w-6 h-6 bg-green-300"></div>
                                        <a className="font-semibold">{category}</a>
                                    </div>
                                </div>
                            ))}
                        </ul>

                        <div className="bg-blue-light-bg h-full w-[55%] rounded-md">

                        </div>

                        <div className="flex h-full w-[25%] flex-col space-y-4">
                            <div className="rounded-md h-1/4 bg-green-300 w-full">

                            </div>
                            <div className="rounded-md h-1/4 bg-green-300 w-full">

                            </div>
                            <div className="rounded-md h-1/4 bg-green-300 w-full">

                            </div>
                            <div className="rounded-md h-1/4 bg-green-300 w-full">

                            </div>
                        </div>
                    </div>
                </div>
            )}


        </nav>
    )
}
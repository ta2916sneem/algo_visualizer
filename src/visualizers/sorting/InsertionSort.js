import React, {useState} from "react";
import {sleep} from "../../helpers";
import Slider from "../../components/Slider";

let animationDuration = 1;

const PRIMARY_COLOR = 'rgba(96, 165, 250)';
const SECONDARY_COLOR = 'rgba(52, 211, 153)';
const PRIMARY_SHADOW = '0px 0px 3px 2px blue';
const SECONDARY_SHADOW = '0px 0px 3px 2px green';

const LINE_INSERTION = "LINE_INSERTION";

function InsertionSort() {

    let initialArray = [];
    for(let i=0; i<50; i++) {
        initialArray[i] = Math.random() * 500;
    }

    const [isSorting, setIsSorting] = useState(false);
    const [array, setArray] = useState(initialArray);

    // Insertion sort
    const insertionSortAnimation = async () => {
        const lines = document.getElementsByClassName(LINE_INSERTION);
        let n = array.length;
        for (let i = 1; i < n; ++i) {
            let j = i;
            while (j > 0 && array[j-1] > array[j]) {
                lines[j].style.backgroundColor = PRIMARY_COLOR;
                lines[j-1].style.backgroundColor = SECONDARY_COLOR;
                lines[j].style.boxShadow = PRIMARY_SHADOW;
                lines[j-1].style.boxShadow = SECONDARY_SHADOW;
                await sleep(animationDuration*5);

                lines[j].style.height = `${array[j-1]}px`;
                lines[j-1].style.height = `${array[j]}px`;
                lines[j].style.backgroundColor = SECONDARY_COLOR;
                lines[j-1].style.backgroundColor = PRIMARY_COLOR;
                lines[j].style.boxShadow = SECONDARY_SHADOW;
                lines[j-1].style.boxShadow = PRIMARY_SHADOW;
                await sleep(animationDuration*5);

                let temp = array[j];
                array[j] = array[j-1];
                array[j-1] = temp;

                lines[j].style.boxShadow = null;
                lines[j-1].style.boxShadow = null;
                lines[j].style.backgroundColor = SECONDARY_COLOR;
                await sleep(animationDuration*5);
                j = j - 1;
            }


            lines[j].style.boxShadow = null;
            lines[j].style.backgroundColor = SECONDARY_COLOR;
            await sleep(animationDuration*5);
        }
    }

    const handleSort = async () => {
        setIsSorting(true);
        await insertionSortAnimation();
        setArray(array);
        setIsSorting(false);
    }

    const handleSliderChange = (event, newValue) => {
        event.preventDefault();
        animationDuration = newValue;
    }

    const handleResetArray = (event) => {
        event.preventDefault();
        const newArray = [];
        const lines = document.getElementsByClassName(LINE_INSERTION);
        for(let i=0; i<50; i++) {
            newArray[i] = Math.random() * 500;
            lines[i].style.backgroundColor = 'grey';
        }
        setArray(newArray);
    }


    return (
        <div className="flex flex-col items-center py-8 bg-green-50 rounded ring-2 ring-green-100">
            <span className={"text-2xl tracking-wider text-green-500"}>Insertion Sort</span>
            <div className={"line-container flex items-end space-x-1 xl:space-x-2 justify-center"}>
                {
                    array.map((val, index) => {
                        return <div key={index} className={`${LINE_INSERTION} rounded-t w-1 sm:w-2 lg:w-3`}  style={{
                            height: `${val}px`,
                            backgroundColor: 'grey'}}/>
                    })
                }
            </div>
            <div className={"w-32 flex flex-col items-center "}>
                <Slider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    onChange={handleSliderChange}
                    defaultValue={1} />
                <p className={""}>Delay</p>
            </div>
            <div className={"mt-8 flex space-x-4 justify-center"}>

                <button
                    id={'btn-bubble-sort'}
                    onClick={handleSort}
                    className={`rounded px-4 py-2 bg-green-900 w-40 text-white focus:outline-none hover:bg-green-800
                     ${isSorting && "cursor-not-allowed"}`}>
                    {isSorting ? "Sorting..." : "Insertion Sort"}
                </button>
                <button
                    id={'btn-bubble-sort'}
                    onClick={handleResetArray}
                    className={`rounded px-4 py-2 bg-green-900 w-40 text-white focus:outline-none hover:bg-green-800
                     ${isSorting ? "hidden": "inline"}`}>
                    {isSorting ? "Sorting..." : "Reset Array"}
                </button>
            </div>
        </div>
    );
}

export default InsertionSort;

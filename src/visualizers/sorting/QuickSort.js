import React, {useState} from "react";
import {sleep} from "../../helpers";
import Slider from "../../components/Slider";

let animationDuration = 1;

const PRIMARY_COLOR = 'rgba(96, 165, 250)';
const SECONDARY_COLOR = 'rgba(52, 211, 153)';
const PIVOT_COLOR = 'rgba(236, 72, 153)'
const PRIMARY_SHADOW = '0px 0px 3px 2px blue';
const SECONDARY_SHADOW = '0px 0px 3px 2px green';
const PIVOT_SHADOW = '0px 0px 3px 2px rgba(249, 168, 212)'

const LINE_QUICK = "LINE_QUICK";

function QuickSort() {

    let initialArray = [];
    for(let i=0; i<50; i++) {
        initialArray[i] = Math.random() * 500;
    }

    const [isSorting, setIsSorting] = useState(false);
    const [array, setArray] = useState(initialArray);

    // Quick sort
    const quickSortAnimation = async () => {
        const lines = document.getElementsByClassName(LINE_QUICK);
        await quickSortHelper(lines, 0, array.length-1);
        for(let i=0; i<array.length; i++){
            lines[i].style.backgroundColor = SECONDARY_COLOR;
            await sleep(animationDuration*2);
        }
    }

    const quickSortHelper = async (lines, low, hi) => {
        // console.log(low, hi);
        if(low < hi){
            let pivot = await partition(lines, low, hi);
            await quickSortHelper(lines, low, pivot-1);
            await quickSortHelper(lines, pivot+1, hi);
        }
    }

    const partition = async (lines, low, hi) => {
        // pivot (Element to be placed at right position)
        let pivot = array[hi];

        let i = (low - 1)  // Index of smaller element

        lines[hi].style.backgroundColor = PIVOT_COLOR;
        lines[hi].style.boxShadow = PIVOT_SHADOW;
        await sleep(animationDuration*5);

        for (let j = low; j <= hi- 1; j++)
        {
            // If current element is smaller than the pivot

            lines[j].style.backgroundColor = PRIMARY_COLOR;
            lines[j].style.boxShadow = PRIMARY_SHADOW;

            lines[i+1].style.backgroundColor = SECONDARY_COLOR;
            lines[i+1].style.boxShadow = SECONDARY_SHADOW;
            await sleep(animationDuration*5);

            if (array[j] < pivot)
            {
                lines[j].style.backgroundColor = SECONDARY_COLOR;
                lines[j].style.boxShadow = SECONDARY_SHADOW;
                lines[i+1].style.backgroundColor = PRIMARY_COLOR;
                lines[i+1].style.boxShadow = PRIMARY_SHADOW;
                lines[j].style.height = `${array[i+1]}px`
                lines[i+1].style.height = `${array[j]}px`
                await sleep(animationDuration*5);

                i++;    // increment index of smaller element
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;

            }


            for(let k=low; k<hi; k++){
                if(lines[k].style.backgroundColor !== 'grey'){
                    lines[k].style.backgroundColor = 'grey';
                    lines[k].style.boxShadow = null;
                }
            }
            await sleep(animationDuration*5);

        }
        let temp = array[i+1];
        array[i+1] = array[hi];
        array[hi] = temp;

        lines[hi].style.boxShadow = null;
        lines[hi].style.backgroundColor = 'grey';
        await sleep(animationDuration*5);

        return (i + 1)
    }

    const handleSort = async () => {
        setIsSorting(true);
        await quickSortAnimation();
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
        const lines = document.getElementsByClassName(LINE_QUICK);
        for(let i=0; i<50; i++) {
            newArray[i] = Math.random() * 500;
            lines[i].style.backgroundColor = 'grey';
        }
        setArray(newArray);
    }


    return (
        <div className="flex flex-col items-center py-8 bg-green-50 rounded ring-2 ring-green-100">
            <span className={"text-2xl tracking-wider text-green-500"}>Quick Sort</span>
            <div className={"line-container flex items-end space-x-1 xl:space-x-2 justify-center"}>
                {
                    array.map((val, index) => {
                        return <div key={index} className={`${LINE_QUICK} rounded-t w-1 sm:w-2 lg:w-3`}  style={{
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
                    {isSorting ? "Sorting..." : "Quick Sort"}
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

export default QuickSort;

import React, {useState} from "react";
import {sleep} from "../../helpers";
import Slider from "../../components/Slider";

let animationDuration = 1;

const PRIMARY_COLOR = 'rgba(96, 165, 250)';
const SECONDARY_COLOR = 'rgba(52, 211, 153)';
const PRIMARY_SHADOW = '0px 0px 3px 2px blue';
const SECONDARY_SHADOW = '0px 0px 3px 2px green';

const LINE_MERGE = "LINE_MERGE";

function MergeSort() {

    let initialArray = [];
    for(let i=0; i<50; i++) {
        initialArray[i] = Math.random() * 500;
    }

    const [isSorting, setIsSorting] = useState(false);
    const [array, setArray] = useState(initialArray);

    // Merge sort
    const mergeSortAnimation = async () => {
        const lines = document.getElementsByClassName(LINE_MERGE);
        await mergeSort(0, array.length-1, lines);
        for(let i=0; i<lines.length; i++){
            lines[i].style.backgroundColor = SECONDARY_COLOR;
            await sleep(animationDuration*2);
        }
    }

    const mergeSort = async (l, r, lines) => {
        if (l < r) {
            let m = parseInt(((l + r) / 2)+"");
            await mergeSort(l, m, lines);
            await mergeSort(m + 1, r, lines);
            await merge(l, m, r, lines);
        }
    }

    const merge = async (l, m, r, lines) => {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; ++i)
        L[i] = array[l + i];
        for (let j = 0; j < n2; ++j)
        R[j] = array[m + 1 + j];

        let i = 0, j = 0;

        let k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                array[k] = L[i];
                lines[k].style.backgroundColor = PRIMARY_COLOR;
                lines[i+l].style.backgroundColor = SECONDARY_COLOR;
                lines[k].style.boxShadow = PRIMARY_SHADOW;
                lines[i+l].style.boxShadow = SECONDARY_SHADOW;
                lines[k].style.height = `${L[i]}px`;
                await sleep(animationDuration*5);

                lines[k].style.backgroundColor = 'grey';
                lines[i+l].style.backgroundColor = 'grey';
                lines[k].style.boxShadow = null;
                lines[i+l].style.boxShadow = null;
                await sleep(animationDuration*5);
                i++;
            }
            else {
                array[k] = R[j];
                lines[k].style.backgroundColor = PRIMARY_COLOR;
                lines[j+m].style.backgroundColor = SECONDARY_COLOR;
                lines[k].style.boxShadow = PRIMARY_SHADOW;
                lines[j+m].style.boxShadow = SECONDARY_SHADOW;
                lines[k].style.height = `${R[j]}px`;
                await sleep(animationDuration*5);

                lines[k].style.backgroundColor = 'grey';
                lines[j+m].style.backgroundColor = 'grey';
                lines[k].style.boxShadow = null;
                lines[j+m].style.boxShadow = null;
                await sleep(animationDuration*5);
                j++;
            }
            k++;
        }

        while (i < n1) {
            array[k] = L[i];
            lines[k].style.backgroundColor = PRIMARY_COLOR;
            lines[i+l].style.backgroundColor = SECONDARY_COLOR;
            lines[k].style.boxShadow = PRIMARY_SHADOW;
            lines[i+l].style.boxShadow = SECONDARY_SHADOW;
            lines[k].style.height = `${L[i]}px`;
            await sleep(animationDuration*5);

            lines[k].style.backgroundColor = 'grey';
            lines[i+l].style.backgroundColor = 'grey';
            lines[k].style.boxShadow = null;
            lines[i+l].style.boxShadow = null;
            await sleep(animationDuration*5);
            i++;
            k++;
        }

        while (j < n2) {
            array[k] = R[j];
            lines[k].style.backgroundColor = PRIMARY_COLOR;
            lines[j+m].style.backgroundColor = SECONDARY_COLOR;
            lines[k].style.boxShadow = PRIMARY_SHADOW;
            lines[j+m].style.boxShadow = SECONDARY_SHADOW;
            lines[k].style.height = `${R[j]}px`;
            await sleep(animationDuration*5);

            lines[k].style.backgroundColor = 'grey';
            lines[j+m].style.backgroundColor = 'grey';
            lines[k].style.boxShadow = null;
            lines[j+m].style.boxShadow = null;
            await sleep(animationDuration*5);
            j++;
            k++;
        }
    }


    const handleSort = async () => {
        setIsSorting(true);
        await mergeSortAnimation();
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
        const lines = document.getElementsByClassName(LINE_MERGE);
        for(let i=0; i<50; i++) {
            newArray[i] = Math.random() * 500;
            lines[i].style.backgroundColor = 'grey';
        }
        setArray(newArray);
    }


    return (
        <div className="flex flex-col items-center py-8 bg-green-50 rounded ring-2 ring-green-100">
            <span className={"text-2xl tracking-wider text-green-500"}>Merge Sort</span>
            <div className={"line-container flex items-end space-x-1 xl:space-x-2 justify-center"}>
                {
                    array.map((val, index) => {
                        return <div key={index} className={`${LINE_MERGE} rounded-t w-1 sm:w-2 lg:w-3`}  style={{
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
                    {isSorting ? "Sorting..." : "Merge Sort"}
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

export default MergeSort;

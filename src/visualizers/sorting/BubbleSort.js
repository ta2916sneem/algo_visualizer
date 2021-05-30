import React, {useState} from "react";
import {sleep} from "../../helpers";
import Slider from "../../components/Slider";

let animationDuration = 1;

const LINE_BUBBLE = "LINE_BUBBLE";

function BubbleSort() {

    let initialArray = [];
    for(let i=0; i<50; i++) {
        initialArray[i] = Math.random() * 500;
    }

    const [isSorting, setIsSorting] = useState(false);
    const [array, setArray] = useState(initialArray);

    // Bubble sort
    const bubbleSortAnimation = async () => {
        const lines = document.getElementsByClassName(LINE_BUBBLE);
        for(let i=0; i<array.length; i++){
            for(let j=0; j<array.length-1-i; j++){
                const line1 = lines[j].style;
                const line2 = lines[j+1].style;

                await sleep(animationDuration*5);
                line1.backgroundColor = 'rgba(52, 211, 153)';
                line2.backgroundColor = 'rgba(96, 165, 250)';
                line1.boxShadow = '0px 0px 3px 2px green';
                line2.boxShadow = '0px 0px 3px 2px blue';


                if(array[j] > array[j+1]){

                    await sleep(animationDuration*5);

                    line2.backgroundColor = 'rgba(52, 211, 153)';
                    line1.backgroundColor = 'rgba(96, 165, 250)';
                    line1.boxShadow = '0px 0px 3px 2px blue';
                    line2.boxShadow = '0px 0px 3px 2px green';
                    line1.height = `${array[j+1]}px`;
                    line2.height = `${array[j]}px`;

                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }

                line2.backgroundColor = 'rgba(52, 211, 153)';

                await sleep(animationDuration*5);

                line1.backgroundColor = 'grey';
                line1.boxShadow = '0px 0px 0px 0px black';
                line2.boxShadow = '0px 0px 0px 0px black';
            }
        }
        lines[0].style.backgroundColor = 'rgba(52, 211, 153)';
    }

    const handleSort = async () => {
        setIsSorting(true);
        await bubbleSortAnimation();
        setArray(array);
        setIsSorting(false);
    }

    const handleSliderChange = (event, newValue) => {
        event.preventDefault();
        animationDuration = newValue;
    }

    const handleResetArray = (event) => {
        event.preventDefault();
        const newArray = []
        const lines = document.getElementsByClassName(LINE_BUBBLE);
        for(let i=0; i<50; i++) {
            newArray[i] = Math.random() * 500;
            lines[i].style.backgroundColor = 'grey';
        }
        setArray(newArray);
    }


    return (
        <div className="flex flex-col items-center py-8 bg-green-50 rounded ring-2 ring-green-100">
            <span className={"text-2xl tracking-wider text-green-500"}>Bubble Sort</span>
            <div className={`bubble-container flex items-end space-x-1 xl:space-x-2 justify-center`}>
                {
                    array.map((val, index) => {
                        return <div key={index} className={`${LINE_BUBBLE} rounded-t w-1 sm:w-2 lg:w-3`} style={{
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
                    className={`rounded px-4 py-2 bg-green-900 w-32 text-white focus:outline-none hover:bg-green-800
                     ${isSorting && "cursor-not-allowed"}`}>
                    {isSorting ? "Sorting..." : "Bubble Sort"}
                </button>
                <button
                    id={'btn-bubble-sort'}
                    onClick={handleResetArray}
                    className={`rounded px-4 py-2 bg-green-900 w-32 text-white focus:outline-none hover:bg-green-800
                     ${isSorting ? "hidden": "inline"}`}>
                    {isSorting ? "Sorting..." : "Reset Array"}
                </button>
            </div>
        </div>
    );
}

export default BubbleSort;

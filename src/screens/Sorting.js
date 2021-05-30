import BubbleSort from "../visualizers/sorting/BubbleSort";
import InsertionSort from "../visualizers/sorting/InsertionSort";
import QuickSort from "../visualizers/sorting/QuickSort";
import MergeSort from "../visualizers/sorting/MergeSort";
import React from "react";

const Sorting = () => {
    return (
        <div className={"space-y-8 px-4 pt-20"}>
            <BubbleSort/>
            <InsertionSort/>
            <QuickSort/>
            <MergeSort/>
        </div>
    )
}

export default Sorting;
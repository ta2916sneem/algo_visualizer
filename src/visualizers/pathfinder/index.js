import {useEffect, useState} from "react";
import bfs from "./bfs";
import dfs from "./dfs";


const MATRIX_ROW_SIZE = 29;
const MATRIX_COL_SIZE = 50;

const SOURCE_COLOR = 'rgba(110, 231, 183)';
const DESTINATION_COLOR = 'rgba(239, 68, 68)';
const WALL_COLOR = 'rgba(49, 46, 129)'
const IDLE_COLOR = 'rgba(236, 253, 245)'

const STEPS = {
    READY: 0,
    SOURCE_SET: 1,
    DESTINATION_SET: 2,
    FINDING_PATH: 3,
    FOUND_PATH: 4
}

export const CELL_TYPE = {
    SOURCE: "SOURCE",
    DESTINATION: "DESTINATION",
    IDLE: "IDLE",
    WALL: "WALL"
}

let source;
let destination;

const matrix = new Array(MATRIX_ROW_SIZE);

const initializeMatrix = () => {
    console.log("Called");
    for(let i=0; i<MATRIX_ROW_SIZE; i++){
        const row = new Array(MATRIX_COL_SIZE);
        for(let j=0; j<MATRIX_COL_SIZE; j++){
            row[j] = {
                row: i,
                column: j,
                type: CELL_TYPE.IDLE
            }
        }
        matrix[i] = row;
    }
}

initializeMatrix();

const ALGORITHM = {
    BREADTH_FIRST_SEARCH: "BREADTH FIRST SEARCH",
    DEPTH_FIRST_SEARCH: "DEPTH FIRST SEARCH",
    DIJIKSTRA: "DIJIKSTRA"
}

const initialState = {
    step: STEPS.READY,
    algorithm: ALGORITHM.BREADTH_FIRST_SEARCH,
    isMouseDown: false
}

const PathFinder = () => {

    const [state, setState] = useState(initialState);

    useEffect(() => {
        initializeMatrix();
    }, [])

    const handleCellClick = async (event, cell) => {
        event.preventDefault();
        const cell_element = document.getElementById(`cell-${cell.row}-${cell.column}`);
        if(state.step === STEPS.READY){
            if(cell.type === CELL_TYPE.IDLE){
                cell_element.innerHTML =
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>`;
                cell_element.style.backgroundColor = SOURCE_COLOR;
                cell_element.classList.replace("ring-1", "ring-0");
                cell.type = CELL_TYPE.SOURCE;
                source = {...cell};
                setState({
                    ...state,
                    step: STEPS.SOURCE_SET
                })
            }
        }else if(state.step === STEPS.SOURCE_SET){
            if(cell.type === CELL_TYPE.IDLE){
                cell_element.innerHTML =
                    `<svg viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.31384 15.2903C6.54169 12.9343 17.189 8.73097 20.2553 9.66071C21.0005 10.1357 21.2385 10.2756 20.7296 9.89029C20.6018 9.79353 20.4427 9.71753 20.2553 9.66071C16.9391 7.54656 3.57864 -1.20698 1.31384 0.140296V15.2903Z" fill="black"/>
                        <line x1="0.5" y1="0.5" x2="0.499999" y2="26.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>`
                cell_element.style.backgroundColor = DESTINATION_COLOR;
                cell_element.classList.replace("ring-1", "ring-0");
                cell.type = CELL_TYPE.DESTINATION;
                destination = {...cell}
                setState({
                    ...state,
                    step: STEPS.DESTINATION_SET
                })
            }else if(cell.type === CELL_TYPE.SOURCE){
                cell_element.innerHTML = null;
                cell_element.style.backgroundColor = IDLE_COLOR;
                cell_element.classList.replace("ring-0", "ring-1");
                cell.type = CELL_TYPE.IDLE
                source = null;
                setState({
                    ...state,
                    step: STEPS.READY
                })
            }
        }else if(state.step === STEPS.DESTINATION_SET){
            if(cell.type === CELL_TYPE.DESTINATION){
                cell_element.innerHTML = null;
                cell_element.style.backgroundColor = IDLE_COLOR;
                cell_element.classList.replace("ring-0", "ring-1");
                cell.type = CELL_TYPE.IDLE;
                destination = null;
                setState({
                    ...state,
                    step: STEPS.SOURCE_SET
                })
            }else if(cell.type === CELL_TYPE.WALL || cell.type === CELL_TYPE.IDLE){
                makeWall(cell);
            }
        }
    }

    const makeWall = (cell) => {
        const cell_element = document.getElementById(`cell-${cell.row}-${cell.column}`);
        if(cell.type === CELL_TYPE.IDLE){
            cell_element.style.backgroundColor = WALL_COLOR;
            cell_element.classList.replace("ring-1", "ring-0");
            cell.type = CELL_TYPE.WALL;
        }else if(cell.type === CELL_TYPE.WALL){
            cell_element.style.backgroundColor = IDLE_COLOR;
            cell_element.classList.replace("ring-0", "ring-1");
            cell.type = CELL_TYPE.IDLE;
        }
    }

    const mouseDragBuildObstacle = (event, cell) => {
        if(state.isMouseDown && state.step === STEPS.DESTINATION_SET){
            makeWall(cell);
        }
    }

    const handlePathSearch = async () => {
        if(state.step !== STEPS.DESTINATION_SET){
            return;
        }
        setState({
            ...state,
            step: STEPS.FINDING_PATH
        })
        switch (state.algorithm){
            case ALGORITHM.BREADTH_FIRST_SEARCH:
                await bfs(matrix, source, destination);
                break;
            case ALGORITHM.DEPTH_FIRST_SEARCH:
                await dfs(matrix, source, destination);
                break;
            default:
                await bfs(matrix, source, destination);
        }
        setState({
            ...state,
            step: STEPS.FOUND_PATH
        })
    }

    const cleanBoard = () => {
        for(let i=0; i<MATRIX_ROW_SIZE; i++){
            for(let j=0; j<MATRIX_COL_SIZE; j++){
                const cell_element = document.getElementById(`cell-${i}-${j}`);
                if(cell_element){
                    cell_element.style.backgroundColor = IDLE_COLOR;
                    cell_element.classList.replace("ring-0", "ring-1");
                    cell_element.innerHTML = null;
                }
            }
        }
    }

    const resetBoard = () => {
        cleanBoard();
        initializeMatrix();
        setState(initialState);
    }

    const handleSearchReset = () => {
        if(state.step === STEPS.DESTINATION_SET){
            handlePathSearch();
        }else if(state.step === STEPS.FOUND_PATH){
            resetBoard();
        }
    }

    const handleAlgoSelection = (event) => {
        setState({
            ...state,
            algorithm: event.currentTarget.value
        })
    }

    const handleMouseDown = (event, cell) => {
        setState({...state, isMouseDown: true});
        handleCellClick(event, cell);
    }

    const renderBoard = () => {
        return (
                <div className={"flex flex-col shadow"}>
                    {matrix.map((row, index) => {
                        return <div className={"flex"} key={index}>
                        {row.map((cell, index) => {
                            return (
                                <div
                                    id={`cell-${cell.row}-${cell.column}`}
                                    onMouseEnter={event => mouseDragBuildObstacle(event, cell)}
                                    onMouseDown={event => handleMouseDown(event, cell)}
                                    onMouseUp={event => setState({...state, isMouseDown: false})}
                                    // style={{
                                    //     backgroundColor: IDLE_COLOR
                                    // }}
                                    className={"cell text-gray-800 h-2 sm:h-3 lg:h-4 xl:h-5 w-2 sm:w-3 lg:w-4 xl:w-5 ring-1 ring-blue-300" +
                                    " transition duration-50 transform bg-green-50"} key={index}/>
                            )
                        })}
                        </div>
                    })}
                </div>
        )
    }

    const renderSteps = () => {
        return (
            <div className={"flex flex-col p-2 items-center justify-between bg-white h-screen pt-12 "}>
                <div className={`p-2 rounded-full text-white flex-shrink-0 absolute
                  ${state.step === STEPS.READY ? " animate-ping  bg-white text-green-500 border border-green-500 ": `${state.step >= STEPS.SOURCE_SET ? " bg-green-500 text-white  " : " bg-white text-green-500 border border-green-500 "}`}
                  font-montserrat flex justify-center items-center`}>
                    <svg className={"w-4 h-4"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className={"justify-self-stretch bg-green-500 w-1 h-full"}/>
                <div className={`p-2 rounded-full
                 ${state.step === STEPS.SOURCE_SET ? " animate-ping  bg-white text-green-500 border border-green-500 ": `${state.step >= STEPS.DESTINATION_SET ? " bg-green-500 text-white  " : " bg-white text-green-500 border border-green-500 "}`}
                 flex-shrink-0 font-montserrat flex justify-center items-center`}>
                    <svg className={"w-4 h-4"} viewBox="0 0 21 27" stroke={"currentColor"} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.31384 15.2903C6.54169 12.9343 17.189 8.73097 20.2553 9.66071C21.0005 10.1357 21.2385 10.2756 20.7296 9.89029C20.6018 9.79353 20.4427 9.71753 20.2553 9.66071C16.9391 7.54656 3.57864 -1.20698 1.31384 0.140296V15.2903Z" fill="black"/>
                        <line x1="0.5" y1="0.5" x2="0.499999" y2="26.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className={"justify-self-stretch bg-green-500 w-1 h-full"}/>
                <div className={`p-2 rounded-full  
                  ${state.step > STEPS.DESTINATION_SET ? " bg-green-500 text-white " :" bg-white text-green-500 border border-green-500 "}
                  ${state.step === STEPS.DESTINATION_SET && " animate-ping "}
                 flex-shrink-0 font-montserrat flex justify-center items-center`}>
                    <img src={"/images/brickwall.svg"} alt={"wall"} className={"w-4 h-4"}/>
                </div>

                <div className={"justify-self-stretch bg-green-500 w-1 h-full"}/>
                <button className={`w-8 h-8 rounded-full shadow transition duration-400 transform  
                 ${(state.step === STEPS.DESTINATION_SET || state.step === STEPS.FOUND_PATH) ? " hover:shadow-lg animate-ping " : " cursor-not-allowed "}
                 flex-shrink-0 flex justify-center items-center focus:outline-none`}
                        onClick={handleSearchReset}
                >
                    {state.step <= STEPS.DESTINATION_SET ?
                        <svg className={`text-gray-400 w-full h-full ${state.step === STEPS.DESTINATION_SET ? " text-green-500 " : " text-gray-300 "}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>:
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="#81C784"/>
                            <mask id="path-2-inside-1" fill="white">
                                <path d="M7.14854 18.503C6.8557 18.8955 6.93459 19.4553 7.35402 19.7081C8.84202 20.605 10.5641 21.0554 12.313 20.9946C14.3586 20.9234 16.3187 20.1571 17.8702 18.8221C19.4216 17.4871 20.4717 15.6632 20.8472 13.6512C21.2227 11.6392 20.9012 9.55924 19.9357 7.75451C18.9702 5.94979 17.4184 4.52806 15.5363 3.72385C13.6541 2.91963 11.5541 2.78098 9.58255 3.33075C7.61101 3.88052 5.88575 5.08587 4.69135 6.74799C3.67011 8.16914 3.08913 9.85162 3.00946 11.5872C2.987 12.0764 3.40893 12.4527 3.89798 12.427V12.427C4.38703 12.4012 4.75691 11.9826 4.79119 11.4941C4.88463 10.1624 5.34579 8.87634 6.13154 7.78291C7.09058 6.44832 8.47587 5.48048 10.0589 5.03904C11.642 4.59761 13.3282 4.70894 14.8394 5.35468C16.3507 6.00042 17.5967 7.142 18.372 8.5911C19.1472 10.0402 19.4054 11.7103 19.1039 13.3258C18.8024 14.9413 17.9592 16.4059 16.7134 17.4778C15.4677 18.5497 13.8938 19.165 12.2513 19.2222C10.9057 19.269 9.57988 18.9389 8.42025 18.2776C7.99482 18.035 7.44138 18.1104 7.14854 18.503V18.503Z"/>
                            </mask>
                            <path d="M7.14854 18.503C6.8557 18.8955 6.93459 19.4553 7.35402 19.7081C8.84202 20.605 10.5641 21.0554 12.313 20.9946C14.3586 20.9234 16.3187 20.1571 17.8702 18.8221C19.4216 17.4871 20.4717 15.6632 20.8472 13.6512C21.2227 11.6392 20.9012 9.55924 19.9357 7.75451C18.9702 5.94979 17.4184 4.52806 15.5363 3.72385C13.6541 2.91963 11.5541 2.78098 9.58255 3.33075C7.61101 3.88052 5.88575 5.08587 4.69135 6.74799C3.67011 8.16914 3.08913 9.85162 3.00946 11.5872C2.987 12.0764 3.40893 12.4527 3.89798 12.427V12.427C4.38703 12.4012 4.75691 11.9826 4.79119 11.4941C4.88463 10.1624 5.34579 8.87634 6.13154 7.78291C7.09058 6.44832 8.47587 5.48048 10.0589 5.03904C11.642 4.59761 13.3282 4.70894 14.8394 5.35468C16.3507 6.00042 17.5967 7.142 18.372 8.5911C19.1472 10.0402 19.4054 11.7103 19.1039 13.3258C18.8024 14.9413 17.9592 16.4059 16.7134 17.4778C15.4677 18.5497 13.8938 19.165 12.2513 19.2222C10.9057 19.269 9.57988 18.9389 8.42025 18.2776C7.99482 18.035 7.44138 18.1104 7.14854 18.503V18.503Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" mask="url(#path-2-inside-1)"/>
                            <line x1="2.41421" y1="11" x2="4" y2="12.5858" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="1" y1="-1" x2="3.24264" y2="-1" transform="matrix(-0.707107 0.707107 0.707107 0.707107 7 11)" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    }
                </button>
            </div>
        )
    }


    const renderSideBar = () => {
        return (
            <div className={"lg:w-64 self-stretch flex-shrink-0 bg-white xl:h-screen pt-10 font-montserrat text-gray-500 pb-10"}>
                <div className={"hover:bg-gray-100 text-xl w-full p-2 transition duration-400 transform "}>Select Algorithm</div>
                <div>
                    <div className={"ml-4 flex items-center"}>
                        <input type="radio" name="level" value={ALGORITHM.BREADTH_FIRST_SEARCH} id={"bfs"}
                               checked={state.algorithm === ALGORITHM.BREADTH_FIRST_SEARCH}
                               onChange={handleAlgoSelection}
                               className={"w-5 h-5 mr-2 form-radio form-radio-dark text-indigo-500 outline-none cursor-pointer"}/>
                        <label htmlFor="bfs">Breadth First Search</label>
                    </div>
                    <div className={"ml-4 flex items-center"}>
                        <input type="radio" name="level" value={ALGORITHM.DEPTH_FIRST_SEARCH} id={"dfs"}
                               checked={state.algorithm === ALGORITHM.DEPTH_FIRST_SEARCH}
                               onChange={handleAlgoSelection}
                               className={"w-5 h-5 mr-2 form-radio form-radio-dark text-indigo-500 outline-none cursor-pointer"}/>
                        <label htmlFor="dfs">Depth First Search</label>
                    </div>
                    <div className={"ml-4 flex items-center"}>
                        <input type="radio" name="level" value={ALGORITHM.DIJIKSTRA} id={"Dijikstra"}
                               checked={state.algorithm === ALGORITHM.DIJIKSTRA}
                               onChange={handleAlgoSelection}
                               className={"w-5 h-5 mr-2 form-radio form-radio-dark text-indigo-500 outline-none cursor-pointer"}/>
                        <label htmlFor="Dijikstra">Dijikstra</label>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={"flex h-screen divide-x w-screen bg-white"}
        >
            {renderSteps()}
            <div className={"flex xl:flex-row flex-col lg:divide-x divide-y w-full"}>
                {renderSideBar()}
                <div
                    className={"lg:pt-10 flex items-center justify-center flex-grow"}
                    onMouseLeave={event => setState({...state, isMouseDown: false})}
                >
                    {renderBoard()}
                </div>
            </div>
        </div>
    )
}

export default PathFinder;
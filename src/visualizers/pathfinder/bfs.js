import {CELL_TYPE} from "./index";
import {sleep} from "../../helpers";


const VISITED_COLOR = 'rgba(249, 168, 212)';
const PATH_COLOR = 'rgba(252, 211, 77)'

const checkBound = (matrix, row, column, visited) => {
    if(row < 0 || column < 0 || row>=matrix.length || column >=matrix[0].length ||
        matrix[row][column].type === CELL_TYPE.WALL || visited[row][column]){
        return false;
    }
    return true;
}

const bfs = async (matrix, source, destination) => {

    if(!source){
        console.log("Please chose a source first");
        return ;
    }

    if(!destination){
        console.log("Please chose a destination first");
        return ;
    }

    let visited = new Array(matrix.length);
    for(let i=0; i<matrix.length; i++){
        const visitedRow = new Array(matrix[0].length);
        for(let j=0; j<matrix[0].length; j++){
            visitedRow[j] = false;
        }
        visited[i] = visitedRow;
    }

    const queue = [{currentCell: source, path:[source]}];
    visited[source.row][source.column] = true;

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while(queue.length > 0){
        let {currentCell, path} = queue.shift();
        for(let i=0; i<directions.length; i++){
            let nextRow = currentCell.row+directions[i][0];
            let nextColumn = currentCell.column+directions[i][1];
            if(checkBound(matrix, nextRow, nextColumn, visited)){
                if(matrix[nextRow][nextColumn].type === CELL_TYPE.DESTINATION){
                    for(let k=0; k<path.length; k++){
                        const path_cell = path[k];
                        const cell_element = document.getElementById(`cell-${path_cell.row}-${path_cell.column}`);
                        cell_element.style.backgroundColor = PATH_COLOR;
                        await sleep(20);
                    }
                    return;
                }else{
                    const auxPath = [...path];
                    auxPath.push(matrix[nextRow][nextColumn]);
                    queue.push({currentCell: matrix[nextRow][nextColumn], path: auxPath});
                    visited[nextRow][nextColumn] = true;
                    const cell_element = document.getElementById(`cell-${nextRow}-${nextColumn}`);
                    cell_element.style.backgroundColor = VISITED_COLOR;
                    cell_element.classList.replace("ring-1", "ring-0");
                    await sleep(20);
                }

            }
        }
    }

    console.log(`Sorry can't find destination`);
}

export default bfs;
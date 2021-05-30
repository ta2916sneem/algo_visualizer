import {CELL_TYPE} from "./index";
import {sleep} from "../../helpers";


const VISITED_COLOR = 'rgba(249, 168, 212)';

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const checkBound = (matrix, row, column) => {
    if(row < 0 || column < 0 || row>=matrix.length || column >=matrix[0].length ||
        matrix[row][column].type === CELL_TYPE.WALL){
        return false;
    }
    return true;
}

const dfs = async (matrix, source, destination) => {
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
    visited[source.row][source.column] = true;
    await dfsHelper(matrix, source, destination, visited);
}

const dfsHelper = async (matrix, current, destination, visited) => {
        for(let i=0; i<directions.length; i++){
            let nextRow = current.row+directions[i][0];
            let nextColumn = current.column+directions[i][1];
            if(!checkBound(matrix, nextRow, nextColumn, visited)){
                continue;
            }
            let next = matrix[nextRow][nextColumn];
            if(destination.row === nextRow && destination.column === nextColumn){
                console.log(`Found destination at ${nextRow},${nextColumn}`);
                return true;
            }
            if(!visited[nextRow][nextColumn]){
                visited[nextRow][nextColumn] = true;
                const cell_element = document.getElementById(`cell-${nextRow}-${nextColumn}`);
                cell_element.style.backgroundColor = VISITED_COLOR;
                cell_element.classList.replace("ring-1", "ring-0");
                await sleep(20);
                const res = await dfsHelper(matrix, next, destination, visited);
                if(res){
                    return true;
                }
            }
        }

        return false;
}

export default dfs;
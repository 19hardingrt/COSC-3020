// Ryan Harding - W09875973
// Lucas Stevens - W?????

// COSC Assignment 3 - Held-Karp algorithm for Travelling Salesmen Problem
/*
References used:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
https://www.w3schools.com/js/js_break.asp
https://github.com/iankellyUW/TSP-Held-Karp
https://github.com/jspauldo98/tsp_held_karp
https://github.com/AbleDabble/Held-karp-Javascript

*/
function tsp_hk(distance_matrix)
{
    let graph = distance_matrix.length;
    let x = [];
    for(let i = 0; i < graph; i++)
    {
        x[i] = [];
        for(let j = 0; j < graph; j++)
        {
            if(i == j) continue;
            {
                x[i][[j]] = distance_matrix[i][j];
            }
        }
    }
    
    for(let subsetStructureSize = 2; subsetStructureSize < graph; subsetStructureSize++)
    {
        let generateCombos = combinations(graph, subsetStructureSize);
        let generateCombosRet = generateCombos.next();

        while(generateCombosRet.done == false)
        {
            let combination = generateCombosRet.value;
            for(i = 0; i < graph; i++)
            {
                if(combination.includes(i)) continue;
                x[i][combination] = getMinimum(i, combination);
            }
            generateCombosRet = generateCombos.next();
        }
    }

// Helper Functions

    function getMinimum(num, set)
    {
        let lowest = 99999;
        
        for(let i = 0; i < set.length; i++)
        {
            let tmpN = set.slice();
            let Index = set[i];
            tmpN.splice(tmpN.indexOf(Index), 1);
            let graph = x[Index][tmpN];
            if(graph + distance_matrix[num][Index] < graph + distance_matrix[Index][num])
            {
                graph += distance_matrix[num][Index];
            } 
            else
            {
                 graph += distance_matrix[Index][num];
            }

            if(graph < lowest) lowest = graph;
        }
        return lowest;
    }
    let min = 99999;

    for(let i = 0; i < graph; i++)
    {
        let combination = [...Array(graph).keys()]; 
        let tmpCombination = combination.slice();
        tmpCombination.splice(tmpCombination.indexOf(i), 1);
        if(x[i][tmpCombination] < min) 
        {
            min = x[i][tmpCombination];
        }
    }
    return min;
}

function*combinations(graph, subsetStructureSize) 
{
    let pool = [...Array(graph).keys()];
    let len = pool.length;
    if(subsetStructureSize > len)
    {
        console.log("subset size greater than array length");
        return;
    }
    let indices = [...Array(subsetStructureSize).keys()]
    yield pool.slice(0, subsetStructureSize);
    
    while(true)
    {
        let ok = false;
        
        for(var i = indices.length-1; i >= 0; i--)
        {
            if(indices[i] != i + graph - subsetStructureSize)
            {
                ok = true;
                break;
            }
        }
        if(ok == false)
        {
            return;
        }
        indices[i] += 1;

        for(let j = i+1; j < subsetStructureSize; j++)
        {
            indices[j] = indices[j-1]+1;
        }
        let tmp = [];
        for(let val of indices)
        {
            tmp.push(pool[val]);
        }
        yield tmp;
    }
}

//Random Adjacency Matrix Generator

function randomMatrixGenerator(n)
{
	var array = [];
	for(var i = 0; i < n; i++)
    {
		array[i] = [];
		for(var j = 0; j < n; j++)
        {
            if(j == i) {array[j][i] = 0; continue;}
			array[i][j] = Math.floor(Math.random() * 99) + 1;
		}
	}
	return array;
}
/*
let city1 = [
    [0, 1, 999, 1],
    [1, 0, 1, 999],
    [999, 1, 0, 1],
    [1, 999, 1, 0]];
let city2 = [
    [0, 999, 1, 1],
    [999, 0, 2, 1],
    [5, 1, 0, 1],
    [3, 3, 999, 0]];
let city3 = [
    [0, 1, 9, 10],
    [1, 0, 7,  4],
    [9, 7, 0,  4],
    [10, 4, 4, 0]];
let city4 = [
    [0, 1],
    [2, 0]
];
let city5 = [
    [0, 3, 3],
    [1, 0, 2],
    [1, 1, 0]
];

let city6 = [ 
[ 0, 44, 12, 11, 44, 5, 63, 74, 50, 43, 77, 36, 47, 50, 94, 61, 75, 80, 51, 39 ],
[ 58, 0, 90, 24, 86, 24, 97, 67, 85, 17, 85, 37, 58, 60, 39, 6, 8, 16, 9, 30 ],
[ 48, 37, 0, 76, 45, 23, 32, 11, 43, 14, 82, 43, 19, 17, 64, 1, 76, 18, 46, 91 ],
[ 69, 100, 74, 0, 74, 63, 11, 96, 53, 36, 94, 73, 73, 67, 62, 17, 51, 48, 21, 20 ],
[ 95, 38, 55, 48, 0, 6, 65, 16, 99, 54, 85, 18, 95, 82, 11, 30, 24, 53, 62, 76 ],
[ 38, 30, 77, 52, 68, 0, 1, 87, 79, 68, 8, 98, 73, 2, 30, 16, 29, 19, 90, 36 ],
[ 79, 31, 3, 82, 97, 40, 0, 47, 7, 30, 53, 49, 60, 82, 24, 78, 1, 73, 76, 60 ],
[ 71, 44, 54, 90, 38, 87, 72, 0, 79, 7, 88, 71, 7, 68, 78, 50, 91, 28, 24, 10 ],
[ 14, 87, 97, 999, 74, 84, 29, 90, 0, 13, 85, 92, 43, 62, 37, 62, 8, 15, 10, 35 ],
[ 16, 1, 70, 44, 50, 37, 96, 8, 91, 0, 62, 67, 44, 68, 70, 98, 21, 75, 23, 69 ],
[ 44, 100, 82, 81, 32, 22, 7, 67, 93, 23, 0, 7, 96, 6, 51, 3, 48, 53, 30, 1 ],
[ 12, 32, 42, 59, 64, 36, 14, 58, 15, 50, 7, 0, 35, 67, 92, 59, 98, 14, 75, 71 ],
[ 40, 1, 32, 34, 7, 41, 8, 87, 30, 78, 89, 27, 0, 6, 34, 40, 44, 73, 84, 58 ],
[ 18, 36, 100, 75, 3, 77, 78, 29, 14, 74, 28, 11, 19, 0, 9, 14, 20, 20, 47, 96 ],
[ 67, 32, 95, 89, 41, 83, 77, 40, 78, 17, 51, 69, 40, 55, 0, 51, 43, 53, 87, 39 ],
[ 37, 87, 97, 11, 3, 10, 23, 69, 58, 69, 76, 21, 82, 90, 70, 0, 35, 94, 92, 99 ],
[ 44, 30, 36, 43, 31, 77, 36, 19, 84, 15, 45, 62, 79, 18, 35, 12, 0, 92, 54, 4 ],
[ 79, 52, 17, 73, 33, 100, 16, 85, 52, 5, 20, 44, 37, 28, 94, 8, 57, 0, 93, 1 ],
[ 8, 44, 3, 67, 92, 53, 15, 41, 39, 95, 41, 75, 22, 41, 72, 39, 35, 5, 0, 67 ],
[ 52, 78, 77, 78, 12, 13, 93, 13, 98, 60, 87, 85, 59, 61, 60, 82, 23, 88, 88, 0 ]
];
*/
/*
console.time();
console.log("shortest path found:",tsp_hk(city1));
console.timeEnd();

console.time();
console.log("shortest path found:",tsp_hk(city2));
console.timeEnd();

console.time();
console.log("shortest path found:",tsp_hk(city3));
console.timeEnd();

console.time();
console.log("shortest path found:",tsp_hk(city4));
console.timeEnd();

console.time();
console.log("shortest path found:",tsp_hk(city5));
console.timeEnd();
*/
//console.time();
//console.log("shortest path found:",tsp_hk(city6));
//console.timeEnd();

console.time();
console.log("shortest path found:",tsp_hk(randomMatrixGenerator(23)));
console.timeEnd();

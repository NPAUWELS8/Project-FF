export function sudoku(container, checkRef, solveRef, resetRef, regenRef){
    generateRandomSudoku();

    

    function generateRandomSudoku(){
        class Matrix{
            constructor(container) {
                this.container = container;
                this.rows = [];
                this.cols = [];
                this.squares = [];
                this.cells = [];
                this.size= 9;
                this.diagonal = [0,4,8]; //diagonal squares (starting from left to right, top to bottom)
                this.other = [1,2,3,5,6,7]; // other squares
                this.completedCells = [];
                this.setBackCount = 0;
                this.setBackValue = 10;
                this.maxSetBackValue = 10;
                this.regenCount = 0;
                this.maxRegen = 5;
            }
            solve(){
                this.cells.forEach((cell)=>{
                    cell.cellElement.value = cell.value;
                })
            }
            regenerate(){
                this.completedCells = [];
                this.setBackCount = 0;
                this.regenCount = 0;
                this.cells.forEach((cell)=>{
                    cell.value = 0;
                    cell.options = [];
                    cell.originalOptions = [];
                })
                this.fill();
                this.scrambleSudoku();
            }
            reset(){
                this.cells.forEach((cell)=>{
                    cell.cellElement.value = cell.initialElementValue;
                })
            }
            check(){
                this.solve();
                const check = this.cells.every((cell)=>cell.value == cell.cellElement.value);
                if(check){
                    //use the setOpen function of the modal component
                } else{
                    //use a callback function for the popup but avoid interrupting the game
                }
            }
            scrambleSudoku(){
                this.cells.forEach((cell)=>{
                    const random = Math.random();
                    const prob =  0.6;
                    if(random < prob){
                        cell.cellElement.value = "";
                    } else{
                        cell.cellElement.value = cell.value;
                        cell.initialElementValue = cell.value;
                    }
                })
            }
            createMatrix(){
                this.initialize();
                this.fill();
                // const rows = this.rows;
                this.scrambleSudoku();
            }
            initialize(){
                this.createCols();
                this.createRows();
                this.createSquares();
                this.createCells();
                // this.container.innerHTML = "";
                const tailwindCells = []
                this.rows.forEach((row)=>{
                    const cellsInRow = row.cells;
                    cellsInRow.forEach(cell =>{
                        tailwindCells.push(cell);
                    })
                })
                tailwindCells.forEach((cell)=>{
                    console.log(cell)
                    this.container.appendChild(cell.cellElement);
                })
            }
            fill(){
                this.fillDiagonalSquares();
                this.prepareOtherSquares();
                this.fillOtherSquares();
            }
            createCols(){
                for(let i = 0; i < this.size; i++){
                    const col = new Column(i);
                    this.cols.push(col);
                }
            }
            createRows(){
                for(let i = 0; i < this.size; i++){
                    const row = new Row(i);
                    this.rows.push(row);
                }
            }
            createSquares(){
                for(let i = 0; i < this.size; i++){
                    const square = new Square(i);
                    this.squares.push(square);
                }
            }
            createCells(){
                for(let i = 0; i < this.size*this.size; i++){
                    const rowIndex = Math.floor(i/this.size);
                    const row = this.rows[rowIndex];
                    const colIndex = i%this.size;
                    const col = this.cols[colIndex];
                    const squareRow = Math.floor(rowIndex/Math.sqrt(this.size));
                    const squareCol = Math.floor(colIndex/Math.sqrt(this.size));
                    const squareIndex = (squareRow * Math.sqrt(this.size)) + squareCol;
                    const square = this.squares[squareIndex];
                    const cell = new Cell(i,row,col,square);
                    this.cells.push(cell);
                    square.addCell(cell);
                    row.addCell(cell);
                    col.addCell(cell);
                }
            }
            fillDiagonalSquares(){
                const diagonal = this.diagonal;
                diagonal.forEach((squareIndex)=>{
                    const square = this.squares[squareIndex];
                    square.fillRandom(this.size);
                })
            }
            prepareOtherSquares(){
                const squares = this.other;
                squares.forEach((squareIndex)=>{
                    const square = this.squares[squareIndex];
                    const cells = square.cells;
                    //get the value options for each cell in the square
                    cells.forEach((cell)=>{
                        cell.checkOptions(true);
                        cell.isOtherSquare = true;
                    })
                })
            } 
            fillOtherSquares(){
                const allCells = this.cells;
                const cells = allCells.filter((cell)=> cell.isOtherSquare);
                //sort cells from those with least options to those with most options
                let sortedCells = [...this.sortOptions(cells)];
                const length = sortedCells.length;
                //loop through sorted cells and set random value from options array, next sort again
                for(let i = 0;i <length;i++){
                    const cell = sortedCells[0];
                    if(cell.options.length !== 0){
                        const options = cell.options;
                        const randomIndex = Math.floor(Math.random()*options.length);
                        const randomOption = options[randomIndex];
                        cell.value = randomOption;
                        this.completedCells.push(cell);
                        sortedCells.shift()
                        cell.updateDependencies(randomOption);
                    } else{
                        sortedCells = this.setBackFunction(sortedCells);
                        
                    }
                    if(sortedCells) this.sortOptions(sortedCells);
                }
            }
            setBackFunction(arr){
                try{
                    if(this.setBackValue !== this.maxSetBackValue){
                        const setBack = this.setBackValue;
                        const setBackCells = this.completedCells.splice(-setBack,setBack);
                        setBackCells.forEach((cell)=>{
                            cell.value = 0;
                        })
                        arr.concat(setBackCells);
                        this.setBackCount++
                        i = i - setBack
                        return arr;
                    } else{
                        throw new Error('Max set back number reached!');
                    }
                } catch (e){
                    if(this.regenCount<this.maxRegen){
                        this.regenerate();
                        this.regenCount++
                    } else{
                        throw new Error('Failed to regenerate after max attempts')
                    }
                }
            }
            sortOptions(arr){
                return arr.sort((a,b)=>a.options.length - b.options.length);
            }
        }
        class Square{
            constructor(id){
                this.id = id;
                this.cells = []
            }
            addCell(cell){
                this.cells.push(cell);
            }
            fillRandom(size){
                let array = [];
                for(let i=0;i<size;i++){
                    array.push(i+1);
                }
                array.sort(()=>{
                    return 1/2 - Math.random();
                })
                const cells = this.cells;
                cells.forEach((cell)=>{
                    cell.value = array.shift();
                })
            }
        }
        class Cell{
            constructor(id, row, column,square){
                this.id = id;
                this.row = row;
                this.col = column;
                this.square = square;
                this.value = 0;
                this.options = [];
                this.originalOptions = [];
                this.isOtherSquare = false;
                this.cellElement = document.createElement('input');
                this.initialElementValue = "";
                // this.cellElement.classList.add('col','text-center','line');
                this.cellElement.classList.add('border-1','aspect-square', 'text-center', 'w-[64px]')
                if(this.col.id === 2 || this.col.id === 5) {
                    this.cellElement.classList.add('border-r-3')
                }
                if(this.row.id ===2 || this.row.id ===5){
                    this.cellElement.classList.add('border-b-3')
                }
                this.cellElement.type = 'text';
                this.cellElement.maxLength = 1;
            }
            checkOptions(isFirst){
                const square = this.square;
                const cells = square.cells;
                const squareValues = cells.map((cell)=>cell.value);
                const rowCells = this.row.cells;
                const rowValues = rowCells.map((cell)=> cell.value);
                const col = this.col.cells;
                const colValues = col.map((cell)=>cell.value);
                const values = rowValues.concat(colValues).concat(squareValues);
                const rawOptions = [1,2,3,4,5,6,7,8,9];
                const options = rawOptions.filter((cell)=>!values.includes(cell));
                this.options = options;
                if(isFirst){
                    this.originalOptions = [...options];
                }
            }
            updateDependencies(value){
                const dependentCells = this.getDependentCells()
                dependentCells.forEach((cell)=>{
                    cell.options = cell.options.filter((option)=>option !== value);
                })

            }
            getDependentCells(){
                const squareCells = this.square.cells;
                const colCells = this.col.cells;
                const rowCells = this.row.cells;
                const allCells = squareCells.concat(colCells).concat(rowCells);
                const cells = allCells.filter((cell,index, array)=>{
                    const result = cell.id === this.id ? false : (array.findIndex((c)=>c.id === cell.id) === index);
                    return result
                })
                return cells;
            }
        }
        class Row{
            constructor(id){
                this.id = id;
                this.cells = [];
                // this.rowElement = document.createElement('div');
                // this.rowElement.classList.add('row','row-cols-9','m-0','p-0');
            }
            addCell(cell){
                this.cells.push(cell);
                // this.rowElement.appendChild(cell.cellElement);
            }
        }
        class Column{
            constructor(id){
                this.id = id;
                this.cells = []
            }
            addCell(cell){
                this.cells.push(cell);
            }
        }
        const matrix = new Matrix(container);

        //global module click handler
        document.addEventListener('click', function(event) {
            const target = event.target;
            if(target == checkRef){
                matrix.check()
            } else if (target == regenRef){
                matrix.regenerate()
            } else if (target == resetRef){
                matrix.reset()
            } else if (target == solveRef){
                matrix.solve()
            }
            // const tag = target.tagName;
            // const targetId = target.id;
            // if (tag === 'BUTTON' && targetId === 'checkButton') {
            //     matrix.check();
            // } else if (tag === 'BUTTON' && targetId === 'regenButton') {
            //     matrix.regenerate();
            // } else if (tag === 'BUTTON' && targetId === 'resetButton') {
            //     matrix.reset();
            // } else if (tag === 'BUTTON' && targetId === 'solveButton'){
            //     matrix.solve();
            // }
        })
        matrix.createMatrix();

        // const result = matrix.createMatrix();
        // return result;
    }
}
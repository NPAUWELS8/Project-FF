export function generateRandomSudoku(){
    class Matrix{
        constructor() {
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
            this.maxSetBackCount = 10;
            this.regenCount = 0;
            this.maxRegen = 5;
        }
        getSudokuArray(){
            const array = []
            this.rows.forEach(row =>{
                row.cells.forEach(cell=>{
                    array.push(`${cell.value}`);
                })
            })

            return array
        }
        getShownSudokuArray(){
            const array = []
            this.rows.forEach(row =>{
                row.cells.forEach(cell=>{
                    array.push(`${cell.shownValue}`);
                })
            })

            return array
        }
        scrambleSudoku(){
            this.cells.forEach((cell)=>{
                const random = Math.random();
                const prob =  0.6;
                if(random < prob){
                    cell.shownValue = "";
                } else{
                    cell.shownValue = cell.value;
                }
            })
        }
        createMatrix(){
            this.initialize();
            this.fill();
            this.scrambleSudoku();
        }
        initialize(){
            this.createCols();
            this.createRows();
            this.createSquares();
            this.createCells();
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
            const cells = this.cells.filter((cell)=> cell.isOtherSquare);
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
                    this.setBackFunction(sortedCells, i);
                    i = Math.max(i - this.setBackValue -1, -1)
                }
                if(sortedCells) this.sortOptions(sortedCells);
            }
        }
        setBackFunction(arr, i){
            try{
                if(this.setBackCount <= this.maxSetBackCount){
                    const setBack = Math.min(this.setBackValue,  i);
                    const setBackCells = this.completedCells.splice(-setBack,setBack);
                    setBackCells.forEach((cell)=>{
                        cell.value = 0;
                    })
                    setBackCells.forEach((cell)=>{
                        cell.updateDependenciesAfterSetback()
                    })

                    arr.push(...setBackCells);
                    this.setBackCount++
                } else{
                    throw new Error('Max set back number reached!');
                }
            } catch (e){
                console.log(e);
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
            this.shownValue="";
            this.options = [];
            this.originalOptions = [];
            this.isOtherSquare = false;
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
            const options = rawOptions.filter((option)=>!values.includes(option));
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
        updateDependenciesAfterSetback(){
            const dependentCells = this.getDependentCells();
            dependentCells.forEach((cell) => {
                cell.checkOptions();
            })
        }
        getDependentCells(){
            const squareCells = this.square.cells;
            const colCells = this.col.cells;
            const rowCells = this.row.cells;
            const allCells = squareCells.concat(colCells).concat(rowCells);
            const cells = allCells.filter((cell,index, array)=>{
                //last findindex part will filter out any duplicates (since row and col will have some common cells with square)
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
        }
        addCell(cell){
            this.cells.push(cell);
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
    const matrix = new Matrix();
    matrix.createMatrix();

    return {
        array: matrix.getSudokuArray(),
        shownArray: matrix.getShownSudokuArray()
    }
}
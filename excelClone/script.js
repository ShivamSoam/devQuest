let AddRowCont = document.querySelector(".address-row-cont");
let AddColCont = document.querySelector(".address-col-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");



let rows = 100;
let cols = 26;

for(let i = 0;i<rows;i++)
{
    let colDivEle = document.createElement("div");
    colDivEle.setAttribute("class","address-col-ele");
    colDivEle.innerText = i+1;
    AddColCont.appendChild(colDivEle);
}

for(let i = 0;i<cols;i++)
{
    let rowDivEle = document.createElement("div");
    rowDivEle.setAttribute("class","address-row-ele");
    rowDivEle.innerText= String.fromCharCode(i+65);
    AddRowCont.appendChild(rowDivEle);
}

for(let i = 0;i<rows;i++)
{
    let cellRowDiv = document.createElement("div");
    cellRowDiv.setAttribute("class","cell-row") 
    for(let j = 0;j<cols;j++)
    {
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
        cell.setAttribute("rid" , i);
        cell.setAttribute("cid", j);
        cell.setAttribute("spellcheck", "false");
        handleClickEventOnCell(cell,i,j);
        cellRowDiv.appendChild(cell);
    }
    cellsCont.appendChild(cellRowDiv);
}

function handleClickEventOnCell(cell , i ,j)
{
    cell.addEventListener("click",function(e){
        addressBar.value = `${String.fromCharCode(j+65)}${i+1}`
    });
}





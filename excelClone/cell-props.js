//Storage
let sheetsDB = [];
for(let i = 0;i<rows;i++)
{
    let sheetRow = [];
    for(let j = 0;j<cols;j++)
    {
        let cellProp = {
            bold : false,
            italic : false,
            underline:false,
            alignment:"left",
            fontFamily:"Sans-Serrif",
            fontColour:"#000000",
            fontSize:"14",
            BGcolour : "#000000"
        }
        sheetRow.push(cellProp);
    }
    sheetsDB.push(sheetRow);
}

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignments = document.querySelectorAll(".alignment");
let align_Left = alignments[0];
let align_Center = alignments[1];
let align_Right = alignments[2];
let textColour = document.querySelector(".text-colour");
let cellColour = document.querySelector(".cell-colour");
let fontFamily = document.querySelector(".fonts-name");
let fontSize = document.querySelector(".fonts-size");

let activeColorProp = "#A9A9A9";
let inactiveColorProp = "lightgray";

//CLick Event Added on bold option
bold.addEventListener("click",function(e){
    let address = addressBar.value;
    let [cell ,cellProp] =   activeCell(address);
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold?"bold":"normal";
    bold.style.backgroundColor = cellProp.bold?activeColorProp:inactiveColorProp;
})

//Click Event added on italic option

italic.addEventListener("click",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activeCell(address);
    
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic?"italic":"normal";
    italic.style.backgroundColor = cellProp.italic?activeColorProp:inactiveColorProp;
})

//click Event added on text-Underlined Option


underline.addEventListener("click",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activeCell(address);
    
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline?"underline":"none";
    underline.style.backgroundColor = cellProp.underline?activeColorProp:inactiveColorProp;
})

// Change Event on text-size-value option

fontSize.addEventListener("change",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activeCell(address);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize+"px";
    fontSize.value = cellProp.fontSize; 
    //console.log(cellProp);
})

//change event on textFamily option

fontFamily.addEventListener("change",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activeCell(address);

    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
    
})

//Alter Text Colour

textColour.addEventListener("change",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activeCell(address);

    cellProp.fontColour = textColour.value;
    cell.style.color = cellProp.fontColour;
    textColour.value = cellProp.fontColour;
    //console.log("hi");
})

//Alter Cell Colour

cellColour.addEventListener("change",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activeCell(address);

    cellProp.BGcolour = cellColour.value;
    cell.style.backgroundColor = cellProp.BGcolour;
    cellColour.value = cellProp.BGcolour;
})

function activeCell(address)
{
   let [rowid , colid] = fetchRowIDColID(address);
    let cell = document.querySelector(`.cell[rid="${rowid}"][cid="${colid}"]`);
    let cellProp = sheetsDB[rowid][colid] ;
    return [cell,cellProp];
}

function fetchRowIDColID(address)
{
    //a112
    let rowid = address.slice(1)-1;
    let colid = address.charCodeAt(0)-65;
    //console.log(rowid);
    //console.log(colid);
    return [rowid,colid];
}

// Allignment Settlement

for(let i = 0;i<3;i++)
{
    alignments[i].addEventListener("click",function(e)
    {
        let alignVal = e.target.classList[0];
        let address = addressBar.value;
        let [cell,cellProp] = activeCell(address);
        switch (alignVal) {
            case "left":
                cellProp.alignment = alignVal;
                align_Left.style.backgroundColor = activeColorProp;
                align_Right.style.backgroundColor = inactiveColorProp;
                align_Center.style.backgroundColor = inactiveColorProp;
                cell.style.textAlign = alignVal;
                break;

            case "center":
                cellProp.alignment = alignVal;
                align_Left.style.backgroundColor = inactiveColorProp;
                align_Right.style.backgroundColor = inactiveColorProp;
                align_Center.style.backgroundColor = activeColorProp;
                cell.style.textAlign = alignVal;
                break;

            case "right":
                cellProp.alignment = alignVal;
                align_Left.style.backgroundColor = inactiveColorProp;
                align_Right.style.backgroundColor = activeColorProp;
                align_Center.style.backgroundColor = inactiveColorProp;
                cell.style.textAlign = alignVal;
                break;
        }
    })
}

//Resetting every cell to deafault at the start
let cells = document.querySelectorAll(".cell");

for(let i = 0;i<cells.length;i++)
{
    cells[i].addEventListener("click",function(e){
        let address = addressBar.value;
        let [cell ,cellProp] =   activeCell(address);

        cell.style.fontWeight = cellProp.bold?"bold":"normal";
        bold.style.backgroundColor = cellProp.bold?activeColorProp:inactiveColorProp;
        cell.style.fontStyle = cellProp.italic?"italic":"normal";
        italic.style.backgroundColor = cellProp.italic?activeColorProp:inactiveColorProp;
        cell.style.textDecoration = cellProp.underline?"underline":"none";
        underline.style.backgroundColor = cellProp.underline?activeColorProp:inactiveColorProp;
        cellProp.fontSize = fontSize.value;
        cell.style.fontSize = cellProp.fontSize+"px";
        cellProp.fontFamily = fontFamily.value;
        cell.style.fontFamily = cellProp.fontFamily;
        
        cell.style.color = cellProp.fontColour;
        cellProp.fontColour = textColour.value;
        
        cell.style.backgroundColor = cellProp.BGcolour === "#000000"?"transparent":cellProp.BGcolour;
        cellProp.BGcolour = cellColour.value;
        
        let alignVal = cellProp.alignment;

        switch (alignVal) {
            case "left":
                cellProp.alignment = alignVal;
                align_Left.style.backgroundColor = activeColorProp;
                align_Right.style.backgroundColor = inactiveColorProp;
                align_Center.style.backgroundColor = inactiveColorProp;
                cell.style.textAlign = alignVal;
                break;

            case "center":
                cellProp.alignment = alignVal;
                align_Left.style.backgroundColor = inactiveColorProp;
                align_Right.style.backgroundColor = inactiveColorProp;
                align_Center.style.backgroundColor = activeColorProp;
                cell.style.textAlign = alignVal;
                break;

            case "right":
                cellProp.alignment = alignVal;
                align_Left.style.backgroundColor = inactiveColorProp;
                align_Right.style.backgroundColor = activeColorProp;
                align_Center.style.backgroundColor = inactiveColorProp;
                cell.style.textAlign = alignVal;
                break;
        }
    })
}
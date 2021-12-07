const fs = require("fs");
const path = require("path");
let itemType = require("./util");

let baseHomePath = "../Downloads";
let newbasePath;
let folderPath;
//console.log(itemType);

function getFolderName(item)
{
    //console.log(item);
    for(let key in itemType)
    {
        if(itemType[key].includes(item))
        {
            return key;
        }
    }
}

function FolderExists(folderPath)
{
    return fs.existsSync(folderPath);
}


function handleFile(file , folderPath , bPath)
{
    let sourcePath = `${bPath}/${file}`;
    let destPath = `${folderPath}/${file}`;
    console.log(sourcePath,destPath);
    fs.copyFileSync(sourcePath,destPath);
    fs.unlinkSync(sourcePath);
}


function sortFolder(basePath)
{
    let content = fs.readdirSync(basePath);
    //console.log(content);
    for(let i in content)
    {
        //console.log(content[i]);
        
        let isDirectory = fs.lstatSync(`${basePath}/${content[i]}`).isDirectory();
        if(isDirectory)
        {
            newbasePath  = `${basePath}/${content[i]}`;
            sortFolder(newbasePath);
        }
        else
        {
            let extension = path.extname(content[i]);
            let folderName = getFolderName(extension);
            //console.log(folderName);
            
            folderPath = `${basePath}/${folderName}`;

            if(FolderExists(folderPath))
            {

                handleFile(content[i],folderPath,basePath);
            }
            else
            {
                fs.mkdirSync(folderPath);
                handleFile(content[i],folderPath,basePath);
            }
        }
    }
}

sortFolder(baseHomePath);
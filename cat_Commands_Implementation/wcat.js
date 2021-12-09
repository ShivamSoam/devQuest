const fs = require("fs");

let inputData = process.argv.slice(2);

let flags = [];
let files = [];

for (let i in inputData) {
    //console.log(inputData[i]);
    let val = inputData[i];
    if (val.startsWith('-')) {
        flags.push(val);
    }
    else {
        files.push(val);
    }
}

console.log("Flags", flags);
console.log("Files", files);

let filesContent = "";
for (let i in files) {
    filesContent += fs.readFileSync(files[i]);
    filesContent += "\r\n";
}

let filesKaData = filesContent.split("\r\n");
//console.log(filesKaData);

let updated_Data_After_S = [];

if (flags.length == 0) {
    console.log(filesContent);
    return;
}
else {
    let sFlag = false;
    if (flags.includes('-s')) {
        sFlag = true;
        handleSFlag(filesKaData);
    }

    if (sFlag && flags.length == 1) {
        printResult(updated_Data_After_S);
        return;
    }
    if (flags.includes('-b') && flags.includes('-n')) {
        if (flags.indexOf('-b') < flags.indexOf('-n')) {
            if (sFlag) {
                let ans = handleBFlag(updated_Data_After_S);
                printResult(ans);
            }
            else {

                let ans = handleBFlag(filesKaData);
                printResult(ans);
            }
        }
        else {
            if (sFlag) {
                let ans = handleNFlag(updated_Data_After_S);
                printResult(ans);
            }
            else {

                let ans = handleNFlag(filesKaData);
                printResult(ans);
            }

        }
    }
    else {
        if (flags.includes('-b')) {
            if (sFlag) {
                let ans = handleBFlag(updated_Data_After_S);
                printResult(ans);
            }
            else {

                let ans = handleBFlag(filesKaData);
                printResult(ans);
            }
        }
        else if (flags.includes('-n')) {
            if (sFlag) {
                let ans = handleNFlag(updated_Data_After_S);
                printResult(ans);
            }
            else {

                let ans = handleNFlag(filesKaData);
                printResult(ans);
            }
        }
    }
}

function handleSFlag(data) {
    console.log(updated_Data_After_S);
    let emptyPushed = false;
    for (let i = 0; i < data.length; i++) {
        console.log("data[i]: ", data[i]);
        if (data[i] == "" && !emptyPushed) {
            updated_Data_After_S.push(data[i]);
            emptyPushed = true;
        }
        else {
            if (data[i] != "") {
                updated_Data_After_S.push(data[i]);
            }
        }
    }
    console.log(updated_Data_After_S);
}

function handleNFlag(data) {
    for (let i = 1; i < data.length+1; i++) {
        data[i - 1] = `${i} ${data[i - 1]}`;
    }
    return data;
}

function handleBFlag(data) {
    let count = 1;
    for (let i = 0; i < data.length; i++) {
        if (data[i] != "") {
            data[i] = `${count} ${data[i]}`;
            count++;
        }
    }
    return data;
}

function printResult(data) {
    let ans = data.join("\n");
    console.log(ans);
}
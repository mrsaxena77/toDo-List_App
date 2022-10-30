let title = document.querySelector("#title");
let content = document.querySelector("#content");
let select = document.querySelector("select");
let db;
let btn = document.querySelector("#subBtn");


btn.addEventListener("click", function () {
    // if(title.value == "" || content.value == "") {
    //     alert("Fill the content and title");
    //     return;
    // } 

    // else{
    // console.log(select.value);
    let collectionName = select.value;
    // let obj = {};

    // if (collectionName == "placementNotes"){
    //     obj.pId = Date.now();
    // }

    // if (collectionName == "generalNotes"){
    //     obj.gId = Date.now();
    // }

    // if (collectionName == "collegeNotes"){
    //     obj.cId = Date.now();
    // }

    // obj.title = title.value;
    // obj.content = content.value
    // addNotes(collectionName, obj);
// }
    viewNotes(collectionName);
});


let req = indexedDB.open("NotesDB", 3);

req.addEventListener("success", function () {
    db = req.result;
});

req.addEventListener("upgradeneeded", function () {
    db = req.result;
    db.createObjectStore("placementNotes", { keyPath: "pId" });
    db.createObjectStore("generalNotes", { keyPath: "gId" });
    db.createObjectStore("collegeNotes", { keyPath: "cId" });
});

req.addEventListener("error", function () { });

function addNotes(collectionName, obj) {
    if (!db) return;

    let tx = db.transaction(collectionName, "readwrite");
    let reqObjStore = tx.objectStore(collectionName);
    reqObjStore.add(obj);
}

function viewNotes(collectionName) {
    if (!db) {
        return;
    } 
    let tx = db.transaction(collectionName, "readonly");
    let reqObjStore = tx.objectStore(collectionName);
    let cursorReq = reqObjStore.openCursor();

    cursorReq.addEventListener("success", function () {
        let cursor = cursorReq.result;
        if (cursor) {
            console.log(cursor.value);
            cursor.continue();
        }
    });
}

"use strict"
const addNote = document.getElementById("add-new-note");
let id = 2;
addNote.addEventListener('click', event => {
    let newNoteData = document.getElementById("new-note").value;
    if (newNoteData != "") {
        let newNoteTemplate = ` 
                <li class="list-group-item m-1 list-group-item-info rounded" id="${id}">${newNoteData} 
                <button class="btn-primary rounded delete-note" 
                onclick="deleteNote(${id})">-</button>
                </li>`;
        document.getElementById("all-notes").innerHTML += newNoteTemplate;
        id++;
    }
});

function deleteNote(btnId) {
    console.log("note number : " + btnId + " deleted");
    document.getElementById(btnId).remove();
    id--;
}
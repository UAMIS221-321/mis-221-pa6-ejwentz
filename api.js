//const cwid = "12004846";
const cwid = "111111111";
const baseUrl = "https://pa6-backend.herokuapp.com/api/books/"+cwid;
var bookList = [];
var myBook = {};

function populateList(){

    const allBooksApiUrl = baseUrl;
    fetch(allBooksApiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        bookList = json;
        let html = "<select class = \"listBox\" onchange = \"handleOnChange()\" id= \"selectListBox\" name = \"list_box\" size=5 width=\"100%\">";
        json.forEach((book)=>{
            html += "<option value = " + book.id  + ">" + book.title + "</option>";
        })
        html += "</select>";
        document.getElementById("listBox").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}

function putBook(id){
    const putBookApiUrl = baseUrl + "/"+id;
    const sendBook = {
        id: id,
        title: document.getElementById("bookTitle").value,
        author: document.getElementById("bookAuthor").value,
        genre: document.getElementById("bookGenre").value,
        numAvlb: parseInt(document.getElementById("bookAvlb").value),
        isbn: document.getElementById("bookIsbn").value,
        length: parseInt(document.getElementById("bookLength").value),
        cover: document.getElementById("bookCover").value
    }
    fetch(putBookApiUrl, {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(sendBook)
    })
    .then((response)=>{
        myBook = sendBook;
        populateList();
        populateForm();
    });
}

function postBook(){
    const postBookApiUrl = baseUrl;
    const sendBook = {
        title: document.getElementById("bookTitle").value,
        author: document.getElementById("bookAuthor").value,
        genre: document.getElementById("bookGenre").value,
        numAvlb: parseInt(document.getElementById("bookAvlb").value),
        isbn: document.getElementById("bookIsbn").value,
        length: parseInt(document.getElementById("bookLength").value),
        cover: document.getElementById("bookCover").value
    }
    fetch(postBookApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(sendBook)
    })
    .then((response)=>{
        myBook = sendBook;
        populateList();
        blankFields();
    });
}

function deleteBook(){
    const deleteBookApiUrl = baseUrl + "/" + myBook.id;
    fetch(deleteBookApiUrl, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }
    })
    .then((response)=>{
        blankFields();
        populateList();
    });
}
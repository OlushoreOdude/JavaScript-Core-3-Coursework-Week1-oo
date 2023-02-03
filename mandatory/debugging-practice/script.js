let myLibrary = [];

// -- when the window loads use an eventListener to invoke populateStrorage function and render function
window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

//-- myLibrary array takes book objects
//-- if myLibrary array is empty creat 2 new books using
// the Book constructor function and new keyword
// push new books to myLibrary array
// invoke render function
function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book("The Old Man and the Sea", "Ernest Hemingway", "127", true);
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}
//-- link elements in the DOM to variable
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function

//-- function checks if any of the the conditions are falsey
// if non are falsey create and push new Book to the array
// invoke the render function
function submit() {
  if (title.value == null || title.value == "" || pages.value == null || pages.value == "") {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(title.value, author.value, pages.value, check.checked);
    myLibrary.push(book);
    render();
  }
}

//-- constructor function that can creat a book objecect
// with new keyword

//-- cosntructor funciton can be converted into a class

/*
class Book {
  constructor(title, author, pages, check) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.check = check;
  }
}
*/
function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

//-- link the element node with id: display to a variable
//-- store value of the number of table rows in a variable
//--while the number of table rows is greater than 0
// delete table rows with .deleteRow() table method
function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = myLibrary[i].title;
    cell2.innerHTML = myLibrary[i].author;
    cell3.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");
    changeBut.id = i;
    changeBut.className = "btn btn-success";
    cell4.appendChild(changeBut);
    let readStatus = "";
    if (myLibrary[i].check == true) {
      readStatus = "Yes";
    } else {
      readStatus = "No";
    }
    changeBut.innerHTML = readStatus;

    //-- eventListener toggles the value of checked on the
    // book object with the bang (!) operator and invokes the render function to repopulate page
    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    //--delet button = delBut
    let delBut = document.createElement("button");
    delBut.id = i + 5;
    cell5.appendChild(delBut);
    delBut.className = "btn btn-warning";
    delBut.innerHTML = "Delete";
    delBut.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);

      render();
    });
  }
}
//--clicks was missed spelt

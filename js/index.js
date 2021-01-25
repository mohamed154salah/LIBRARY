var firebaseConfig = {
  apiKey: "AIzaSyC3M8PLlDDpjB9Sr_TgffQF99P8qtHh2gA",
  authDomain: "library-4ae27.firebaseapp.com",
  databaseURL: "https://library-4ae27-default-rtdb.firebaseio.com",
  projectId: "library-4ae27",
  storageBucket: "library-4ae27.appspot.com",
  messagingSenderId: "1050811115443",
  appId: "1:1050811115443:web:2002b70f0c7e36e4e44dc6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
window.onload = loading();

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function readdata() {
  let obj;
  var name = document.getElementById("fname").value;
  document.getElementById("fname").value = "";
  var author = document.getElementById("Author").value;
  document.getElementById("Author").value = "";
  var pages = document.getElementById("count").value;
  document.getElementById("count").value = "";
  var is_read = document.getElementById("re").checked;
  document.getElementById("re").value = false;

  obj = {
    id: Date.now(),
    book_title: name,
    book_Author: author,
    book_pages: pages,
    readit: is_read,
  };

  firebase
    .database()
    .ref("books/" + obj.id)
    .set(obj);
  document.getElementById("myForm").style.display = "none";
  window.onload = loading();
}

function loading() {
  var e = document.getElementById("ca");
  e.innerHTML = "";
  var reference = firebase.database().ref("books/");
  reference.on("value", function (snapshot) {
    snapshot.forEach(function (userSnapshot) {
      console.log(userSnapshot.val().book_title);

      var fathercard = document.createElement("div");
      fathercard.classList.add("col-sm-4");

      var card = document.createElement("div");
      card.classList.add("card");
      fathercard.appendChild(card);

      var cardbody = document.createElement("div");
      cardbody.classList.add("card-body");
      cardbody.classList.add("rotate-diagonal-1");
      card.appendChild(cardbody);

      var cardtitle = document.createElement("h5");
      cardtitle.classList.add("card-title");
      cardtitle.innerHTML = "Book Title:  " + userSnapshot.val().book_title;
      cardbody.appendChild(cardtitle);

      var cardtext = document.createElement("p");
      cardtext.classList.add("card-text");
      cardtext.innerHTML =
        "Author: " +
        userSnapshot.val().book_Author +
        "  ,  pages:" +
        userSnapshot.val().book_pages;
      cardbody.appendChild(cardtext);

      var lab = document.createElement("p");
      lab.classList.add("chec");

      lab.innerHTML = "read it     ";

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "name";
      checkbox.checked = userSnapshot.val().readit;
      checkbox.disabled = true;
      lab.appendChild(checkbox);
      cardbody.appendChild(lab);

      var butedit = document.createElement("button");
      butedit.classList.add("btn");
      butedit.classList.add("btn-info");
      butedit.id = userSnapshot.val().id;
      butedit.addEventListener("click", edit);
      butedit.innerHTML = "Edit book";
      cardbody.appendChild(butedit);

      var butdel = document.createElement("button");
      butdel.classList.add("btn");
      butdel.classList.add("btn-danger");
      butdel.id = userSnapshot.val().id;
      butdel.addEventListener("click", del);
      butdel.innerHTML = "Delete book";
      cardbody.appendChild(butdel);

      var row = document.getElementById("ca");
      row.appendChild(fathercard);

      /*   document.getElementById('gmap').innerHTML = userSnapshot.val().book_title;
          document.getElementById('gimg2').innerHTML = userSnapshot.val().book_Author;
          document.getElementById('name').innerHTML = userSnapshot.val().book_pages;
          document.getElementById('name').checked = userSnapshot.val().readit; */
    });
  });
}
var id;
function edit() {
  id = this.id;
  var reference = firebase.database().ref("books/");
  reference.on("value", function (snapshot) {
    snapshot.forEach(function (userSnapshot) {
      if (id == userSnapshot.val().id) {
        let obj = {
          book_title: userSnapshot.val().book_title,
          book_Author: userSnapshot.val().book_Author,
          book_pages: userSnapshot.val().book_pages,
          readit: userSnapshot.val().readit,
        };
        document.getElementById("myorm").style.display = "block";
        document.getElementById("name").value = obj.book_title;
        document.getElementById("uthor").value = obj.book_Author;
        document.getElementById("ount").value = obj.book_pages;
        document.getElementById("ree").checked = obj.readit;
      }
    });
  });
  
}

function upda(){
    let obj;
    var name = document.getElementById("name").value;
    var author = document.getElementById("uthor").value;
    var pages = document.getElementById("ount").value;
    var is_read = document.getElementById("ree").checked;
  
    obj = {
      id: id,
      book_title: name,
      book_Author: author,
      book_pages: pages,
      readit: is_read,
    };
  
    firebase
      .database()
      .ref("books/" + id)
      .update(obj);
      document.getElementById("fname").value = "";
      document.getElementById("Author").value = "";
      document.getElementById("count").value = "";
      document.getElementById("re").value = false;
  
    document.getElementById("myorm").style.display = "none";
    window.onload = loading();
  }

function del() {
  var id = this.id;
  console.log("books/" + id);
  firebase
    .database()
    .ref("books/" + id)
    .remove();
  console.log("hi");
  loading();
}

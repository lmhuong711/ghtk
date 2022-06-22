const emailInput = document.getElementById("emailInput"),
  usernameInput = document.getElementById("usernameInput"),
  fullnameInput = document.getElementById("fullnameInput"),
  birthdayInput = document.getElementById("birthdayInput"),
  input = document.getElementsByTagName('input'),
  save = document.getElementById("save"),
  reset = document.getElementById("reset"),
  tableContent = document.getElementById("table-body");
const urlApi = "http://localhost:3000/user";
const user = {
  id: 0,
  username: null,
  fullname: null,
  email: null,
  birthday: null,
};
const users = []

emailInput.addEventListener('blur', (e) => user.email = e.target.value);
usernameInput.addEventListener('blur', (e) => user.username = e.target.value);
fullnameInput.addEventListener('blur', (e) => user.fullname = e.target.value);
birthdayInput.addEventListener('blur', (e) => user.birthday = e.target.value);

function checkValid() {
  for (let i = 0; i < input.length; i++) {
    if (input[i].value === "") return false;
  }
  return true;
}

save.addEventListener('click', (e) => {
  e.preventDefault();
  if (checkValid()) {
    fetch(urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
  return false;
});

function createEdit(id) {
  var btEdit = document.createElement("button");
  btEdit.innerHTML = "Edit";
  btEdit.setAttribute("class", "btn btn-primary m-1 btn--edit");
  btEdit.setAttribute("id", id);
  btEdit.addEventListener('click', (e) => {
    var td = e.target.parentElement.parentElement.querySelectorAll("td");
    if (e.target.innerHTML === "Edit") {
      e.target.innerHTML = "Save";
      td.forEach((el, id) => {
        if (id > 0 && el.firstChild.value) {
          el.firstChild.readOnly = false;
          el.firstChild.setAttribute("class", "");
        }
        e.target.parentNode.nextSibling.firstChild.innerHTML = 'Cancel';
      });
    } else {
      td.forEach(el => {
        if (el.firstChild.value) {
          el.firstChild.readOnly = true;
          el.firstChild.setAttribute("class", "form-control-plaintext textarea");
        }
      });

      fetch(urlApi + "/" + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          username: td[1].firstChild.value,
          fullname: td[2].firstChild.value,
          email: td[3].firstChild.value,
          birthday: td[4].firstChild.value,
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          e.target.parentNode.nextSibling.firstChild.innerHTML = 'Delete';
          e.target.innerHTML = "Edit";
        })
        .catch(err => console.log(err));
    }
  });
  var bt = document.createElement("td");
  bt.setAttribute("scope", "col");
  bt.appendChild(btEdit);
  return bt;
}

function createDelete(id) {
  var btEdit = document.createElement("button");
  btEdit.innerHTML = "Delete";
  btEdit.setAttribute("class", "btn btn-danger m-1 btn--delete");
  btEdit.setAttribute("id", id);
  btEdit.addEventListener('click', (e) => {
    var td = e.target.parentElement.parentElement.querySelectorAll("td");
    if (e.target.innerHTML === 'Delete')
      fetch(urlApi + "/" + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    else {
      e.target.innerHTML = "Delete";
      td.forEach(el => {
        if (el.firstChild.value) {
          el.firstChild.readOnly = true;
          el.firstChild.setAttribute("class", "form-control-plaintext textarea");
        }
        e.target.parentNode.previousSibling.firstChild.innerHTML = 'Edit';
      });
    }
  });
  var bt = document.createElement("td");
  bt.setAttribute("scope", "col");
  bt.appendChild(btEdit);
  return bt;
}

function renderTable(users) {
  users.map(el => {
    var tr = document.createElement("tr");
    Object.keys(el).map(key => {
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("value", el[key]);
      input.setAttribute("id", key);
      input.readOnly = true;
      input.setAttribute("class", "form-control-plaintext textarea");

      var td = document.createElement("td");
      td.setAttribute("scope", "col");
      td.appendChild(input);

      tr.appendChild(td);
    })
    tr.appendChild(createEdit(el.id));
    tr.appendChild(createDelete(el.id));
    tableContent.appendChild(tr);
  })
}

window.onload = function () {
  fetch(urlApi)
    .then(res => res.json())
    .then(data => {
      data.map(el => users.push(el))
    }).then(() => {
      renderTable(users);
      user.id = users[users.length - 1].id + 1;
    })
    .catch(err => console.log(err));
};
const getFirstName = document.getElementById("first-name");
const getLastName = document.getElementById("last-name");
const getUserName = document.getElementById("user-name");
const getEmail = document.getElementById("email");
const getPassword = document.getElementById("password");
const getConfirmPassword = document.getElementById("password-confirmation");

const errFirstName = document.getElementById("0001");
const errLastName = document.getElementById("0002");
const errUserName = document.getElementById("0003");
const errUserNameBlank = document.getElementById("0004");
const errEmail = document.getElementById("0005");
const errPassword = document.getElementById("0009");
const errConfirmPassword = document.getElementById("0008");

const checkPass = document.getElementById("0006");
const checkCfPass = document.getElementById("0007");

const reGexName = /^[a-zA-Z '.]*$/;
const reGexUserName = /^[a-zA-Z0-9._]{6,20}$/;
const reGexMail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function setErr(err, self) {
  err.style.display = "block";
  self.style.borderColor = "red";
}

function removeErr(err, self) {
  err.style.display = "none";
  self.style.borderColor = "#bbb";
}

getFirstName.addEventListener("blur", () => {
  getFirstName.value != "" && reGexName.test(getFirstName.value) ? removeErr(errFirstName, getFirstName) : setErr(errFirstName, getFirstName);
});

getLastName.addEventListener("blur", () => {
  getLastName.value != "" && reGexName.test(getLastName.value) ? removeErr(errLastName, getLastName) : setErr(errLastName, getLastName);
});

getUserName.addEventListener("blur", () => {
  getUserName.value != "" && reGexUserName.test(getUserName.value) ? removeErr(errUserName, getUserName) : setErr(errUserName, getUserName);
});

getEmail.addEventListener("blur", () => {
  getEmail.value != "" && reGexMail.test(getEmail.value) ? removeErr(errEmail, getEmail) : setErr(errEmail, getEmail);
});

getPassword.addEventListener("blur", () => {
  getPassword.value.trim() != "" ? removeErr(errPassword, getPassword) : setErr(errPassword, getPassword);
});

getConfirmPassword.addEventListener("blur", () => {
  getConfirmPassword.value.trim() != "" && getConfirmPassword.value.trim() == getPassword.value.trim() ?
    removeErr(errConfirmPassword, getConfirmPassword)
    : setErr(errConfirmPassword, getConfirmPassword);
});


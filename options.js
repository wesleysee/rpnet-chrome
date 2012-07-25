var usernameTextbox;
var passwordTextbox;
var saveButton;

function init() {
  usernameTextbox = document.getElementById("username");
  passwordTextbox = document.getElementById("password");
  saveButton = document.getElementById("save-button");

  usernameTextbox.value = localStorage.getItem("rpnet_username") || "";
  passwordTextbox.value = localStorage.getItem("rpnet_password") || "";
}

function save() {
  localStorage.setItem("rpnet_username", usernameTextbox.value);
  localStorage.setItem("rpnet_password", passwordTextbox.value);
  
  //chrome.extension.getBackgroundPage().init();
}

document.addEventListener('DOMContentLoaded', function () {
  init();
  document.querySelector('#cancel-button').addEventListener('click', init);
  document.querySelector('#save-button').addEventListener('click', save);
});

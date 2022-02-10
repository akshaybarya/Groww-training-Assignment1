"use strict";

function CustomAlert() {
  this.render = function (message, focus) {
    let win_h = window.innerHeight;

    const dialogoverlay = document.getElementById("dialogoverlay");
    const dialogbox = document.getElementById("dialogbox");

    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = win_h + "px";
    dialogbox.style.display = "flex";

    document.getElementById("dialogboxbody").innerHTML = message;

    document.getElementById("dialogbox").onclick = (e) => {
      e.stopPropagation();
    };
    document.getElementById("dialogoverlay").onclick = (e) =>
      Alert.setFocus(focus);
    document.getElementById("dialogboxfootbutton").onclick = (e) =>
      Alert.setFocus(focus);
  };

  this.setFocus = function (focus) {
    const dialogoverlay = document.getElementById("dialogoverlay");
    const dialogbox = document.getElementById("dialogbox");

    document.getElementById(focus).focus();

    dialogoverlay.style.display = "none";
    dialogbox.style.display = "none";
  };
}

const Alert = new CustomAlert();

document.addEventListener("submit", function (e) {
  e.preventDefault();
  const errors = [];

  const fname = document.getElementById("first-name").value;
  if (fname.indexOf(" ") >= 0) {
    errors.push("first-name");
  }

  const lname = document.getElementById("last-name").value;
  if (lname.indexOf(" ") >= 0) {
    errors.push("last-name");
  }

  if (
    !document.querySelector('input[name="gender"]:checked') ||
    document.querySelector('input[name="gender"]:checked').length <= 0
  ) {
    errors.push("gender");
  }

  // const gender = document.querySelector('input[name="gender"]:checked').value;

  let maretialStatus;
  if (
    !document.querySelector('input[name="maretial-status"]:checked') ||
    document.querySelector('input[name="maretial-status"]:checked').length <= 0
  ) {
    errors.push("maretial-status");
  } else {
    maretialStatus = document.querySelector(
      'input[name="maretial-status"]:checked'
    ).value;
  }
  if (maretialStatus === "married") {
    const spouce = document.getElementById("spouse-name").value;
    if (spouce.indexOf(" ") >= 0) {
      errors.push("spouse-name");
    }
  }

  if (
    !document.querySelector('input[name="check-box"]:checked') ||
    document.querySelector('input[name="check-box"]:checked').length <= 0
  ) {
    errors.push("check-box");
  }

  if (errors.length === 0) sucess();
  else dispatchErrors(errors);
});

function dispatchErrors(errors) {
  let message = "";

  for (let error of errors) {
    switch (error) {
      case "first-name": {
        message = message + "Please Enter First Name without white Spaces.";
        break;
      }
      case "last-name": {
        message = message + "Please Enter Last Name without white Spaces.";
        break;
      }
      case "gender": {
        message = message + "Please select a gender.";
        break;
      }
      case "maretial-status": {
        message = message + "Please select your Maretial status.";
        break;
      }
      case "spouse-name": {
        message = message + "Please Enter Spouse Name without white Spaces.";
        break;
      }
      case "check-box": {
        message = message + "Please Accept terms & conditions.";
        break;
      }
      default:
        break;
    }
    message = message + "<br>";
  }

  Alert.render(message, errors[0]);
}

function sucess() {
  const table = document.getElementById("table");
  const thankYou = document.getElementById("thank-you");
  table.style.display = "none";
  thankYou.style.display = "block";
}

function alterMaretialStatus(enable) {
  const spouce = document.getElementById("spouse-row");
  const spouceField = document.getElementById("spouse-name");

  if (enable === true) {
    spouce.style.display = "table-row";
    spouceField.required = true;
  } else {
    spouce.style.display = "none";
    spouceField.required = false;
  }
}

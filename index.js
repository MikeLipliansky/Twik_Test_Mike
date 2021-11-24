// Varieble definition
const bubble = document.querySelector(".bubble"); // bubble panel
const infoPanel = document.querySelector(".info-panel"); // information panel
const contPanel = document.querySelector(".cont-panel"); // contact us panel
const errorBox = document.getElementById("error-message"); // error box with the message
const subPanel = document.querySelector(".submission-panel"); // thank you (submission) pane
let checkSubmission = false; // check is the submission is valid
let text = "";
// the form variebles
let form = document.querySelector("form");
let data = new FormData(form);

// count the images
let imgCount = document.getElementsByTagName("img").length;
// link the image counter whith html ( -5 images that in program use )
document.getElementById("image-counter").innerHTML = imgCount - 5;

// count the fixed elements
let fixedCount = 0; // counter gor fixed elements
let elements = document.getElementsByTagName("*"); // elements array
// go through the elements
for (var i = 0; i < elements.length; i++) {
  if (
    // if find element with fixed position
    window.getComputedStyle(elements[i], null).getPropertyValue("position") ==
    "fixed"
  ) {
    fixedCount++; // counter +1
  }
}
// link the fixed element counter whith html ( -4 fixed elements that in program use )
document.getElementById("fixed-counter").innerHTML = fixedCount - 4;

// refresh button for the info modal
function refreshPage() {
  window.location.reload();
}

// close the panels by click on the screen
document.addEventListener(
  "click",
  function (event) {
    console.log(event.target.className);
    if (event.target.className === "main-container") {
      // close the info panel
      infoPanel.style.display = "none";
      // close the contact panel
      contPanel.style.display = "none";
      // reset the data and the error message from the info panel
      document.getElementById("email").value = "";
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
      document.getElementById("error-message").value = "";
      errorBox.style.display = "none";
      // close the submission panel
      subPanel.style.display = "none";
      // show the bubble
      bubble.style.display = "block";
    }
  },
  false
);

// show info modal and hide bubble
function openInfoModal() {
  bubble.style.display = "none";
  infoPanel.style.display = "block";
}

// hide info modal and show bubble
function closeInfoModal() {
  infoPanel.style.display = "none";
  bubble.style.display = "block";
}

// hide info modal and show contant modal
function openContModal() {
  infoPanel.style.display = "none";
  contPanel.style.display = "block";
}

// hide contant modal and show bubble
function closeContModal() {
  contPanel.style.display = "none";
  bubble.style.display = "block";
  // reset the data and the error messag
  document.getElementById("email").value = "";
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
  document.getElementById("error-message").value = "";
  errorBox.style.display = "none";
}

// back from contant modal to info modal (without reseting the data and the error)
function BackToInfoModal() {
  contPanel.style.display = "none";
  infoPanel.style.display = "block";
}

// close submission message and show bubble
function closeSubmissionModal() {
  subPanel.style.display = "none";
  bubble.style.display = "block";
  // reset the data and the error message
  document.getElementById("email").value = "";
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
  document.getElementById("error-message").value = "";
  errorBox.style.display = "none";
}

// validation function
function validation(event) {
  event.preventDefault();
  // variebles definition
  let email = document.getElementById("email").value; // email
  let name = document.getElementById("name").value; // name
  let message = document.getElementById("message").value; // message
  let errorMessage = document.getElementById("error-message"); // error message
  errorMessage.style.padding = "10px"; // error message padding to use when show

  //  validation constrains
  // email validation
  // constrains
  if (email < 6 || email.indexOf("@") == -1) {
    errorMessage.style.display = "block"; // error bar
    text = "Invalid Email"; // error message
    errorMessage.innerHTML = text;
    return false;
  }

  // name validation
  // constrains
  if (!name) {
    errorMessage.style.display = "block"; // error bar
    text = "Invalid Name"; // error message
    errorMessage.innerHTML = text;
    return false;
  }

  checkSubmission = true; // if the data is valid so the check is true
  // if the check is true
  if (checkSubmission) {
    contPanel.style.display = "none"; // hide the contact us panel
    subPanel.style.display = "block"; // show the submission panel
    handleSheets(); // submit to google sheets
  }

  // interation with google sheets
}
const handleSheets = () => {
  // google sheets document URL
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxJ-CUbsmc9I6AALDXjdNqhaNGFJc6t6z8QZjoikyAEstwlB5EGuiFgT_tWLeSyqcYxtA/exec";
  // the function return
  return (
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(
        // response for submission validation
        (response) => console.log(response, "response"),
        // success
        $("#form_alerts").html(
          "<div class='alert alert-success'>Contact message sent successfully.</div>"
        )
      )
      // failure
      .catch((error) =>
        $("#form_alerts").html(
          "<div class='alert alert-danger'>Contact message not sent.</div>"
        )
      )
  );
};

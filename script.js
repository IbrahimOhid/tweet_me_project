(() => {
  // selector
const filterSearchElm = document.querySelector("#filterSearch");
const inputTextElm = document.querySelector("#inputText");
const incrementElm = document.querySelector("#increment");
const decrementElm = document.querySelector("#decrement");
const msgElm = document.querySelector("#msg");
const formElm = document.querySelector("form");
const divElm = document.querySelector(".divElm");

let allInput = [];
// date input value
function addToInputValue(inputText) {
  const inputValue = {
    date: generateDate(),
    id: allInput.length + 1,
    inputText,
  };
  allInput.push(inputValue);
  return inputValue;
}
// generate date
function generateDate() {
  const date = new Date();
  const time = dateFns.format(new Date(date), "D MMM, YY - h:mm a");
  return time;
}

let incrementValue = 0;
let decrementValue = 30;

incrementElm.innerHTML = incrementValue;
decrementElm.innerHTML = decrementValue;
// clear msg
function clearMsg() {
  msgElm.textContent = "";
}
// show message
function showMessage(msg, action = "success") {
  const textMsg = `<div class="alert alert-${action}" role="alert">
  ${msg}
</div>`;
  msgElm.insertAdjacentHTML("afterbegin", textMsg);
  setTimeout(() => {
    clearMsg();
  }, 2000);
}
// get input
function getInput() {
  const inputTextValue = inputTextElm.value;
  return inputTextValue;
}
// input reset in ui
function resetInput() {
  inputTextElm.value = "";
}
// input validation
function inputValidation() {
  let isValid = true;
  if (inputTextElm.value === "") {
    isValid = false;
    showMessage("Please Provide Necessary info", "danger");
  }
  return isValid;
}
// show input text ui
function showInputTextToUi(textInfo) {
  const { id, inputText, date } = textInfo;
  let divElement = ` <div
              class="d-flex flex-row justify-content-between mb-3 align-items-center"
              style="background-color: #dff9fb; padding: 6px 7px" data-id=${id}
            >
              <div>
                <p class="fw-bold">${inputText}</p>
                
                <div class="d-flex gap-2">
                    <span style="background-color: #22a6b3; padding: 0 10px; border-radius: 3px; color: white " >${date}</span>
                  <span style="cursor: pointer"
                    ><i class="bi bi-pencil-square text-success"></i
                  ></span>
                  <span style="cursor: pointer"
                    ><i class="bi bi-trash3 text-danger deleteBtn"></i
                  ></span>
                </div>
              </div>
            </div> `;
  divElm.insertAdjacentHTML("afterbegin", divElement);
  showMessage("Tweet Added Successfully");
}

//  handel Submit Form
function handleSubmitForm(e) {
  e.preventDefault();
  const inputText = getInput();
  const isValid = inputValidation(inputText);
  resetInput();
  if (!isValid) return;
  const inputValue = addToInputValue(inputText);
  showInputTextToUi(inputValue);

  let incrementValue = 0;
  let decrementValue = 30;
  incrementElm.innerHTML = incrementValue;
  decrementElm.innerHTML = decrementValue;
}
// select parent element
function getParentElmId(e) {
  const newDivElm =
    e.target.parentElement.parentElement.parentElement.parentElement;
  const id = Number(newDivElm.getAttribute("data-id"));
  return id;
}
// remove input text
function removeInputText(id) {
  allInput = allInput.filter((inputValue) => inputValue.id !== id);
}
// delete input ui
function deleteInputValueUi(id) {
  document.querySelector(`[data-id = '${id}']`).remove();
  showMessage("Tweet Removed Successfully", "warning");
}

// handel Ui
function handleManipulateUi(e) {
  if (e.target.classList.contains("deleteBtn")) {
    const id = getParentElmId(e);
    removeInputText(id);
    deleteInputValueUi(id);
  }
}
// word count
function numberManipulate() {
  let inputValue = inputTextElm.value.length + 1;
  incrementElm.innerHTML = inputValue;
  decrementElm.innerHTML = --decrementValue;
  if (inputValue >= 30) {
    inputTextElm.setAttribute("disabled", "disabled");
  }
}



function init() {
  // Event listeners
  formElm.addEventListener("submit", handleSubmitForm);
  divElm.addEventListener("click", handleManipulateUi);
  inputTextElm.addEventListener("keydown", numberManipulate);
}
init();
})();

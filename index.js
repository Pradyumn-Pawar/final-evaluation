const form = document.getElementById("form");
const popForm = document.getElementById("pop-form");
let selectedRow = null;
const deletedIds = [];
const uniqueIds = [];
let prebvId;
var arr = [];
// // what is click /submit and e=>
// form.addEventListener('submit',e=>{
//     // prevent default learn
//     // do dom assign id to tag automatic
//     e.preventDefault();
// //    let formData = readData()
// //    addEmployeeRecord(formData)
// //     // if(!isIdDeleted(formData.emp_id)){
// //     //     updateEmployeeRecord(formData)
// //     // }

//     console.log(employeeList)
// });

function onFormSubmit() {
  // event.preventDefault()
  let formData = readData();

  if (validatedForm(formData)) {
    console.log(uniqueIds.includes(formData.emp_id))
    addEmployeeRecord(formData);
    resetForm()
    
  }
}

function onUpdate() {
  // event.preventDefault()
  let formData = readPopData();
  if (validatedPopForm(formData)) {
   
    uniqueIds.pop(prebvId)
    uniqueIds.push(formData.emp_id)
    console.log("wi")
    console.log(uniqueIds)
    updateEmployeeRecord(formData);
    closePopForm()
    console.log(" updated");
  }
}

function readData() {
  const formData = {};
  formData["emp_id"] = document.getElementById("emp_id").value;
  formData["emp_name"] = document.getElementById("emp_name").value;
  formData["emp_age"] = document.getElementById("emp_age").value;
  formData["emp_gender"] = document.getElementById("emp_gender").value;
  return formData;
}

function readPopData() {
  const formData = {};
  formData["emp_id"] = document.getElementById("pop_emp_id").value;
  formData["emp_name"] = document.getElementById("pop_emp_name").value;
  formData["emp_age"] = document.getElementById("pop_emp_age").value;
  formData["emp_gender"] = document.getElementById("pop_emp_gender").value;
  return formData;
}

function addEmployeeRecord(formData) {
  //Test
  
  uniqueIds.push(formData.emp_id);

  let tableData = "";
  tableData = `
    <td>${formData.emp_id} </td>
    <td>${formData.emp_name} </td>
    <td>${formData.emp_age} </td>
    <td>${formData.emp_gender} </td>
   <td><button onclick='openPopForm()'>Edit</button> <button onclick='deleteEmployeeRecord()'> Delete</button></td>`;

  var x = document.getElementById("dataTable").getElementsByTagName("tbody")[0];

  var newRow = x.insertRow(x.length);

  newRow.innerHTML = tableData;
  console.log(uniqueIds);
}

function editEmployeeRecord() {
  selectedRow = event.target.parentElement.parentElement;
  prebvId = selectedRow.cells[0].innerHTML;
  document.getElementById("pop_emp_id").value = Number(
    selectedRow.cells[0].innerHTML
  );
  document.getElementById("pop_emp_name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("pop_emp_age").value = Number(
    selectedRow.cells[2].innerHTML
  );

//to set the selected gender in dropdown
  let select = document.getElementById('pop_emp_gender');
let option;

for (var i=0; i<select.options.length; i++) {
  option = select.options[i];

  if (option.value == selectedRow.cells[3].innerHTML.toString().trim() ) {

     option.selected = true;
     return;
  } 
}

}




function deleteEmployeeRecord(){
    selectedRow = event.target.parentElement.parentElement;
    let id =selectedRow.cells[0].innerHTML.trim()

    deletedIds.push(id)
    uniqueIds.pop(id)
    
    console.log(deletedIds)
    document.getElementById("dataTable").deleteRow(selectedRow.rowIndex)
    
}

function updateEmployeeRecord(formData) {
  
  selectedRow.cells[0].innerHTML = formData.emp_id;
  selectedRow.cells[1].innerHTML = formData.emp_name;
  selectedRow.cells[2].innerHTML = formData.emp_age;
  selectedRow.cells[3].innerHTML = formData.emp_gender;
}

function validatedForm(formData) {
//   let formData = readData();
  let emp_id = formData.emp_id;
  let emp_age = Number(formData.emp_age);
  let emp_name = formData.emp_name;
  let isValid = true;

  var empIdError = document.getElementById("form_id_error");

  //Validate Emp Id
 
 
  if (isIdDeleted(emp_id)) {
    document.getElementById("form_id_error").innerText="This Id can not be use"

    console.log("emp_id not unique");
    isValid = false;
  }else{
    document.getElementById("form_id_error").innerText=""

  }

  // validation for emp_id
  if (!isIdUnique(emp_id)) {
    document.getElementById("form_id_error").innerHTML="Id already in use"

    isValid = false;
  }else{
    document.getElementById("form_id_error").innerHTML=""

  }

  if(!isNameValid(emp_name)){
    document.getElementById("form_name_error").innerHTML="Name can only contains alphabets"
    isValid =false
  }else{
    document.getElementById("form_name_error").innerHTML=""
  }



  if (!inRange(emp_age)) {
    console.log("age not range");
    document.getElementById("form_age_error").innerHTML="age should be in between 18-60"

    isValid = false;
  }else{
    document.getElementById("form_age_error").innerHTML=""

  }

  
  if(emp_gender.value==""){
    document.getElementById("form_gender_error").innerHTML="Select gender"
    isValid=false
  }else{
    document.getElementById("form_gender_error").innerHTML=""
  }

  return isValid;
}

function validatedPopForm(formData) {
  //   let formData = readData();
    let emp_id = formData.emp_id;
    let emp_age = Number(formData.emp_age);
    let emp_name = formData.emp_name;
    let emp_gender = formData.emp_gender;
    let isValid = true;
  
    //Validate Emp Id

   
    if (isIdDeleted(emp_id)) {
      
      document.getElementById("pop_id_error").innerHTML="This Id cannot be used"
      isValid = false;
    }else{
      document.getElementById("pop_id_error").innerHTML=""
  
    }
  
    // validation for emp_id
    if (!isIdUnique(emp_id)) {
      document.getElementById("pop_id_error").innerHTML="Id already in use"
  
      console.log("emp_id not unique");
      isValid = false;
    }else{
      document.getElementById("pop_id_error").innerHTML=""
  
    }
  
    if(!isNameValid(emp_name)){
      document.getElementById("pop_name_error").innerHTML="Name can only contains alphabets"
      isValid =false
    }else{
      document.getElementById("pop_name_error").innerHTML=""
    }
  
  
  
    if (!inRange(emp_age)) {
      console.log("age not range");
      document.getElementById("pop_age_error").innerHTML="age should be in between 18-60"
  
      isValid = false;
    }else{
      document.getElementById("pop_age_error").innerHTML=""
  
    }

    if(emp_gender.value==""){
      document.getElementById("pop_gender_error").innerHTML="Select gender"
      isValid=false
    }

  
    return isValid;
  }

function inRange(emp_age) {
  return emp_age >= 18 && emp_age <= 60;
}

function isNameValid(emp_name){

 return /^[A-Za-z\s]+$/.test(emp_name)  

}

function isIdUnique(emp_id) {
  if (Number(prebvId) != emp_id) {
    // console.log("not same")
    // if(!uniqueIds.includes(emp_id)){
    //     console.log("unique")
    // }else{
    //     console.log("not unique")
    // }

    return !uniqueIds.includes(emp_id);
  }
  //else{
  //     console.log("same")
  // }
  return true;
}

function isIdDeleted(emp_id) {
 
  
  return deletedIds.includes(emp_id);
}

function resetForm() {
    document.getElementById("form").reset()
}

function openPopForm(){
  document.getElementsByClassName("popup-box")[0].style.display="block"
  editEmployeeRecord()  
  
}
function closePopForm(){
  document.getElementsByClassName("popup-box")[0].style.display="none"
}
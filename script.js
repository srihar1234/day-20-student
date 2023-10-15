console.log("working good");
const studentList = document.getElementById("student-list");
const API = "https://6523738ff43b179384156ca1.mockapi.io/students";
const studentForm = document.querySelector("#student-form");
let editId;

//creating form
studentForm.innerHTML += `
<form class="form-data">
   <h2 class="head">STUDENT FORM</h2>
   <input type="text" name="name" value="" placeholder="Student Name" class="input-text" id="input-name" required>
   <input type="text" name="batch" value="" placeholder="Student Batch" class="input-text" id="input-batch" required>
   <input type="text" name="age" value="" placeholder="Student Age" class="input-text" id="input-age" required>
   <button class="btn" id="add-btn" type="submit">Add students</button>
   <button class="btn" id="update-btn" type="submit">Update students</button>
</form>`;
const addButton = document.getElementById("add-btn");
const updateButton = document.getElementById("update-btn");
updateButton.style.display = "none";

//add students button working
const inputName = document.getElementById("input-name");
const inputBatch = document.getElementById("input-batch");
const inputAge = document.getElementById("input-age");
studentForm.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.id == "add-btn"){
        const newStudent = {
            name:inputName.value,
            batch:inputBatch.value,
            age:inputAge.value
        };
        //POST method
        fetch(API,{
            method:"POST",
            body: JSON.stringify(newStudent),
            headers:{
                "Content-Type":"application/json"
            },
        })
        .then((res)=>res.json())
        .then((datum)=>renderStudents(datum))
        .then(()=>{
            inputAge.value = "";
            inputBatch.value = "";
            inputName.value = "";
        })
        .catch((err)=>console.log(err))
    }
    if(e.target.id == "update-btn"){
        const updateStudent = {
            name:inputName.value,
            batch:inputBatch.value,
            age:inputAge.value
        };
        fetch(`${API}/${editId}`,{
            method:"PUT",
            body: JSON.stringify(updateStudent),
            headers:{
                "Content-Type":"application/json"
            },
        })
        .then((res)=>res.json())
        .then(()=>location.reload())
        .catch((err)=>console.log(err))
    }
});


//WE CREATED API THROUGH MOCK-API AND GOT ITS LINK(IN LINK,U SHOULD GIVE ENDPOINT)
//read the api[GET METHOD]
async function fetchApi(){
    let response = await fetch("https://6523738ff43b179384156ca1.mockapi.io/students",{method:"GET"});
    console.log(response);
    let data = await response.json();
    console.log(data);
    createCards(data);   
}
fetchApi();


//delete method
function deleteData(id,parent){
    fetch(`${API}/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
    })
    .then(()=>parent.parentNode.remove())
    .catch((err)=>{console.log(err)});
}


//FUNCTION TO LOOP THROUGH OBJECT
function createCards(data){
    data.forEach((v,i,a)=>{
        renderStudents(data[i]);
    })
}


//FUNCTION TO UI CONTENTS 
function renderStudents(stud){
    const studentDiv = document.createElement("div");
    studentDiv.className = "card";
    studentDiv.innerHTML +=
    `<h2>${stud.name}</h2>
     <p><span>Batch:</span><span id="batch-val">${stud.batch}</span></p> 
     <p><span>Age:</span><span id="age-val">${stud.age}</span></p>
     <div class="button-grp">
     <button data-id=${stud.id} id="del-btn" class="btn">Delete</button>
     <button data-id=${stud.id} id="edit-btn" class="btn">Edit</button>
     </div>`
     studentList.append(studentDiv);
}


//USED BEFORE MOCK-API OBJECT DATA
const sampleObject = {
    name:"Hari",
    age:"21",
    batch:"B51WD",
};

//function to delete,update buttons
studentList.addEventListener("click",(event)=>{
       const id = event.target.dataset.id;
       const parent = event.target.parentNode;
    if (event.target.id ==="del-btn"){       
       deleteData(id,parent);
    }
    if (event.target.id === "edit-btn"){
        const editableParent = parent.parentNode;
        inputName.value = editableParent.querySelector("h2").textContent;
        inputBatch.value = editableParent.querySelector("#batch-val").textContent;
        inputAge.value = editableParent.querySelector("#age-val").textContent;
        updateButton.style.display = "block";
        addButton.style.display = "none";
        editId = id;
    }
});



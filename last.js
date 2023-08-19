// hold the variables with the class name
let input = document.querySelector(".add-task input");
let addbtn = document.querySelector(".add-task .plus");
let taskscontainer = document.querySelector(".tasks-content");
let taskcount = document.querySelector(".tasks-count span");
let taskcompleted = document.querySelector(".tasks-completed span");
let todocontainer = document.querySelector(".todo-container");
//----------------------------------------------
let AraayOfTasks = [];
//check if thers data in local storage
if(localStorage.getItem("taskat")){
    AraayOfTasks = JSON.parse(localStorage.getItem("taskat"));
}

getData();
//-----------------add button-------------
addbtn.onclick = function(){
    if(input.value !== ""){
        addTaskToArray(input.value); // function
        clearinput();

    }
    else{
         function1();
        
    }
}
function function1() { 
	swal("Add Task!");}

function clearinput(){
    input.value ="";
    input.focus();
}
function addTaskToArray(taskText){
    //task data
    const task = {
        title:taskText,


    };
    //push task to array of tasks 
    AraayOfTasks.push(task);

    //Add Tasks to Page
    AddElemnts(AraayOfTasks);

    //add tasks to local storage
    insterToLocalStorage(AraayOfTasks);

}
function AddElemnts(AraayOfTasks){
    taskscontainer.innerHTML="";
    //looping on array
    AraayOfTasks.forEach((task) => {
        let mainspan = document.createElement("span");
        
        //----------------------------create the buttons---------------------
        let deletebtn = document.createElement("span");//create deletebtn

        let completebtn = document.createElement("span");//create completebtn 

        let editbtn = document.createElement("span");//create editbtn
        //******************************************** */

        let text = document.createTextNode(input.value);//create the task text and set its value

        let deletetext = document.createTextNode("Delete");//create the delettext

        let completetext = document.createTextNode("Complete");//create the completetext

        let EditeText = document.createTextNode("Edit");//create the EditeText
        //--------------- add them to the thier root-nodes---------------------

        mainspan.appendChild(document.createTextNode(task.title));
//------------------adding classes to the items --------------------------
        mainspan.className="task-box";//calss to mainspan
        deletebtn.className="deletee";//calss to delete button
        completebtn.className="complete";//calss to complete button
        editbtn.className="Edit";//calss to edit
        //--------------------appending the texts to their buttons ---------------
        deletebtn.appendChild(deletetext); //append text to delete button

        completebtn.appendChild(completetext);//append text to complete button

        editbtn.appendChild(EditeText);//append text to edit button


//--------------------add the buttons to the main span-----------------------
        mainspan.appendChild(deletebtn);
        mainspan.appendChild(completebtn);
        mainspan.appendChild(editbtn);
//-------------------add main span to taskcontainer------------------

        taskscontainer.appendChild(mainspan);
        
// create eventlistner to complete button
completebtn.addEventListener('click', ()=>{
    if(completebtn.innerText.toLocaleLowerCase()=="complete"){
        mainspan.setAttribute("id","finished");
        mainspan.style.textDecoration="line-through";
        completebtn.innerText = 'Incompleted';}
        else{
            mainspan.setAttribute("id","");
            mainspan.style.textDecoration="none";
            completebtn.innerText = 'Complete';
        }
        calcTasks();
});
//-------------------------------------------------------------------------------

// create eventlistner to edit button
editbtn.addEventListener('click', ()=>{
    
    if (editbtn.innerText.toLowerCase() =="edit") {
            text=prompt("enter what do you want to change?");
            editbtn.innerText = "Save";
            mainspan.innerText = text;
            mainspan.appendChild(deletebtn);
            mainspan.appendChild(completebtn);
            mainspan.appendChild(editbtn);

    }else{
        editbtn.innerText ="Edit";
    }
    calcTasks();
});
        
    });
}
//local storage method
function insterToLocalStorage(AraayOfTasks){
    window.localStorage.setItem("taskat",JSON.stringify(AraayOfTasks));
}
function getData(){
    let data = window.localStorage.getItem("taskat");
    if(data){
        let taskat = JSON.parse(data);
        AddElemnts(taskat)
    }
    

}

//------------- function to create no tasks msg-------------

function createNoTasks(){
    //create msg span element
    let msgspan = document.createElement("span");
    //create the text msg
    let msgText = document.createTextNode("No Tasks To Show");
    //add the text 
    msgspan.appendChild(msgText);
    //add class
    msgspan.className = "no-tasks-message";
    //add it again to the container
    taskscontainer.appendChild(msgspan);
    
}
//--------------------------------------------------
//---------------------delet method-------------------------------
document.addEventListener('click',function(e){
    //delete task
    if (e.target.className == 'deletee'){
        e.target.parentNode.remove();

        // check number of tasks
        if(taskscontainer.childElementCount == 0){
            createNoTasks();
            localStorage.clear();
        }
    }
    calcTasks();

})

//----------------------function to calcluate tasks---------------
function calcTasks(){
    //calc all the tasks
    taskcount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length;

    //calc completed the tasks
    taskcompleted.innerHTML = document.querySelectorAll(".tasks-content #finished").length;
    if(taskcount.value == 0){
        localStorage.getItem("taskat")=""
    }
}
//-----------------------------------------------------------------------------------
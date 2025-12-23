//1. Make AdminLogin Btn work

const ControlOfAdminSection = document.getElementById("admin-login");
const controlOfUserMessagesSection = document.getElementById("user-messages");

//Global scope.
function showAdminSection() {
  
  //block scope
  ControlOfAdminSection.style.display = "block";
}

//2.Make you Admin logic active
//Important CONCEPT - WHAT IS SCOPE of variables?
// Accessibility of variables 


document.getElementById("admin-form").addEventListener('submit', function(event){
  event.preventDefault();
  
  const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
  
//console.log(username);
//console.log(password);
  
  const storedUsername = "admin";
  const storedPassword = "password";
  
  if (username == storedUsername  &&  password == storedPassword){
  /* int or string == TRUE [1 = "1"]
  Double equal sign is only concerned with the value,
  but triple equal sign will care about the data type as well.
  int or string === FALSE [1.0 = "1"]
    //LOGIC GATES?
   */
    //alert, confirm and prompt - 
    //only display a message and dont need response - alert
    //When you want ok or confirm from the user - confirm
    //when you want input from the user - prompt.
    
    alert("Welcome, login was successful!");
    ControlOfAdminSection.style.display = "none";
    
    controlOfUserMessagesSection.style.display = "block";
    
    //call the function to display user messages
    displayStoredMessages();
    
  }
  else{
    alert("Oops, login was Un-successful! Please try again");
  }
});

//3. Make your Contact me Section store user responses.
//creating an event listener for the contact me form
document.getElementById("contact-me-form").addEventListener('submit', function(event){
  event.preventDefault();
  const name = document.getElementById("your-name").value;
const email = document.getElementById("your-email").value;
  const message = document.getElementById("your-msg").value;
  
  const response = { name, email, message, date: new Date().toISOString()};
  //console.log(new Date())
  
  //Store these values in the local Database - LocalStorage
  
  //JSON?
  // It is a format that is widely and extensively used in APIs/ For backend and frontend communication
  
  //You need to prepare a format that you will send from the frontend to the backend
  //Why?
  //So that you have consistency in the data for all the responses.
  // Date() will give you a datetime DATATYPE, to convert that into a string we use toISOString()
  
  console.log(response)
  //Create a reference to your DUMMY DATABASE
  //What will your DummyDatbase actually be?
  //It will be a LIST stored on CHROME's LocalStorage. [Cache]

  //When you run the program for the first time, Dummydatabase will be created as an empty LIST, from next time onwards, it won't be created, it will just be accessed and the control will be stored in the javascript variable "DummyDatabase". 
  //There are 2 things that we are dealing with, JS Variable, localstorage Var.
  //We are creating a JAVASCRIPT Variable, DummyDatabase.
  const DummyDatabase = JSON.parse(localStorage.getItem('DummyDatabase')) || [ ] ; //AND -> &&  OR -> ||
  //JSON.parse converts JSON structure to JAVASCRIPT Object
  //JSON.stringify convert JAVASCRIPT Object to JSON
  //We are trying to create a Dummy Database with same name "DummyDatabase"
  //Where will it exist? On chrome localStorage as a LIST
  //When will it be created? by line 82, on the first execution it will be created as an EMPTY LIST.
  //After the first run, it will never be recreated, why? Because in the first run it got created and
  //now you have a "DummyDatabase" in the chrome localStorage
  //after the first run, instead of creating it will simply get the control of that list and store it in the
  //variable "DummyDatabase"
  console.log(DummyDatabase);
  
  //What is the next step? 
  //Storing the user response -> DummyDatabase
  DummyDatabase.push(response); // This DummyDatabase is the JAVASCRIPT Variable of the DB.
  console.log(DummyDatabase);
  //When you try to set something with setItem, if not present, it will get created.
  //Line 102 is the place where from JS data goes to localStorage(our temp DB)
  localStorage.setItem('DummyDatabase', JSON.stringify(DummyDatabase));
  
  alert("Thankyou for your message, I'll get in touch with you ASAP");
  this.reset();
});

const ToggleThemeBtn = document.getElementById("toggle-btn");
ToggleThemeBtn.addEventListener('click', function(){
  document.body.classList.toggle("dark-mode");
});

//When you write the correct creds, all the user messages should show up.
function displayStoredMessages(){
  //get all responses from dummydatabase and shoe them
  
  const responseContainer = document.getElementById("saari-messages");
  const DummyDatabase = JSON.parse(localStorage.getItem('DummyDatabase')) || [ ];
  
  //to get the messages from DB, we will have to loop through the list(DB) and put in the div.
  DummyDatabase.forEach(response=>{
    const responseElement = document.createElement('div');
    
    responseElement.innerHTML = `
    <p> Name: ${response.name}</p>
    <p> Email: ${response.email}</p>
    <p> Message: ${response.message}</p>
    <p> Date: ${response.date}</p>
    <hr>
    `
    responseContainer.append(responseElement);
  })
  
}



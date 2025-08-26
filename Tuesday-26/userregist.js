const prompt = require ('prompt-sync')();

let choice = 0;
let users = [];

function userNameGenerator(name){
 const base = name.toLowerCase().replace(/[^\w ]+/g,'');
    const randomNum = Math.floor(Math.random() * 1000);
    return base + randomNum;
}

while (true) {
  console.log('1. Login as CW Admin');
  console.log('2. Login as employee');
  console.log('3. Register yourself');
  console.log('4. Exit');

  choice = parseInt(prompt("Enter your choice: "));


  if(choice===1){
    console.log("In progress...");
  }else if (choice ===2){
    console.log("In progress...");
  }

  else if (choice === 3) {
    const name = prompt("Enter your name : ");
    const email = prompt("Enter your email : ");
    const role = prompt("Enter your role (Admin/Employee) : ");
    const username = userNameGenerator(name);

    const newUser = {
      name: name,
      email: email,
      role: role,
      username: username
    };

    users.push(newUser);
    console.log("Registration successful. Please login.");
    console.log("username :", username);

  } else if (choice === 4) {
    console.log("Thank you for Exiting...");
    break;
  } else {
    console.log("Invalid choice");
  }
}


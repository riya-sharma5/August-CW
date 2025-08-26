const prompt = require('prompt-sync')();

let choice = 0;
let users = [];

function userNameGenerator(name) {
    const base = name.toLowerCase().replace(/[^\w]+/g, '');
    const randomNum = Math.floor(Math.random() * 1000);
    return base + randomNum;
}

while (true) {
    console.log('1. Login as CW Admin');
    console.log('2. Login as employee');
    console.log('3. Register yourself');
    console.log('4. Exit');

    choice = parseInt(prompt("Enter your choice: "));

    if (choice === 1) {
      console.log("In progress....");
} else if (choice === 2) {
        console.log("Employee login is in progress...");

    } else if (choice === 3) {
        const name = prompt("Enter your name: ");
        const email = prompt("Enter your email: ");
         const duplicate = users.some(user => user.email.toLowerCase() === email.toLowerCase());
        if (duplicate) {
            console.log("email already exists. Please try registering again.");
      continue;
        }
        console.log("Select your role: ");
        console.log("1. Admin");
        console.log("2. Employee");
        let role = parseInt(prompt("Enter your role (1 or 2): "));

        if (role !== 1 && role !== 2) {
            console.log("Invalid role selected. Registration failed.");
        }

        const username = userNameGenerator(name);

         {
            const newUser = {
                name: name,
                email: email,
                role: role  === 1 ? "Admin" : "Employee",
                username: username
            };

            users.push(newUser);
            console.log("Registration successful. Please login.");
            console.log("Your generated username is:", username);
        }


    } else if (choice === 4) {
        console.log("Thank you for using the system. Exiting...");
        break;
    }
    
    else {
       console.log("Invalid choice");
    }
}

const prompt = require('prompt-sync')();
console.clear();

let choice = 0;
let users = [];
let laptops = [];

function userNameGenerator(name) {
    const base = name.toLowerCase().replace(/[^\w]+/g, '');
    const randomNum = Math.floor(Math.random() * 1000);
    return base + randomNum;
}

function findUserByEmail(email) {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

while (true) {
    console.log("Please select one option to proceed-");
    console.log("1. Login as CW Admin");
    console.log("2. Login as employee");
    console.log("3. Register yourself");
    console.log("4. Exit");

    choice = parseInt(prompt("Enter your choice: "));

    if (choice === 1) {
        const email = prompt("Enter your email: ");
        const user = findUserByEmail(email);

        if (!user) {
            console.log("You are not registered. Register yourself.");
            continue;
        }

        if (user.role !== "Admin") {
            console.log("You are not authorized to login.");
            continue;
        }

        console.clear();
        console.log("Welcome to CW Admin");

        while (true) {
            console.log("1. Add Laptops");
            console.log("2. View All Laptops");
            console.log("3. Search Laptop by Name");
            console.log("4. Delete Laptop by Name");
            console.log("5. Logout");

    let adminChoice = parseInt(prompt("Enter your choice: "));
if (adminChoice === 1) {
    const name = prompt("Enter Laptop Name: ");
    const existingLaptop = laptops.find(l => l.name.toLowerCase() === name.toLowerCase());

    if (existingLaptop) {
       
        const addQty = parseInt(prompt("Laptop already exists. Enter quantity to add: "));
        if (!isNaN(addQty) && addQty > 0) {
            existingLaptop.quantity += addQty;
            console.log(`Updated quantity. New quantity of "${existingLaptop.name}" is ${existingLaptop.quantity}`);
        } else {
            console.log("Invalid quantity input.");
        }
    } else {
       
        const brand = prompt("Enter Brand: ");
        const quantity = parseInt(prompt("Enter Quantity: "));

        if (name && brand && quantity > 0) {
            laptops.push({ name, brand, quantity });
            console.log("Laptop added successfully!");
        } else {
            console.log("Invalid input. Try again.");
        }
    }
}

 else if (adminChoice === 2) {
                if (laptops.length === 0) {
                    console.log("No laptops available.");
                } else {
                    console.log("Laptop Inventory:");
                    laptops.forEach(laptop => {
                        console.log(`${laptop.name} | ${laptop.brand} | Qty: ${laptop.quantity}`);
                    });
                }

            } else if (adminChoice === 3) {
                const searchName = prompt("Enter Laptop Name to Search: ");
                const found = laptops.find(l => l.name.toLowerCase() === searchName.toLowerCase());
                if (found) {
                    console.log("Laptop Detail:");
                    console.log(`${found.name} | ${found.brand} | Qty: ${found.quantity}`);
                } else {
                    console.log("Laptop not found.");
                }

            } 
            
            else if (adminChoice === 4) {
    const deleteName = prompt("Enter Laptop Name to Delete: ");
    const index = laptops.findIndex(l => l.name.toLowerCase() === deleteName.toLowerCase());

    if (index === -1) {
        console.log("Laptop not found.");
    } else {
        const laptop = laptops[index];

        const isBorrowed = users.some(user =>
             user.role === "Employee" &&
            user.borrowedLaptops &&
            user.borrowedLaptops.some(borrowed =>
                borrowed.toLowerCase() === deleteName.toLowerCase()
            )
        );


        if (isBorrowed && laptop.quantity === 0) {
            console.log("Cannot delete this laptop. It is borrowed by an employee2.");
        } else {
            laptops.splice(index, 1);
            console.log("Laptop deleted successfully!");
        }
    }
}
 else if (adminChoice === 5) {
                console.clear();
                break;
            } else {
                console.log("Invalid choice.");
            }
        }

    } else if (choice === 2) {
        const email = prompt("Enter your email: ");
        const user = findUserByEmail(email);

        if (!user) {
            console.log("You are not registered. Register yourself.");
            continue;
        }

        if (user.role !== "Employee") {
            console.log("You are not authorized to login as employee.");
            continue;
        }

        if (!user.borrowedLaptops) {
            user.borrowedLaptops = [];
        }

        console.clear();
        console.log(`Welcome ${user.name}`);

        while (true) {
            console.log("1. About Me");
            console.log("2. View All Laptops");
            console.log("3. Search Laptop by Name");
            console.log("4. Take One");
            console.log("5. Submit One");
            console.log("6. Logout");

            let empChoice = parseInt(prompt("Enter your choice: "));

            if (empChoice === 1) {
                console.log(`Name: ${user.name}`);
                console.log(`Username: ${user.username}`);
                console.log(`Role: ${user.role}`);
                console.log(`Borrowed Laptops: ${user.borrowedLaptops.join(', ') || 'None'}`);

            } 
            
            
            else if (empChoice === 2) {
                if (laptops.length === 0) {
                    console.log("No laptops available.");
                } else {
                    console.log("Laptop Inventory:");
                    laptops.forEach(laptop => {
                        console.log(`${laptop.name} | ${laptop.brand} | Qty: ${laptop.quantity}`);
                    });
                }

            } else if (empChoice === 3) {
                const searchName = prompt("Enter Laptop Name to Search: ");
                const found = laptops.find(l => l.name.toLowerCase() === searchName.toLowerCase());
                if (found) {
                    console.log("Laptop Detail:");
                    console.log(`${found.name} | ${found.brand} | Qty: ${found.quantity}`);
                } else {
                    console.log("Laptop not found.");
                }

            } else if (empChoice === 4) {
                const laptopName = prompt("Enter Laptop Name to Borrow: ");
                const laptop = laptops.find(l => l.name.toLowerCase() === laptopName.toLowerCase());

                if (!laptop) {
                    console.log("Laptop not found.");
                } else if (laptop.quantity <= 0) {
                    console.log("Laptop not available.");
                } else {
                    laptop.quantity--;
                    user.borrowedLaptops.push(laptop.name);
                    console.log(`${user.username} have borrowed "${laptop.name}"`);
                }

            } else if (empChoice === 5) {
                const returnName = prompt("Enter Laptop Name to Return: ");
                const index = user.borrowedLaptops.findIndex(name => name.toLowerCase() === returnName.toLowerCase());

                if (index === -1) {
                    console.log("You have not borrowed this laptop.");
                } else {
                    const laptop = laptops.find(l => l.name.toLowerCase() === returnName.toLowerCase());
                    if (laptop) {
                        laptop.quantity++;
                        user.borrowedLaptops.splice(index, 1);
                        console.log(`You have returned "${laptop.name}"`);
                    } else {
                        console.log("Laptop not found in inventory.");
                    }
                }

            } else if (empChoice === 6) {
                console.clear();
                break;
            } else {
                console.log("Invalid choice.");
            }
        }

    } else if (choice === 3) {
        const name = prompt("Enter your name: ");
        const email = prompt("Enter your email: ");
        console.log("Select your role: ");
        console.log("1. Admin");
        console.log("2. Employee");
        let role = parseInt(prompt("Enter your role (1 or 2): "));

        if (role !== 1 && role !== 2) {
            console.log("Invalid role selected. Registration failed.");
            continue;
        }

        const username = userNameGenerator(name);

        const duplicate = users.some(user => user.email.toLowerCase() === email.toLowerCase());
        if (duplicate) {
            console.log("User with this email already exists. Please try registering again.");
        } else {
            const newUser = {
                name,
                email,
                role: role === 1 ? "Admin" : "Employee",
                username,
                borrowedLaptops: []
            };

            users.push(newUser);
            console.log("Registration successful. Please login.");
            console.log("Your generated username is:", username);
        }

    } 
    
    else if (choice === 4) {
        console.log("Thank you for using the system. Exiting...");
        break;

    } 
    
    else {
        console.log("Invalid choice. Try again.");
    }
}


 

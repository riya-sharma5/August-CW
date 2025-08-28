const prompt = require("prompt-sync")();

let choice = 0;
let users = [];
let products = [];

function userNameGenerator(name) {
    const base = name.toLowerCase().replace(/[^\w]+/g, '');
    const randomNum = Math.floor(Math.random() * 1000);
    return base + randomNum;
}

function handleAdminChoice() {
    let adminChoice = parseInt(prompt("Enter your choice: "));
    switch(adminChoice) {
        case 1:
            addProduct();
            break;
        case 2:
            viewAllProducts();
            break;
        case 3:
            searchProductByName();
            break;
        case 4:
            updateProductByName();
            break;
        case 5:
            removeProduct();
            break;
        case 6:
            console.clear();
          break;
        default:
            console.log("Invalid choice.");
    }
    return true;
}

function handleCustomerChoice() {
    let customerChoice = parseInt(prompt("Enter your choice: "));
    switch(customerChoice) {
        case 1:
            console.log("In progress...");
            break;
        case 2:
            console.log("In progress...");
            break;
        case 3:
            console.log("In progress...");
            break;
        case 4:
            console.log("In progress...");
            break;
        case 5:
            console.log("In progress...");
            break;
        case 6:
            console.log("In progress...");
            break;
        case 7:
            console.log("In progress...");
            break;
        case 8:
            console.log("In progress...");
            break;
        case 9:
            console.log("In progress...");
            break;
        case 10:
            console.clear();
           break;
        default:
            console.log("Invalid choice.");
    }
    return true;
}

function addProduct() {
    console.log("In progress...");
}

function viewAllProducts() {
    console.log("In progress...");
}

function searchProductByName() {
    console.log("In progress...");
 }

function updateProductByName() {
    console.log("In progress...");
    }

function removeProduct() {
    console.log("In progress...");
   }

function registerUser() {
    const name = prompt("Enter your name: ");
    const email = prompt("Enter your email: ");
    const duplicate = users.some(function(user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });

    if(duplicate) {
        console.log("User already exists...");
        return;
    }

    console.log("Select your identity: ");
    console.log("1. Admin");
    console.log("2. Customer");
    let identity = parseInt(prompt("Enter your identity (1 or 2): "));

    if(identity !== 1 && identity !== 2) {
        console.log("Invalid input");
        return;
    }

    const username = userNameGenerator(name);

    const newUser = {
        name,
        email,
        identity: identity === 1 ? "Admin" : "Customer",
        username
    };
    users.push(newUser);
    console.log("\nRegistration successful");
    console.log("Your generated username is: ", username, "\n");
}

while(true) {
    console.log("\nWelcome to the Electromart\n");
    console.log("1. Login as Admin");
    console.log("2. Login as Customer");
    console.log("3. Register yourself");
    console.log("4. See all products");
    console.log("5. Exit");

    choice = parseInt(prompt("Enter your choice: "));

    switch(choice) {
        case 1:
            while(true) {
                console.log("1. Add Product: ");
                console.log("2. View All Products: ");
                console.log("3. Search Product by Name: ");
                console.log("4. Update Product by Name: ");
                console.log("5. Remove Product: ");
                console.log("6. Logout");

                const continueAdmin = handleAdminChoice();
                if (!continueAdmin) break;
            }
            break;
        case 2:
            while(true) {
                console.log("1. About me: ");
                console.log("2. Search all products: ");
                console.log("3. Search Product by Name");
                console.log("4. Add to Cart");
                console.log("5. View Cart");
                console.log("6. Update Cart Item Quantity");
                console.log("7. Remove from Cart");
                console.log("8. Apply Coupon");
                console.log("9. Checkout");
                console.log("10. Logout");

                const continueCustomer = handleCustomerChoice();
                if (!continueCustomer) break;
            }
            break;
        case 3:
            registerUser();
            break;
        case 4:
            console.log("In progress...");
            break;
        case 5:
            console.log("Thank you for using the system. Exiting...");
            return;
        default:
            console.log("Invalid choice. Try again.");
    }
}


const prompt = require("prompt-sync")();

let choice = 0;
let users = [];
let products = [];
let carts = {}; 

function userNameGenerator(name) {
    const base = name.toLowerCase().replace(/[^\w]+/g, '');
    const randomNum = Math.floor(Math.random() * 1000);
    return base + randomNum;
}

function findProductIndexByName(name) {
    return products.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
}

function findUserByEmail(email) {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

function addProduct() {
    const name = prompt("Enter product name: ");
    const duplicate = products.some(product => product.name.toLowerCase() === name.toLowerCase());

    if (duplicate) {
        console.log("Product already exists");
        return;
    }

    const price = parseFloat(prompt("Enter product price: "));
    const stock = parseInt(prompt("Enter product stock: "));

    if (name && !isNaN(price) && price > 0 && !isNaN(stock) && stock > 0) {
        products.push({ name, price, stock });
        console.log("Product added successfully\n");
    } else {
        console.log("Invalid input");
    }
}

function viewAllProducts() {
    if (products.length === 0) {
        console.log("No products available");
        return;
    }

    console.log("\n--- Product List ---");
    products.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} | Price: ${p.price} | Stock: ${p.stock}`);
    });
}

function searchProductByName() {
    const name = prompt("Enter product name to search: ");
    const index = findProductIndexByName(name);

    if (index === -1) {
        console.log("Product not found");
    } else {
        const p = products[index];
        console.log(`Found: ${p.name} | Price: ${p.price} | Stock: ${p.stock}`);
    }
}

function updateProductByName() {
    const name = prompt("Enter product name to update: ");
    const index = findProductIndexByName(name);

    if (index === -1) {
        console.log("Product not found");
        return;
    }

    const price = parseFloat(prompt("Enter updated price: "));
    const stock = parseInt(prompt("Enter updated stock: "));

    if (!isNaN(price) && price > 0 && !isNaN(stock) && stock >= 0) {
        products[index].price = price;
        products[index].stock = stock;
        console.log("Product updated successfully\n");
    } else {
        console.log("Invalid input");
    }
}

function removeProduct() {
    if (!products.length) {
        console.log("There is no product");
        return;
    }
    const name = prompt("Enter product name to remove: ");
    const index = findProductIndexByName(name);

    if (index === -1) {
        console.log("Product not found");
        return;
    }

    products.splice(index, 1);
    console.log("Product removed");
}

function handleAdminChoice() {
    let adminChoice = parseInt(prompt("Enter your choice: "));
    switch (adminChoice) {
        case 1: addProduct(); break;
        case 2: viewAllProducts(); break;
        case 3: searchProductByName(); break;
        case 4: updateProductByName(); break;
        case 5: removeProduct(); break;
        case 6: console.log("Logging out..."); return false;
        default: console.log("Invalid choice.");
    }
    return true;
}

function aboutMe(currentUser) {
    console.log("\n--- About Me ---");
    console.log(`Name: ${currentUser.name}`);
    console.log(`Email: ${currentUser.email}`);
    console.log(`Username: ${currentUser.username}`);
    console.log(`Role: ${currentUser.identity}\n`);
}

function viewCart(username) {
    const cart = carts[username] || [];
    if (cart.length === 0) {
        console.log("Your cart is empty.");
        return;
    }

    console.log("\n--- Your Cart ---");
    let total = 0;
    cart.forEach((item, i) => {
        console.log(`${i + 1}. ${item.name} | Price: ${item.price} | Qty: ${item.qty} | Subtotal: ${item.price * item.qty}`);
        total += item.price * item.qty;
    });
    console.log("Total: " + total);
}

function addToCart(username) {
    const name = prompt("Enter product name to add to cart: ");
    const index = findProductIndexByName(name);

    if (index === -1) {
        console.log("Product not found");
        return;
    }

    const qty = parseInt(prompt("Enter quantity: "));
    if (isNaN(qty) || qty <= 0 || qty > products[index].stock) {
        console.log("Invalid quantity.");
        return;
    }

    if (!carts[username]) carts[username] = [];
    let cart = carts[username];
    let existing = cart.find(item => item.name.toLowerCase() === name.toLowerCase());

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name: products[index].name, price: products[index].price, qty,});
    }
    console.log("Added to cart.");
}

function updateCartItem(username) {
    const cart = carts[username] || [];
    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }

    viewCart(username);
    const index = parseInt(prompt("Enter item number to update: ")) - 1;

    if (index < 0 || index >= cart.length) {
        console.log("Invalid item.");
        return;
    }

    const qty = parseInt(prompt("Enter new quantity: "));
    if (isNaN(qty) || qty <= 0) {
        console.log("Invalid quantity.");
        return;
    }

    cart[index].qty = qty;
   
    console.log("Cart updated.");
}

function removeFromCart(username) {
    const cart = carts[username] || [];
    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }

    viewCart(username);
    const index = parseInt(prompt("Enter item number to remove: ")) - 1;

    if (index < 0 || index >= cart.length) {
        console.log("Invalid item.");
        return;
    }

    cart.splice(index, 1);
    console.log("Item removed from cart.");
}

function applyCoupon(username) {
    const cart = carts[username] || [];
    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const coupon = prompt("Enter coupon code (DISCOUNT10 for 10% off): ");

    if (coupon === "DISCOUNT10") {
        total = total * 0.9;
        console.log("Coupon applied! New Total: " + total);
    } else {
        console.log("Invalid coupon.");
    }
}

function checkout(username) {
    const cart = carts[username] || [];
    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    console.log("Final Amount to Pay: " + total);
    console.log("Checkout successful! Thank you for shopping.");
    carts[username] = []; 
}

function handleCustomerChoice(currentUser) {
    let customerChoice = parseInt(prompt("Enter your choice: "));
    switch (customerChoice) {
        case 1: aboutMe(currentUser); break;
        case 2: viewAllProducts(); break;
        case 3: searchProductByName(); break;
        case 4: addToCart(currentUser.username); break;
        case 5: viewCart(currentUser.username); break;
        case 6: updateCartItem(currentUser.username); break;
        case 7: removeFromCart(currentUser.username); break;
        case 8: applyCoupon(currentUser.username); break;
        case 9: checkout(currentUser.username); break;
        case 10: console.log("Logging out..."); return false;
        default: console.log("Invalid choice.");
    }
    return true;
}

function registerUser() {
    const name = prompt("Enter your name: ");
    const email = prompt("Enter your email: ");
    const duplicate = users.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (duplicate) {
        console.log("User already exists...");
        return;
    }

    console.log("Select your identity: ");
    console.log("1. Admin");
    console.log("2. Customer");
    const identity = parseInt(prompt("Enter your identity (1 or 2): "));

    if (identity !== 1 && identity !== 2) {
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
    return newUser;
}

while (true) {
    console.log("\nWelcome to the Electromart\n");
    console.log("1. Login as Admin");
    console.log("2. Login as Customer");
    console.log("3. Register yourself");
    console.log("4. See all products");
    console.log("5. Exit");

    choice = parseInt(prompt("Enter your choice: "));

    switch (choice) {
        case 1:
            while (true) {
                console.log("\n---  Admin  ---");
                console.log("1. Add Product");
                console.log("2. View All Products");
                console.log("3. Search Product by Name");
                console.log("4. Update Product by Name");
                console.log("5. Remove Product");
                console.log("6. Logout");

                const continueAdmin = handleAdminChoice();
                if (!continueAdmin) break;
            }
            break;

        case 2:
            const email = prompt("Enter your registered email: ");
            const currentUser = findUserByEmail(email);
            if (!currentUser || currentUser.identity !== "Customer") {
                console.log("Customer not found. Please register first.");
                break;
            }
            while (true) {
                console.log("\n---  Customer  ---");
                console.log("1. About Me");
                console.log("2. View All Products");
                console.log("3. Search Product by Name");
                console.log("4. Add to Cart");
                console.log("5. View Cart");
                console.log("6. Update Cart Item Quantity");
                console.log("7. Remove from Cart");
                console.log("8. Apply Coupon");
                console.log("9. Checkout");
                console.log("10. Logout");

                const continueCustomer = handleCustomerChoice(currentUser);
                if (!continueCustomer) break;
            }
            break;

        case 3: registerUser(); break;
        case 4: viewAllProducts(); break;
        case 5:
            console.log("Thank you for using the system. Exiting...");
            process.exit(0);
        default:
            console.log("Invalid choice. Try again.");
    }
}

const prompt = require("prompt-sync")();

let cart = [];
let choice = 0;

while (choice !== 7) {
    console.log("\nWelcome to the store");
    console.log("1. Enter item name to add in cart");
    console.log("2. Display the cart item with serial no.");
    console.log("3. Total items");
    console.log("4. Delete the last item");
    console.log("5. Delete the first item");
    console.log("6. Enter the name to delete it");
    console.log("7. Exit");

    choice = parseInt(prompt("Enter your choice: "));

    if (choice === 1) {
        let item = prompt("Enter name of the item: ").trim();
        if (item === '') {
            console.log("You have to write the name!");
        } else {
           
            let duplicate = false;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].toLowerCase() === item.toLowerCase()) {
                    duplicate = true;
                    break;
                }
            }

            if (duplicate) {
                console.log(item + " is already in the cart.");
            } else {
                cart.push(item);
                console.log(item + " added to the cart");
            }
        }
    }
else if (choice === 2) {
    if (cart.length === 0) {
        console.log("Cart is empty");
    } else {
        console.log("Cart items:");
        cart.forEach((item, index) => {
            console.log((index + 1) + ". " + item);
        });
    }
}

    else if (choice === 3) {
        console.log("Total items: " + cart.length);
    }

    else if (choice === 4) {
        if (cart.length > 0) {
            let deleted = cart.pop();
            console.log(deleted + " deleted");
        } else {
            console.log("Cart is already empty");
        }
    }

    // else if (choice === 5) {
    //     if (cart.length > 0) {
    //         let deleted = cart[0];
    //         for (let i = 0; i < cart.length - 1; i++) {
    //             cart[i] = cart[i + 1];
    //         }
    //         cart.length = cart.length - 1;
    //         console.log(deleted + " deleted");
    //     } else {
    //         console.log("Cart is already empty");
    //     }
    // }

    else if (choice === 5) {
        if (cart.length > 0) {
            let deleted = cart.shift();
            console.log(deleted + " deleted");
        } else {
            console.log("Cart is already empty");
        }
    }
else if (choice === 6) {
    if (cart.length > 0) {
        let itemToDelete = prompt("Enter the name of the item to delete: ");
        let index = cart.findIndex(function(item) {
            return item === itemToDelete;
        });

        if (index !== -1) {
           cart.splice(index, 1);
            console.log(itemToDelete + " deleted from cart.");
        } else {
            console.log("Item not found in the cart.");
        }

    } 
    else {
        console.log("Cart is already empty.");
    }
}



    else if (choice === 7) {
        console.log("Exiting from the store...");
    }

    else {
        console.log("Invalid choice, try again.");
    }
}





//  else if (choice === 6) {
//         let name = prompt("Enter the item name to delete: ");
//         let found = false;
//         for (let i = 0; i < cart.length; i++) {
//             if (cart[i] === name) {
//                 for (let j = i; j < cart.length - 1; j++) {
//                     cart[j] = cart[j + 1];
//                 }
//                 cart.length = cart.length - 1;
//                 found = true;
//                 console.log(name + " deleted from cart");
//                 break;
//             }
//         }
//         if (!found) {
//             console.log(name + " not found in cart");
//         }
//     }






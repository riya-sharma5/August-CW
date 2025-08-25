const readlineSync = require("readline-sync");

function calculate(choice, num1, num2) {
  switch (choice) {
    case '1': return num1 + num2;
    case '2': return num1 - num2;
    case '3': return num1 * num2;
    case '4': return num2 === 0 ? "Error: Cannot divide by zero." : num1 / num2;
    default: return null;
  }
}

function showMenu() {
  console.log("1. Add");
  console.log("2. Subtract");
  console.log("3. Multiply");
  console.log("4. Divide");
  console.log("5. Exit\n");
}

while (true) {
  console.clear(); 
  showMenu();
  let choice = readlineSync.question("Enter your choice (1-5): ");

  if (choice === '5') {
    console.log("Exiting...");
    break;
  }

  if (!['1', '2', '3', '4'].includes(choice)) {
    console.log("Invalid choice! Try again.\n");
    readlineSync.question("Press Enter to continue...");
    continue;
  }

  let num1 = parseFloat(readlineSync.question("Enter first number: "));
  if (isNaN(num1)) {
    console.log("Invalid number! Try again.\n");
    readlineSync.question("Press Enter to continue...");
    continue;
  }

  let num2 = parseFloat(readlineSync.question("Enter second number: "));
  if (isNaN(num2)) {
    console.log("Invalid number! Try again.\n");
    readlineSync.question("Press Enter to continue...");
    continue;
  }

  let result = calculate(choice, num1, num2);
  console.log(`\nResult: ${result}\n`);
  readlineSync.question("Press Enter to continue"); 
}
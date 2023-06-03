let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("useramount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.querySelector(".product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const amount = document.getElementById("amount");
const expensiveValues = document.getElementById("expensive-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Set budget
totalAmountButton.addEventListener("click", () => {
    tempAmount = parseFloat(totalAmount.value);

    // Empty or negative input
    if (isNaN(tempAmount) || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        // Set budget
        amount.textContent = tempAmount.toFixed(2);
        // Set balance
        balanceValue.textContent = (tempAmount - parseFloat(expensiveValues.textContent)).toFixed(2);
        // Clear input box
        totalAmount.value = "";
    }
});

// Function to disable buttons
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((button) => {
        button.disabled = bool;
    });
};

// Function to modify elements
const modifyElements = (element, edit = false) => {
    let parentDiv = element.parentElement.parentElement;
    let currentBalance = parseFloat(balanceValue.textContent);
    let currentExpenses = parseFloat(expensiveValues.textContent);
    let parentAmount = parseFloat(parentDiv.querySelector(".amount").textContent);

    if (edit) {
        let parentText = parentDiv.querySelector(".product").textContent;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.textContent = (currentBalance + parentAmount).toFixed(2);
    expensiveValues.textContent = (currentExpenses - parentAmount).toFixed(2);
    parentDiv.remove();
};

// Create list
const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-regular", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElements(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElements(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    list.appendChild(sublistContent);
};

// Add expenses
checkAmountButton.addEventListener("click", () => {
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }

    // Enable buttons
    disableButtons(false);

    // Expenses
    let expenseValue = parseFloat(userAmount.value);
    let sum = parseFloat(expensiveValues.textContent) + expenseValue;
    expensiveValues.textContent = sum.toFixed(2);

    // Total balance
    const totalBalance = tempAmount - sum;
    balanceValue.textContent = totalBalance.toFixed(2);

    // Create list
       listCreator(productTitle.value, expenseValue.toFixed(2));

    // Empty input
    productTitle.value = "";
    userAmount.value = "";
});

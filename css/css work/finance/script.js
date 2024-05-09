// script.js
document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalElement = document.getElementById('total');

    let total = 0;
    let id = 0;
    let expenses = [];

    expenseForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let name = expenseName.value;
        let amount = parseFloat(expenseAmount.value);
        if (name && !isNaN(amount)) {
            total += amount;
            expenses.push({ id, name, amount });
            id++;
            displayExpenses();
            expenseName.value = '';
            expenseAmount.value = '';
        }
    });

    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function (item) {
            let div = document.createElement('div');
            div.innerHTML = `${item.name}: $${item.amount.toFixed(2)} <button onclick="removeExpense(${item.id})">Remove</button>`;
            expenseList.appendChild(div);
        });
        totalElement.textContent = total.toFixed(2);
    }

    window.removeExpense = function (id) {
        let index = expenses.findIndex(item => item.id === id);
        if (index !== -1) {
            total -= expenses[index].amount;
            expenses.splice(index, 1);
            displayExpenses();
        }
    };
});

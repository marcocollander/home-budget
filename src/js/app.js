// Auxiliary functions
const querySelector = (selector) => document.querySelector(selector);
const querySelectorAll = (selector) => document.querySelectorAll(selector);
const createElement = (element) => document.createElement(element);

// MODEL
const state = {
  nextId: 0,
  incomes: [],
  expenses: [],
};

// VIEW

const renderUI = () => {
  // rest currently rendered inomes
  querySelector('#incomesList').innerHTML = ' ';

  // create new incomes
  state.incomes.forEach((income) => {
    let liInnerHTML;

    if (income.isEditable) {
      liInnerHTML = `
        <div class="income">
          <span data-id="${income.id}" contenteditable="true">${income.name}</span> - 
          <span data-id="${income.id}" contenteditable="true">${income.amount}</span> zł
        </div>
          <button class="incomes__confirm-edit" data-id="${income.id}">Tak</button>
          <button class="incomes__cancel-edit" data-id="${income.id}">Nie</button>`;
    } else {
      liInnerHTML = `
        ${income.name} - ${income.amount} zł
        <button class="incomes__edit" data-id="${income.id}">Edytuj</button>
        <button class="incomes__remove" data-id="${income.id}">Usuń</button>`;
    }

    let li = createElement('li');
    li.dataset.name = income.name;
    li.innerHTML = liInnerHTML;

    querySelector('#incomesList').appendChild(li);
  });

  // add event listener for each edit "Edytuj" button
  querySelectorAll('.incomes__edit').forEach((btn) => btn.addEventListener('click', toggleIncomeEditable));

  // add event listener for each edit "Tak" button
  querySelectorAll('.incomes__confirm-edit').forEach((btn) => btn.addEventListener('click', confirmEditIncomes));

  // add event listener for each edit "Nie" button
  querySelectorAll('.incomes__cancel-edit').forEach((btn) => btn.addEventListener('click', toggleIncomeEditable));

  // add event listener for each remove button
  querySelectorAll('.income__remove').forEach((btn) => btn.addEventListener('click', removeItem));
};

const renderApp = () => {
  renderUI();
  renderSumUI();
};

const sum = (arr) => arr.reduce((acc, item) => acc + item.amount, 0);

const renderSumUI = () => {
  const incomesSum = querySelector('#incomesSum');
  incomesSum.innerHTML = `Suma przychodów: ${sum(state.incomes)} zł`;
};

renderApp();

// CONTROLER

// Events
const resetValue = (name, amount) => {
  name.value = '';
  amount.value = '';
};

querySelector('#addIncome').addEventListener('click', () => {
  let newName = querySelector('#nameIncome');
  let newAmount = querySelector('#amountIncome');
  let newIncome = {
    id: state.nextId,
    name: newName.value,
    amount: Number(newAmount.value),
    isEditable: false,
  };
  state.incomes.push(newIncome);
  renderApp();
  resetValue(newName, newAmount);
});

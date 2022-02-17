const querySelector = selector => document.querySelector(selector);
const createElement = element => document.createElement(element);

const state = {
  nextId: 0,
  incomes: [],
  expenses: [],
};

const renderUI = () => {
  querySelector('#incomesList').innerHTML = ' ';

  state.incomes.forEach(income => {
    let liInnerHTML = null;
    if (income.isEditable) {
      liInnerHTML = `<div class="income">
                      <span data-id="${income.id}" contenteditable="true">${income.name}</span> - 
                      <span data-id="${income.id}" contenteditable="true">${income.amount}</span>zł
                     </div>
                     <button class="confirmEditIncomes" data-id="${income.id}">Tak</button>
                     <button class="cancelEditIncomes" data-id="${income.id}">Nie</button>`;
    } else {
      liInnerHTML = `${income.name} - ${income.amount}zł
                    <button class="incomes__edit" data-id="${income.id}">Edytuj</button>
                    <button class="incomes__delete" data-id="${income.id}">Usuń</button>`;
    }
    let li = createElement('li');
    li.dataset.name = income.name;
    li.innerHTML = liInnerHTML;
    querySelector('#incomesList').appendChild(li);
  });
};

const sum = arr => arr.reduce((acc, item) => acc + item.amount, 0);

function renderIncomesSum() {
  querySelector('#incomesSum').innerHTML = `Suma przychodów: ${sum(state.incomes)}`;
}

const renderApp = () => {
  renderUI();
  renderIncomesSum();
};

// Events

const resetValue = (name, amount) => {
  name.value = '';
  amount.value = '';
};

querySelector('#addIncome').addEventListener('click', e => {
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

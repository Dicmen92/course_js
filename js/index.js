'use strict';

  let start = document.getElementById('start'),  
      btnplus = document.getElementsByTagName('button'),
      incomPlus = btnplus[0],
      expensesPlus = btnplus[1],      
      calculate = document.getElementById('start'),      
      deposit = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      additionalIncomeValue = document.querySelector('.additional_income-value'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeItems = document.querySelectorAll('.income-items'),  
      obligatoryExpensesName = document.querySelector('.expenses-items .expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      periodAmount = document.querySelector('.period-amount'),
      periodSelect = document.querySelector('.period-select');      

let isStr = function(n) {
  return isNaN(parseFloat(n)) && isFinite(n);
}

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData  = {
  budget : 0,
  budgetDay : 0,
  budgetMonth : 0,
  income : {},
  incomeMonth : 0,
  addIncome : [],
  expenses : {},
  addExpenses : [],
  addExpensesUp : [],
  expensesMonth : 0,
  deposit : false,  
  percentDeposit : 0,
  moneyDeposit : 0, 
  start : function () {        
    appData.budget = +salaryAmount.value;  

    appData.getExpenses(); 
    appData.getIncome();    
    appData.getExpensesMonth();     
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget(); 

    appData.showResult();
          
  },
  showResult : function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();  
    periodSelect.addEventListener("input", appData.showResult);


  },

  addExpensesBlock : function(){
    let CloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(CloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  
  getExpenses : function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !=='' && cashExpenses !=='') {
        appData.income[itemExpenses] = cashExpenses;        
      }      
    });    
  },

  addIncomeBlock : function(){
    let CloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(CloneIncomeItem, incomPlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
      incomPlus.style.display = 'none';
    }
  }, 

  getIncome : function () {
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value,
      cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !=='' && cashIncome !=='') {
      appData.incomeMonth += +cashIncome;
    }      
  });
  },

  getAddExpenses : function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim('');
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome : function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim('');
      if (itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth : function () {
    for (let key in appData.income) {      
      appData.expensesMonth = +appData.expensesMonth + +appData.income[key];            
    }    
    return appData.expensesMonth;      
 },

  getBudget : function (){
    appData.budgetMonth = appData.budget + +appData.incomeMonth - +appData.expensesMonth;            
    appData.budgetDay = Math.round(appData.budgetMonth / 30);      
  }, 

  getTargetMonth : function () {    
    return targetAmount.value / appData.budgetMonth;     
    },

  getStatusIncome : function() {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return ('У вас средний уровень дохода');  
    } else  if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
    },
    
  getInfoDeposit : function() {
    if (appData.deposit) {
      do {
      appData.percentDeposit = prompt('Какой годовой процент?', '10');
      appData.moneyDeposit = prompt('Какая сумма задолженности?', '10000');
    }  while (!isNumber(appData.percentDeposit, appData.moneyDeposit));
    }
    },

  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
  },

  getPeriodSelect : function() {    
    periodAmount.textContent = +periodSelect.value;
    
  },

  getSalaryAmountDisabled : function() {    
    start.disabled = true;     
  },

  getSalaryAmountActive : function() {    
    start.disabled = false;     
  },

  };   
  
  appData.getSalaryAmountDisabled();
  
  if (salaryAmount !==''){
  salaryAmount.addEventListener('input', appData.getSalaryAmountActive);
  start.addEventListener('click', appData.start);
  expensesPlus.addEventListener('click', appData.addExpensesBlock);
  incomPlus.addEventListener('click', appData.addIncomeBlock);
  periodSelect.addEventListener('input', appData.getPeriodSelect, appData.showResult);
  };

  
/*
if (appData.getTargetMonth() > 0) {
  console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
  console.log('Цель не будет достигнута');
} ;
*/

  appData.getTargetMonth();
  appData.getStatusIncome(); 

var str = appData.addExpensesUp.toString(); 
function capitalize(str) {
 return str.replace(/(^|\s)\S/g,  function(a) {return a.toUpperCase().replace(" ", "," + ' ')})
}
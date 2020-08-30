'use strict';

  let start = document.getElementById('start'),  
      cancel = document.getElementById('cancel'), 
      inputAll = document.querySelectorAll('input'),
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

   const AppData = function() {
    
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.addExpensesUp = [];
    this.expensesMonth = 0;
    this.deposit = false;  
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

   };

   AppData.prototype.start = function () {    

    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function(item) {
      item.setAttribute('disabled', true);
    });

    let allButton = document.querySelectorAll('.data button');
    allButton.forEach(function(item) {
      item.setAttribute('disabled', true);
    });   

    start.style.display = 'none';
    cancel.style.display = 'block';
    

    this.budget = +salaryAmount.value;  

    this.getExpenses(); 
    this.getIncome();    
    this.getExpensesMonth();     
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget(); 

    this.showResult();     
  };

  AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();  
    periodSelect.addEventListener("input", function() {
      incomePeriodValue.value = _this.calcPeriod();      
    });
  };

  AppData.prototype.addExpensesBlock = function(){
    let CloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(CloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');    
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  };
  
  AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !=='' && cashExpenses !=='') {
        _this.income[itemExpenses] = cashExpenses;        
      }      
    });    
  };

  AppData.prototype.addIncomeBlock = function(){
    let CloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(CloneIncomeItem, incomPlus);
    incomeItems = document.querySelectorAll('.income-items');     
    if(incomeItems.length === 3){
      incomPlus.style.display = 'none';
    }
  }; 

  AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value,
      cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !=='' && cashIncome !=='') {
        _this.incomeMonth += +cashIncome;
    }      
  });
  };

  AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim('');
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  };

  AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim('');
      if (itemValue !== ''){
        _this.addIncome.push(itemValue);
      }
    });
  };

  AppData.prototype.getExpensesMonth = function () {    
    for (let key in this.income) {      
      this.expensesMonth = +this.expensesMonth + +this.income[key];            
    }    
    return this.expensesMonth;      
 };

  AppData.prototype.getBudget = function (){
    this.budgetMonth = this.budget + +this.incomeMonth - +this.expensesMonth;            
    this.budgetDay = Math.round(this.budgetMonth / 30);      
  };

  AppData.prototype.getTargetMonth = function () {    
    return targetAmount.value / this.budgetMonth;     
    };

  AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');  
    } else  if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
    };
    
  AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
      do {
      this.percentDeposit = prompt('Какой годовой процент?', '10');
      this.moneyDeposit = prompt('Какая сумма задолженности?', '10000');
    }  while (!isNumber(this.percentDeposit, this.moneyDeposit));
    }
    };

  AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
  };

  /*
  getPeriodSelect : function() {    
    periodAmount.textContent = +periodSelect.value;    
  },
  */

  AppData.prototype.getSalaryAmountDisabled = function() {    
    start.disabled = true;     
  };

  AppData.prototype.getSalaryAmountActive = function() {    
    start.disabled = false;     
  };

  AppData.prototype.reset = function() {
    let allInputReset = document.querySelectorAll('.data input[type = text]');
    allInputReset.forEach(function(elem) {
      elem.value = '';
      elem.removeAttribute('disabled');
    });

    let allButtonReset = document.querySelectorAll('.data button');
    allButtonReset.forEach(function(elem) {
    elem.removeAttribute('disabled');
    });  

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomPlus.style.display = 'block';
    };

    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = 'block';
    };

    inputAll.forEach(function(elem){
      elem.value = '';
    });    

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.addExpensesUp = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;   
    
    cancel.style.display = 'none';
    start.style.display = 'block';  
    
    periodSelect.value = 1;
    periodAmount.innerHTML = periodSelect.value;
    
    this.getSalaryAmountDisabled();    
  };

  AppData.prototype.eventsListeners = function(){    

    this.getSalaryAmountDisabled();  
  
    if (salaryAmount !==''){
    salaryAmount.addEventListener('input', this.getSalaryAmountActive);
    start.addEventListener('click', this.start.bind(appData));  
    }; 
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomPlus.addEventListener('click', this.addIncomeBlock);  
    cancel.addEventListener('click', this.reset.bind(appData));

    //periodSelect.addEventListener('input', appData.getPeriodSelect, appData.showResult);
    
    periodSelect.addEventListener("input", function() {
    periodAmount.innerHTML = periodSelect.value;
    });
    
    this.getTargetMonth();
    this.getStatusIncome();     
    
    function capitalize(str) {
    return str.replace(/(^|\s)\S/g,  function(a) {return a.toUpperCase().replace(" ", "," + ' ')})
    };
    let str = this.addExpensesUp.toString();    

  };

  const appData = new AppData();

  appData.eventsListeners();
  
  




/*
if (appData.getTargetMonth() > 0) {
  console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
  console.log('Цель не будет достигнута');
} ;
*/  
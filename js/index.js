'use strict';

  let incomeItems = document.querySelectorAll('.income-items'), 
      expensesItems = document.querySelectorAll('.expenses-items');

  const start = document.getElementById('start'),  
      cancel = document.getElementById('cancel'), 
      inputAll = document.querySelectorAll('input'),
      btnplus = document.getElementsByTagName('button'),
      incomPlus = btnplus[0],
      expensesPlus = btnplus[1],      
      calculate = document.getElementById('start'),      
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      additionalIncomeValue = document.querySelector('.additional_income-value'),
      depositPercent = document.querySelector('.deposit-percent'),

      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),      
      obligatoryExpensesName = document.querySelector('.expenses-items .expenses-title'),      
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      targetAmount = document.querySelector('.target-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      periodAmount = document.querySelector('.period-amount'),
      periodSelect = document.querySelector('.period-select');      

   class AppData {
    constructor() {    
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
    }   

   start() {    

    const allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function(item) {
      item.setAttribute('disabled', true);
    });

    const allButton = document.querySelectorAll('.data button');
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
    this.getInfoDeposit();
    this.getBudget(); 

    this.showResult();     
  };

  showResult() {
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

  addExpensesBlock(){
    const CloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(CloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');    
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  };
  
  getExpenses() {
    const _this = this;
    expensesItems.forEach(function(item) {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !=='' && cashExpenses !=='') {
        _this.income[itemExpenses] = cashExpenses;        
      }      
    });    
  };

  addIncomeBlock(){
    const CloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(CloneIncomeItem, incomPlus);
    incomeItems = document.querySelectorAll('.income-items');     
    if(incomeItems.length === 3){
      incomPlus.style.display = 'none';
    }
  }; 

  getIncome() {
    const _this = this;
    incomeItems.forEach(function(item){
      const itemIncome = item.querySelector('.income-title').value,
      cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !=='' && cashIncome !=='') {
        _this.incomeMonth += +cashIncome;
    }      
  });
  };

  getAddExpenses() {
    const _this = this;
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim('');
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  };

  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
      const itemValue = item.value.trim('');
      if (itemValue !== ''){
        _this.addIncome.push(itemValue);
      }
    });
  };

  getExpensesMonth() {    
    for (let key in this.income) {      
      this.expensesMonth = +this.expensesMonth + +this.income[key];            
    }    
    return this.expensesMonth;      
 };

  getBudget(){
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + +this.incomeMonth - +this.expensesMonth + monthDeposit;            
    this.budgetDay = Math.round(this.budgetMonth / 30);      
  };

  getTargetMonth() {    
    return targetAmount.value / this.budgetMonth;     
    };

  getStatusIncome() {
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
    
   calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  };

  /*
  getPeriodSelect : function() {    
    periodAmount.textContent = +periodSelect.value;    
  },
  */

  getSalaryAmountDisabled() {    
    start.disabled = true;     
  };

  getSalaryAmountActive() {    
    start.disabled = false;     
  };

  getInfoDeposit() {
    if (this.deposit) {     
      this.percentDeposit = depositPercent.value;      
      this.moneyDeposit = depositAmount.value;    
    }
    };

    changePercent(){
      const valueSelect = this.value;
      if (valueSelect === 'other') {
        depositPercent.style.display = 'inline-block';
      } else {
        depositPercent.value = valueSelect;
        depositPercent.style.display = 'none';         
      }
    };

  depositHandler(){
    if (depositCheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);      
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    };
  };

  reset() {
    const allInputReset = document.querySelectorAll('.data input[type = text]');
    allInputReset.forEach(function(elem) {
      elem.value = '';
      elem.removeAttribute('disabled');
    });

    const allButtonReset = document.querySelectorAll('.data button');
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
    
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = '';    
//    depositBank.removeEventListener('change', this.changePercent); 
    depositCheck.checked = !depositCheck.checked;
  };

  eventsListeners(){    

    this.getSalaryAmountDisabled();  
  
    if (salaryAmount !==''){
    salaryAmount.addEventListener('input', this.getSalaryAmountActive);
    start.addEventListener('click', this.start.bind(this));  
    }; 
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomPlus.addEventListener('click', this.addIncomeBlock); 
    depositCheck.addEventListener('change', this.depositHandler.bind(this)); 
    cancel.addEventListener('click', this.reset.bind(this));

    //periodSelect.addEventListener('input', appData.getPeriodSelect, appData.showResult);
    
    periodSelect.addEventListener("input", function() {
    periodAmount.innerHTML = periodSelect.value;
    });
    
    this.getTargetMonth();
    this.getStatusIncome();     
    
    function capitalize(str) {
    return str.replace(/(^|\s)\S/g,  function(a) {return a.toUpperCase().replace(" ", "," + ' ')})
    };
    const str = this.addExpensesUp.toString();    

  };

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
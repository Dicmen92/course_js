'use strict';

let money = 0;

let isStr = function(n) {
  return isNaN(parseFloat(n)) && isFinite(n);
}

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let start = function () {
  do {
    money = prompt('Ваш месячный доход?', 50000);
  }  
  while (!isNumber(money));
};

start();

let appData  = {
  budget : money,
  budgetDay : 0,
  budgetMonth : 0,
  income : {},
  addIncome : [],
  expenses : {},
  addExpenses : [],
  addExpensesUp : [],
  expensesMonth : 0,
  deposit : false,
  mission : 50000, 
  period : 3, 
  percentDeposit : 0,
  moneyDeposit : 0, 
  
  asking : function() {  
    let cashIncome;
    let itemIncome;   
    if (confirm('Есть ли у Вас дополнительный заработок?')) {       
      let itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую на личном авто');   
      while (!/[^[0-9]/.test(itemIncome) || isFinite(itemIncome)){
        itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Таксую на личном авто');        
      }
      do {
      cashIncome = prompt('Сколько Вы зарабатываете на этом?', '4000');
      } 
      while (!isNumber(cashIncome)); 
      appData.income[itemIncome] = cashIncome;     
  }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', 'Кино, Пляж, Бассейн');
    appData.addExpenses = addExpenses.toLowerCase().split(' , ');
    appData.addExpensesUp = addExpenses.split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
      
    for (let i = 0; i < 2; i++) {    
      let itemExpenses = prompt('Введите обязательную статью расходов?', 'Садик Государственный'); 
      while (!/[^[0-9]/.test(itemExpenses)  || isFinite(itemExpenses)){
      itemExpenses = prompt('Введите обязательную статью расходов?', 'Садик Государственный'); 
      }
      let cashExpenses;
      do {
        cashExpenses = prompt('Во сколько это обойдется?', 5000);
      }  
      while (!isNumber(cashExpenses));        
        appData.expenses[itemExpenses] = cashExpenses;         
      }                  
  },

  getExpensesMonth : function () {
    for (let key in appData.expenses) {      
      appData.expensesMonth = +appData.expensesMonth + +appData.expenses[key];            
    }    
    return appData.expensesMonth;      
 },

  getBudget : function (){
    appData.budgetMonth = appData.budget - +appData.expensesMonth;            
    appData.budgetDay = Math.round(appData.budgetMonth / 30);      
  }, 

  getTargetMonth : function () {    
    return appData.mission / appData.budgetMonth;     
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

  calsSaveMoney: function() {
    return appData.budgetMonth * appData.period;
  }

  };  

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы за месяц = ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
  console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
  console.log('Цель не будет достигнута');
} ;

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData){
  console.log(key + ' - ' + appData[key]);
};

var str = appData.addExpensesUp.toString(); 
function capitalize(str) {
 return str.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
}
console.log(capitalize(str));


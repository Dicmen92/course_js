'use strict';

let money = 0;


let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let start = function () {
  do {
    money = +prompt('Ваш месячный доход?', 50000);
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
  expensesMonth : 0,
  deposit : false,
  mission : 50000, 
  period : 3,  

  asking : function() {  
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', 'Кино, Пляж, Бассейн');
    appData.addExpenses = addExpenses.toLowerCase().split(' , ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
      
    for (let i = 0; i < 2; i++) {    
      let itemExpenses = prompt('Введите обязательную статью расходов?', 'Садик Государственный'); 
      let cashExpenses;
      do {
        cashExpenses = +prompt('Во сколько это обойдется?', 5000);
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
    console.log(appData.budgetDay);
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
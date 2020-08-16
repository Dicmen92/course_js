'use strict';

let money = 12000;


let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let start = function () {
  do {
    money = prompt('Ваш месячный доход?', 10000);
  }  
  while (!isNumber(money))
};

start();

/*
let startSum = function () {
  do {
    sum = prompt('Во сколько это обойдется?');
  }  
  while (!isNumber(sum)) {
    sum = +sum + +sum;
  }
}; 
*/

let appData  = {
  sum : 0,
  mission : 35000,
  addExpenses : 'Интернет, Телефон, Билет на метро',
  deposit : false,
  period : 7,
  budget : money,
  budgetDay : 0,
  budgetMonth : 0,
  expensesMonth : 0,
  expenses : {
    str : [],
    numb : [],
  },

  asking : function() {  
    appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', appData.addExpenses);
    appData.deposit = confirm('Есть ли у вас депозит в банке?');  
    for (let i = 0; i < 2; i++) {    
      appData.expenses.str[i] = prompt('Введите обязательную статью расходов?'); 
      do {
        appData.sum = prompt('Во сколько это обойдется?');
      }  
      while (!isNumber(appData.sum)) {        
        appData.expenses.numb[i] = +appData.sum;
      }       
    }  
    return +appData.sum;  
  },

  getExpensesMonth : function () {
    for (let prop in appData.expenses) {      
      appData.expensesMonth = appData.expenses.numb[0] + appData.expenses.numb[1];
      return appData.expensesMonth;
    }
 },

  getBudget : function (){
   appData.budgetMonth = appData.budget - appData.getExpensesMonth();   
   //console.log(); 
   appData.budgetDay = appData.budget / 30;  
   return appData.budgetDay; 
  },

  getTargetMonth : function () {    
    return Math.ceil(appData.mission/ (appData.budget - appData.getExpensesMonth()));     
    },

  getStatusIncome : function() {
    if (appData.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      console.log('У вас средний уровень дохода');  
    } else  if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Что то пошло не так');
    }
    }

  };  


let expensesAmount = appData.asking();

console.log('Расходы за месяц = ', appData.getExpensesMonth());
console.log('Цель будет достигнута (в месяцах) = ', appData.getTargetMonth());
appData.getStatusIncome();

console.log('Наша программа включает в себя данные:');
for (let prop in appData) {  
  console.log(prop + ": " + appData[prop]); 
};
'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANK APP

// Data
const account1 = {
  owner: 'Monday Kingsley',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Deborah Ilara',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Oyedokun Ashraph',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Ibrahim Qomorudeen',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Patrick Jatto',
  movements: [430, 1000, 700, 50, 90, 350,2500],
  interestRate: 1,
  pin: 5555,
};
const account6 = {
  owner: 'Tajudeen Abimbola',
  movements: [130, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 6666,
};

const accounts = [account1, account2, account3, account4, account5, account6];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form-button');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferAmount = document.querySelector('.form-Amount');
const inputTransferTo = document.querySelector('.form-input');

const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.username-close');
const inputClosePin = document.querySelector('.pin-close');

const registerButton =document.querySelector('.reg')
const closeButton = document.querySelector('.close')
const signInForm = document.querySelector('.sign_in_form')
const loginUser = document.querySelector('#login')
const inputFirstName = document.querySelector('.firstname')
const inputLastName = document.querySelector('.lastname')
const inputEmail = document.querySelector('.email')
const inputPassword = document.querySelector('.password')



const displayMovement = function(movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a,b) => a-b) : movements;

 movs.forEach(function(mov, i){
  const type = mov > 0 ? 'deposit' : 'withdrawal'
  const html =`
  <div class="movements_row">
  <div class="movements_type movements_type--${type}">${i + 1}${type}</div>
 
  <div class="movements_value">${mov}</div>
</div>`
containerMovements.insertAdjacentHTML('afterbegin', html);
 })
}



const calDisplayBalance = function(acc) {
  
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} Naira`;
  };
  console.log(calDisplayBalance);
//   const  movements= [200, 450, -400, 3000, -650, -130, 70, 1300]
// const firstWithdrawal = movements.find(mov => mov <0)
// console.log(movements);
// console.log(firstWithdrawal);
// console.log(accounts);




// const account = accounts.find(acc => acc.owner === 'Jessica Davis')
// console.log(account);
const userNames = function(accs){
  accs.forEach(function (acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  });
};
userNames(accounts);

const updateUI = function (acc){
  displayMovement(acc.movements);
  //Display balance
  calDisplayBalance(acc);
}
// Event Handler
let currentAccount;
let currentPin;
btnLogin.addEventListener('click', function(e){
  // prevent event from submiting
e.preventDefault();

currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
console.log(currentAccount);

 if (currentAccount?.pin === Number(inputLoginPin.value)) 
  {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //updating ui
    updateUI(currentAccount);
    //Display Movements
   
   //Display Summary
  //  calcDisplaySummary(currentAccount.movements);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(acc => acc.username === inputTransferTo.value); 

inputTransferAmount.value =inputTransferTo.value = '';

if (amount > 0 && receiveAcc && currentAccount.balance >= amount && receiveAcc.username !== currentAccount.username)
{
  console.log("transfer valid");
  // Doing the transfer
currentAccount.movements.push(-amount);
receiveAcc.movements.push(amount);
updateUI(currentAccount);
console.log(receiveAcc);
}
});

btnClose.addEventListener('click', function(e) {
e.preventDefault();
console.log('delete');
if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value)  === currentAccount.pin){
  const index = accounts.findIndex(acc=> acc.username === currentAccount.username);
  console.log(index);
//delete account
  accounts.splice(index, 1);
//Hide Ui
  containerApp.style.opacity = 0;
}
//render the input to none
 inputCloseUsername.value = inputClosePin.value =''; 
});

btnLoan.addEventListener('click', function(e) {
e.preventDefault();

const amount = Number(inputLoanAmount.value)
console.log(amount);
if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1))
{
currentAccount.movements.push(amount)
//display balance
updateUI(currentAccount);
console.log(currentAccount);
inputLoanAmount.value = '';
}
})
let sorted = false;

btnSort.addEventListener('click', function(e){
  e.preventDefault();
  console.log("sort");
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
})

registerButton.addEventListener('click', ()=>{
signInForm.style.display = 'flex'
});

closeButton.addEventListener('click', ()=>{
  signInForm.style.display = 'none'
  });

  loginUser.addEventListener('click', ()=>{
    signInForm.style.display = 'none'
    });

function readAll() {
  localStorage.setItem('object2', JSON.stringify(accounts))
  // var signuptext = document.querySelector('.sign_up');
  var object1 = localStorage.getItem('object2');
  var objectLabel = JSON.parse(object1)
  console.log(objectLabel);
  // var element = ''
  // objectLabel.map(record =>{
  //   element+=
  //   `<tr>
  //     <td>${record.owner}</td>
  //     <td>${record.pin}</td>
  //     <td></td>
      
  //   </tr>`
  // })
// signuptext.innerHTML = element
//<tab cellpadding="10">

}
  readAll()
// function readAll() {
//   localStorage.setItem('object3', JSON.stringify(account2))
//   var signuptext = document.querySelector('.sign_up');
//   var objectSecond = localStorage.getItem('object3');
//   var objectLabel1 = JSON.parse(objectSecond)
//   console.log(objectLabel1);
//   var element = ''
//   objectLabel.map(record =>{
//     element+=
//     `<tr>
//       <td>${record.owner}</td>
//       <td>${record.pin}</td>
//       <td></td>
      
//     </tr>`
//   })
// signuptext.innerHTML = element
// }
function submit(){
  var firstName = document.querySelector('.firstname').value;
  var lastName = document.querySelector('.lastname').value;
  var email = document.querySelector('.email').value;
  var password = document.querySelector('.password');
  var newObj = {firstName:firstName, lastName:lastName, email:email, password:password}
  accounts.push(newObj)
  readAll()
  document.querySelector('.sign_in_form').style.display = 'none';
  inputFirstName.value = inputLastName.value = inputEmail.value = inputPassword = '';
}



// btnSort.addEventListener('click', function(e){
//   e.preventDefault();
//   displayMovement(currentAccount.movements, !sorted);
//   sorted = !sorted;
// })
  

//    calDisplayBalance(account1.movements);
// humanage= 0;
// dogage= 0;  
// const calcAverageHumanAge = function(ages){
//   if(dogage <= 2'years old'){
//     console.log(humanage = 2*dogage);
//   } else if(dogage > 2); {
//     console.log(humnanage = 16 + dogage *4 );
//   }
// }
// const eurotodollars = 1.1

// 
// const movementsusd = movements.map(function(mov){
//  return mov * eurotodollars

// });
// console.log(movementsusd);
// const  movements =  [200, 450, -400, 3000, -650, -130, 70, 1300]

// const movementDescriptions = movements.map((mov, i) => {
// if(mov > 0){
//   return (`movements ${i + 1}: you deposited ${mov} `);
//    }else{
//      return(`movements ${i + 1}: you withdrew ${Math.abs(mov)} `)
//    }
// });
// console.log(movementDescriptions);

// const calDisplayBalanc = function (movements){
// const balance = movements.reduce((acc, mov) => acc + mov, 0);
// labelBalance.textContent = `${balance} Naira `;
// };
// // console.log(calDisplayBalance);
// calDisplayBalance(account1.movements)


// const deposits = movements.filter(function(mov){
//   return mov > 0
// });
// console.log(deposits);

// const withdrawals = movements.filter(function(mov){
//   return mov < 0
// });
// console.log(withdrawals );

// const balance = movements.reduce(function(acc, cur, i, arr ){
//   return acc + cur
// }, 0);
// console.log(balance);

// const balance1 = movements.reduce((acc, cur,) => acc + cur, 0);
// console.log(balance1);

// const user = 'Jonas Schmedtman';
// const username = user
// .toLowerCase()
// .split(' ')
// .map(name => name[0])
// .join('');


// console.log(username);




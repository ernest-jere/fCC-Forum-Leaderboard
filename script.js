let price = 19.5;
let cid = 
  [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]
; 
let cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due")

purchaseBtn.addEventListener("click", () => {
  if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
  }
  if (Number(cash.value) === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  }
  if (Number(cash.value) > price) {
    changeDue.textContent = CheckTransactionStatus(price, cash, cid);
  } 
})

function CheckTransactionStatus(price, cash, cid) {
  const currencyUnit = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1.0],
    ["FIVE", 5.0],
    ["TEN", 10.0],
    ["TWENTY", 20.0],
    ["ONE HUNDRED", 100.0]
  ];

  let change = Number(cash.value) - price;
  let changeArray = [];

  for (let i = currencyUnit.length - 1; i >= 0; i--) {
    let coinName = currencyUnit[i][0];
    let coinValue = currencyUnit[i][1];
    let coinAmount = 0;

    while (change >= coinValue && cid[i][1] > 0) {
      change -= coinValue;
      cid[i][1] -= coinValue;
      coinAmount += coinValue;
      change = Math.round(change * 100) / 100; 
    }

    if (coinAmount > 0) {
      changeArray.push([coinName + ":", "$" + parseFloat(coinAmount).toFixed(2) + " "].join(" "));
    }
  }

  if (change > 0) {
    return  `status: INSUFFICIENT_FUNDS ${[]}` ;
  }

  if (cid.reduce((total, item) => total + item[1] === change)) {
    return  `status: CLOSED ${changeArray}` ;
  }

  return  `Status: OPEN ${changeArray.join(" ")}` ;
}
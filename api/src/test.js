function pay() {
  return new Promise((resolve, reject) => {
    console.log("Your Payment is in progress");
    setTimeout(() => {
      console.log("Payment Successful");
      resolve();
    }, 3000);
  });
}
function order() {
  return new Promise((resolve, reject) => {
    console.log("placing your order");
    setTimeout(() => {
      console.log("Order Placed");
      resolve();
    }, 3000);
  });
}
function prepare() {
  console.log("we are praparing you order");
  setTimeout(() => {
    console.log("Your Order is prepared");
  }, 3000);
}
async function orderFood() {
  await pay();
  await order();
  prepare();
}
orderFood();

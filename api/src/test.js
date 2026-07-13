const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("first Promise got resolved");
  }, 5000);
});
for (let i = 0; i < 10000000000; i++) {}
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Second Promise got resolved");
  }, 10000);
});
async function test() {
  console.log("hello1");
  const res1 = await p1;
  console.log(res1);
  console.log("hello2");
  const res2 = await p2;
  console.log(res2);
}
test();

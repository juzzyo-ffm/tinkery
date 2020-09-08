type Strum = string | number;
const hello = "hello";
type Tuple = [number, string];

function printToConsole(input1: Strum, input2: Strum): void {
  console.log("hello %d, %s", input1, input2, "lkjlkj", hello);
}

printToConsole(12, "hellooooo");

enum Role {
  ADMIN,
  READ_ONLY,
  EDITOR,
}

const t: Tuple = [1, "lkj"];
const aot: Strum[] = ["lkj", "slkdf", 1];
const tingo = {
  aot,
  t,
  role: Role.ADMIN,
};
console.log(tingo);

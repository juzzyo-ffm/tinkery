enum Group {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR
}

interface IPerson {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // tuple
  group: Group;
}

const person: IPerson = {
  name: "justin",
  age: 46,
  hobbies: ["chess", "painting"],
  role: [2, "author"], // (string | number)[] union type
  group: Group.ADMIN
};

console.log(person);

const num1 = 2;
const num2 = 8;

function add(n1: number, n2: number) {
  return n1 + n2;
}

add(num1, num2);

const myarr = ["one", "tow", "therrr"];

console.log("hello");
for (const str of myarr) {
  console.log(str.toUpperCase());
}

// tuple is fixed length and type array

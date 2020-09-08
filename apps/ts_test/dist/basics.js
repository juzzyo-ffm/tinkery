var Group;
(function (Group) {
    Group[Group["ADMIN"] = 5] = "ADMIN";
    Group[Group["READ_ONLY"] = 6] = "READ_ONLY";
    Group[Group["AUTHOR"] = 7] = "AUTHOR";
})(Group || (Group = {}));
const person = {
    name: "justin",
    age: 46,
    hobbies: ["chess", "painting"],
    role: [2, "author"],
    group: Group.ADMIN
};
console.log(person);
const num1 = 2;
const num2 = 8;
function add(n1, n2) {
    return n1 + n2;
}
add(num1, num2);
const myarr = ["one", "tow", "therrr"];
console.log("hello");
for (const str of myarr) {
    console.log(str.toUpperCase());
}
// tuple is fixed length and type array
//# sourceMappingURL=basics.js.map
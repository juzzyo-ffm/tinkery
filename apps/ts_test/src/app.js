var hello = "hello";
function printToConsole(input1, input2) {
    console.log("hello %d, %s", input1, input2, "lkjlkj", hello);
}
printToConsole(12, "hellooooo");
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["EDITOR"] = 2] = "EDITOR";
})(Role || (Role = {}));
var t = [1, "lkj"];
var aot = ["lkj", "slkdf", 1];
var tingo = {
    aot: aot,
    t: t,
    role: Role.ADMIN
};
console.log(tingo);

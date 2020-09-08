var ResultType;
(function (ResultType) {
    ResultType[ResultType["AS_NUMBER"] = 0] = "AS_NUMBER";
    ResultType[ResultType["AS_STRING"] = 1] = "AS_STRING";
})(ResultType || (ResultType = {}));
// enum example
function combine(n1, n2, resultType) {
    // add or concatentate base on input types
    let result;
    if ((typeof n1 === "number" && typeof n2 === "number") ||
        resultType === ResultType.AS_NUMBER) {
        result = +n1 + +n2;
    }
    if (resultType === ResultType.AS_STRING) {
        result = n1.toString() + n2.toString();
    }
    return result;
}
console.log(combine(2, 3, ResultType.AS_STRING));
console.log(combine("2", "3", ResultType.AS_NUMBER));
console.log(combine(2, " hello", ResultType.AS_STRING));
// union types
function combine2(n1, n2, resultType) {
    // add or concatentate base on input types
    let result;
    if ((typeof n1 === "number" && typeof n2 === "number") ||
        resultType === "as-number") {
        result = +n1 + +n2;
    }
    if (resultType === "as-text") {
        result = n1.toString() + n2.toString();
    }
    return result;
}
console.log(combine2(2, 3, "as-text"));
console.log(combine2("2", "3", "as-number"));
console.log(combine2(2, " hello", "as-text"));
//# sourceMappingURL=union-aliases.js.map
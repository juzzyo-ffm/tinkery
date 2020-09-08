enum ResultType {
  AS_NUMBER,
  AS_STRING
}

// enum example
function combine(
  n1: number | string,
  n2: number | string,
  resultType: ResultType
): string | number {
  // add or concatentate base on input types
  let result;
  if (
    (typeof n1 === "number" && typeof n2 === "number") ||
    resultType === ResultType.AS_NUMBER
  ) {
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

// type alias
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

// union types
function combine2(
  n1: Combinable,
  n2: Combinable,
  resultType: ConversionDescriptor
): string | number {
  // add or concatentate base on input types
  let result;
  if (
    (typeof n1 === "number" && typeof n2 === "number") ||
    resultType === "as-number"
  ) {
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

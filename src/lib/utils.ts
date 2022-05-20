export function pushForward(A: any[], B: any[]) {
  let diff = A.length - B.length;

  if (diff > 0) {
    B.unshift(
      ..."0"
        .repeat(diff)
        .split("")
        .map(a => +a)
    );
    return;
  }
  A.unshift(
    ..."0"
      .repeat(-diff)
      .split("")
      .map(a => +a)
  );
}

export function shift(to: number, arr: any[]) {
  let newArr = [
    ...arr,
    ..."0"
      .repeat(to)
      .split("")
      .map(a => +a),
  ];
  return newArr;
}

export function ARRXOR(A: (0 | 1)[], B: (0 | 1)[]) {
  pushForward(A, B);
  return [...A.map((a, i) => (a + B[i] == 1 ? 1 : 0))];
}

export function maxPower(A: (0 | 1)[]) {
  if (A.findIndex(a => a == 1) == -1) throw Error("NO INFO IN DIVIDER");
  return A.length - A.findIndex(a => a == 1) - 1;
}

export function delZ(A: (0 | 1)[]): (0 | 1)[] {
  let max = A.findIndex(a => a == 1);
  if (max == 0) return [0];
  return A.splice(max);
}

export function asString(A: (0 | 1)[]) {
  if (A.every(a => a == 0)) return "0";
  return A.flatMap((a, i, arr) => {
    if (!a) return [];
    const power = arr.length - i - 1;
    if (power == 0) return ["1"];
    if (power == 1) return ["x"];
    return [`x^${power}`];
  }).join(" + ");
}

export function log(sub: (0 | 1)[], rest: (0 | 1)[], mul: number) {
  let multTo = `x^${mul}`;
  if (mul == 0) multTo = "1";
  if (mul == 1) multTo = "x";
  console.log(
    "\x1b[0m",
    `- ${asString(sub)} | ( * ${multTo})
  ${"-".repeat(asString(rest).length + asString(sub).length + 6)}
  
  ${asString(rest)}`
  );
}

export function startLog(A: (0 | 1)[], B: (0 | 1)[]) {
  console.log(
    "\x1b[34m",
    `
    ${asString(A)} || ${asString(B)}
    ${"-".repeat(asString(A).length + asString(B).length + 4)}
    `
  );
}

export function logEnd(rest: (0 | 1)[], quotient: (0 | 1)[]) {
  console.log(
    "\x1b[31m",
    `
    ${"-".repeat(asString(rest).length + asString(quotient).length + 4)}
    Остаток: ${asString(rest)}
    Частное: ${asString(quotient)}

    Остаток: ${rest}
    Частное: ${quotient}
    `
  );
}

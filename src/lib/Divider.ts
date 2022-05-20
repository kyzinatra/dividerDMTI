import { pushForward, shift, ARRXOR, maxPower, delZ, startLog, logEnd, log } from "./utils";

export function divide(A: (0 | 1)[], B: (0 | 1)[]) {
  pushForward(A, B); // to one length
  let rest = A;
  let quotient = Array.from({ length: A.length }).fill(0) as (0 | 1)[];
  startLog(A, B);
  while (true) {
    let maxPowerA = maxPower(rest);
    let maxPowerB = maxPower(B);

    if (maxPowerA < maxPowerB) {
      logEnd(rest, quotient);
      return {
        rest: delZ(rest),
        quotient: delZ(quotient),
      };
    }

    let mult = maxPowerA - maxPowerB;

    let subst = shift(mult, B); // Умножить
    quotient[quotient.length - mult - 1] = 1; // Добавить в частное
    pushForward(rest, subst);
    rest = ARRXOR(rest, subst); // Сложить

    log(subst, rest, mult);
    if (rest.every(a => a == 0)) {
      logEnd(rest, quotient);
      return {
        rest: delZ(rest),
        quotient: delZ(quotient),
      };
    }
  }
}

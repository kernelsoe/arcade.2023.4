/**
 * Based on https://mafs.dev/guides/
 */
import type { Vector2 } from "./vec";

export type Interval = [min: number, max: number];

export function round(value: number, precision = 0): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function range(min: number, max: number, step = 1): number[] {
  const result = [];
  for (let i = min; i < max - step / 2; i += step) {
    result.push(i);
  }
  result.push(max);
  return result;
}

export function clamp(number: number, min: number, max: number): number {
  return Math.min(Math.max(number, min), max);
}

export function triangleArea(a: Vector2, b: Vector2, c: Vector2): number {
  const ax = a[0];
  const ay = a[1];
  const bx = b[0];
  const by = b[1];
  const cx = c[0];
  const cy = c[1];
  return Math.abs((ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) / 2);
}

const parens = /\(([0-9+\-*/^ .]+)\)/; // Regex for identifying parenthetical expressions
const exp = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/; // Regex for identifying exponentials (x ^ y)
const mul = /(\d+(?:\.\d+)?) ?\* ?(\d+(?:\.\d+)?)/; // Regex for identifying multiplication (x * y)
const div = /(\d+(?:\.\d+)?) ?\/ ?(\d+(?:\.\d+)?)/; // Regex for identifying division (x / y)
const add = /(\d+(?:\.\d+)?) ?\+ ?(\d+(?:\.\d+)?)/; // Regex for identifying addition (x + y)
const sub = /(\d+(?:\.\d+)?) ?- ?(\d+(?:\.\d+)?)/; // Regex for identifying subtraction (x - y)
/**
 * Copyright: copied from here: https://stackoverflow.com/a/63105543
 * by @aanrudolph2 https://github.com/aanrudolph2
 *
 * Evaluates a numerical expression as a string and returns a Number
 * Follows standard PEMDAS operation ordering
 * @param {String} expr Numerical expression input
 * @returns {Number} Result of expression
 */
export function evaluate(expr: string): number {
  if (isNaN(Number(expr))) {
    if (parens.test(expr)) {
      const newExpr = expr.replace(parens, (match, subExpr) =>
        String(evaluate(subExpr))
      );
      return evaluate(newExpr);
    } else if (exp.test(expr)) {
      const newExpr = expr.replace(exp, (match, base, pow) =>
        String(Math.pow(Number(base), Number(pow)))
      );
      return evaluate(newExpr);
    } else if (mul.test(expr)) {
      const newExpr = expr.replace(mul, (match, a, b) =>
        String(Number(a) * Number(b))
      );
      return evaluate(newExpr);
    } else if (div.test(expr)) {
      const newExpr = expr.replace(div, (match, a, b) => {
        // b can equal either 0 or "0" this is on purpose
        // eslint-disable-next-line eqeqeq
        if (b != 0) return String(Number(a) / Number(b));
        else throw new Error("Division by zero");
      });
      return evaluate(newExpr);
    } else if (add.test(expr)) {
      const newExpr = expr.replace(add, (match, a: string, b: string) =>
        String(Number(a) + Number(b))
      );
      return evaluate(newExpr);
    } else if (sub.test(expr)) {
      const newExpr = expr.replace(sub, (match, a, b) =>
        String(Number(a) - Number(b))
      );
      return evaluate(newExpr);
    } else {
      return Number(expr);
    }
  }
  return Number(expr);
}
// Example usage
//console.log(evaluate("2 + 4*(30/5) - 34 + 45/2"));

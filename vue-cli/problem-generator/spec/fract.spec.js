import {Fraction} from "../src/lib/fract";
describe("Fraction test suite", function() {
  it("check basic fractional operations", function() {
    let a = new Fraction(5,0,1);
    let b = new Fraction(0,1,2);
    let c = new Fraction(1,3,4);
    a.reduce();
    b.neg();
    c.neg();
    a.add(c);
    a.add(b);

    expect(a.equals(2,3,4)).toBe(true);
    a = new Fraction(5,0,1);
    b = new Fraction(5,1,3);
    c = new Fraction(-1,-3,4);
    b.neg();
    a.add(b);
    expect(a.equals(0,-1,3)).toBe(true);
    a.add(c);
    expect(a.equals(-2,-1,12)).toBe(true);
  });
});

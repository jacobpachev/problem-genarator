let fract = require("../js/fract");
describe("Fraction test suite", function() {
  it("check basic fractional operations", function() {
    let a = new fract.Fraction(5,0,1);
    let b = new fract.Fraction(0,1,2);
    let c = new fract.Fraction(1,3,4);
    a.reduce();
    b.neg();
    c.neg();
    a.add(c);
    a.add(b);
    
    expect(a.equals(2,3,4)).toBe(true);
    a = new fract.Fraction(5,0,1);
    b = new fract.Fraction(5,1,3);
    c = new fract.Fraction(-1,-3,4);
    b.neg();
    a.add(b);
    expect(a.equals(0,-1,3)).toBe(true);
    a.add(c);
    expect(a.equals(-2,-1,12)).toBe(true);
  });
});

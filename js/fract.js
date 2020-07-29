class Fraction {
	constructor (whole,numer,den) {
		this.whole = whole;
		this.numer = numer;
		this.den = den;
	}
	
	extract_whole() {
		var num = ~~(this.numer/this.den);
        
		this.whole += num;
		this.numer -= num*this.den;
		if (this.den < 0) 
		{
			this.numer = -this.numer;
			this.den = -this.den;
		}
		
		if (this.whole > 0 && this.numer < 0) 
		{
			this.whole--;
			this.numer += this.den;
		}
		else if (this.whole < 0 && this.numer > 0) 
		{
			this.numer -= this.den;
			this.whole++;
		}
	}
	reduce() {
		var gcd =  function gcd(a,b){
			return b ? gcd(b, a%b) : a;
		};
		var fract_gcd = gcd(Math.abs(this.numer),Math.abs(this.den))
		this.numer /= fract_gcd;
		this.den /= fract_gcd;
	}
	add(other) {
        this.whole += other.whole;
        this.numer = (this.numer * other.den) + (other.numer * this.den);
        this.den = this.den * other.den;
        this.extract_whole();
        this.reduce();
    }
	
	neg(other) {
        this.whole = -this.whole;
        this.numer = -this.numer;
    }
    equals(whole,numer,den) {
		return this.whole == whole && this.numer == numer && this.den == den;
	}
};
if (exports) 
{
	exports.Fraction = Fraction;
}

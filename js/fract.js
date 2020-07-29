class Fraction {
	function Fraction (whole,numer,den) {
		this.whole = whole;
		this.numer = numer;
		this.den = den;
	}
	
	function extract_whole() {
		var num = ~~(this.numer/this.den);
        if(this.whole < 0  )
		this.whole += num;
		this.numer -= num*den;
	}
	function reduce() {
		var gcd = function gcd(a,b){
			return b ? gcd(b, a%b) : a;
		};
		var fract_gcd = gcd(this.numer,this.den)
		this.numer /= fract_gcd;
		this.den /= fract_gcd;
	}
	function add(other) {
        this.whole += other.whole;
        this.numer = (this.numer * other.den) + (other.numer * this.den);
        this.den = Math.abs(this.den) * Math.abs(other.den);
        this.extract_whole();
        this.reduce();
    }

    function neg(other) {
        this.whole = -this.whole;
        this.numer = -this.numer;
        this.den = this.den * other.den;
        this.extract_whole();
        this.reduce();
    }
};

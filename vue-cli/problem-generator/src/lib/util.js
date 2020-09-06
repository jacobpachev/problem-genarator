import {Fraction} from './fract';

export function range_rand(range) {
	var rand = Math.floor(Math.random() * range)+1;
		return rand;
}

export function rand_fraction (max_val)
{
	let denom = range_rand(max_val);
	if (denom < 2)
		denom = 2;
	return new Fraction(range_rand(max_val), range_rand(denom-1), denom);
}

export function rand_sign()
{
	let rand = Math.random();
	return rand >= 0.5 ? '+' : '-';
}

export function pad(num, size)
{
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

export function fmt_time(t, show_ms)
{
	let tmp = t;
	let ms = tmp % 1000;
	tmp -= ms;
	tmp /= 1000;
	let ss = tmp % 60;
	tmp -= ss;
	let mm = tmp / 60;
	let res = pad(mm, 2) + ":" + pad(ss, 2);

	if (show_ms)
		res += "." + pad(ms, 3);

	return res;
}


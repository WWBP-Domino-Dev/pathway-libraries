function formatCurrency(num) {
	// first make sure they didn't enter formatting characters
	// this function is called by the onBlur() event of a currency field

	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num)) {
		return num;
		//num = "0";
	} else {
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num*100+0.50000000001);
		cents = num%100;
		num = Math.floor(num/100).toString();
		if(cents<10)
			cents = "0" + cents;

		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
			num = num.substring(0,num.length-(4*i+3))+',' + num.substring(num.length-(4*i+3));

		// only care about whole dollars, so don't format cents
		return (((sign)?'':'-') + '$' + num);
	}
}

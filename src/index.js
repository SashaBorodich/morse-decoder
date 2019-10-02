const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {

		let sign = [];
		let result = '';
		let i = 0;	//count sign
		let letter = [];
		let l = 0;	//count letter
		sign[0] = '';
		
		for (let j = 0; j < expr.length; j = j + 2) {

			if ((expr[j] + expr[j+1]) == '10') {
				sign[i] += '.';
			}

			if ((expr[j] + expr[j+1]) == '00') {
				while (expr[j] == '0') {
					j++;
				}
				j-=2;
				if (sign[i] != '') {
					i++;
					sign[i] = '';
				}
			}

			if ((expr[j] + expr[j+1]) == '11') { 
				sign[i] += '-';
			}

			if ((expr[j] + expr[j+1]) == '**') { 
				while (expr[j] == '*') {
					j++;
				}
				j-=2;

				i++;
				sign[i] = ' ';
				sign[++i] = '';
			}
		}
		
		for (let i = 0, l = 0; i < sign.length; i++) {	

			if (Math.floor(sign[i].length / 5 > 0) && sign[i].length > 5) {
				let remainder = sign[i].length % 5;
				let count = Math.floor(sign[i].length / 5);
				
				for (let y = 0, from = 0; y < count+1; y++) {
					letter[l] = sign[i].slice(from, remainder);
					from = remainder;
					remainder += 5;
					l++;
				}
				
			} else {
				letter[l] = sign[i];
				l++;
			}
		}
		
		for (let l = 0; l < letter.length; l++) {


			if (letter[l] == ' ') {
				result += ' ';
				continue;
			}

			for (let key in MORSE_TABLE) {
				if (key == letter[l]) {
					result += MORSE_TABLE[key];
				}
			}

		}

		return result;

}

module.exports = {
    decode
}
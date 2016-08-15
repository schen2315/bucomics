function isValidURL(string) {
	var retVal = true;
	if(string === "") {
		retVal = false;
		return retVal;
	}
	for(var j=0; j < string.length; j++) {
		var code = string[j].charCodeAt(0);
		//'a' - 'z'
		if(code >= 97 && code <= 122) {
			//good
		}
		//'A' - 'Z'
		else if(code >= 65 && code <= 90) {
			//good
		} 
		//'0'-'9'
		else if(code >= 48 && code <= 57) {
			//good
		} 
		//'-'
		else if(code == 45) {
			
		} else {
			retVal = false;
			break;
		}
	}
	return retVal;
}

module.exports = isValidURL;
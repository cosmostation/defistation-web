export const numberWithCommas = (n, pointSizeDownFlag = true) => {
	// var parts=n.toString().split(".");
	// return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
	n = n + '';
	var parts = n.toString().split(".");

	if (pointSizeDownFlag) {
		// 소수점 영역 폰트 크기 줄임 
		return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? ".<sub>" + parts[1] + "</sub>" : "");
	} else {
		return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
	}
}

function capitalize2(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function replaceAll(str, searchStr, replaceStr) {
	return str.split(searchStr).join(replaceStr);
}

export function getCurrencyUnit(amount) {
    // Nine Zeroes for Billions
    return Math.abs(Number(amount)) >= 1.0e+9
    ? "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(amount)) >= 1.0e+6
    ? "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(amount)) >= 1.0e+3
    ? "K"
    : "";
}

export function getCurrencyUnitFullName(amount) {
    // Nine Zeroes for Billions
    return Math.abs(Number(amount)) >= 1.0e+9
    ? "Billion"
    // Six Zeroes for Millions 
    : Math.abs(Number(amount)) >= 1.0e+6
    ? "Million"
    // Three Zeroes for Thousands
    : Math.abs(Number(amount)) >= 1.0e+3
    ? "Thousand"
    : "";
}

export function getCurrencyDigit(amount) {
    // Nine Zeroes for Billions
    return Math.abs(Number(amount)) >= 1.0e+9
    ? 1000000000
    // Six Zeroes for Millions 
    : Math.abs(Number(amount)) >= 1.0e+6
    ? 1000000
    // Three Zeroes for Thousands
    : Math.abs(Number(amount)) >= 1.0e+3
	? 1000
	: 1;
}

export function textEllipsis(input) {
    if (input.length > 85) {
       return input.substring(0, 85) + ' ...';
    }
    return input;
};

export function convertDateFormat(date) {
    // return date.toISOString().substring(0, 10);
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

function fillZeros(n, digits) {  
    var zero = '';  
    n = n.toString();  

    if (n.length < digits) {  
        for (i = 0; i < digits - n.length; i++)  
            zero += '0';  
    }  
    return zero + n;  
}

export function convertDateFormat2(d) {
    var s = fillZeros(d.getFullYear(), 4) + '-' +  
            fillZeros(d.getMonth() + 1, 2) + '-' +  
            fillZeros(d.getDate(), 2) + ' ' +  
      
            fillZeros(d.getHours(), 2) + ':' +  
            fillZeros(d.getMinutes(), 2) + ':' +  
            fillZeros(d.getSeconds(), 2);  

    return s;  
}

export function getOfficialDefiName(defiName) {
    let convertedName;
    switch (defiName) {
        case "pancake":
            convertedName = "PancakeSwap";
            break;
        case "bscSwap":
            convertedName = "BSCSwap";
            break;
        case "Cream Finance":
            convertedName = "C.R.E.A.M. Finance";
            break;
        case "Bakery Swap":
            convertedName = "BakerySwap";
            break;
        case "Narwhalswap":
            convertedName = "NarwhalSwap";
            break;
        case "Stakecow":
            convertedName = "MILK Protocol";
            break;  
        case "STORMSWAP":
            convertedName = "Storm Swap";
            break;        
        default:
            convertedName = defiName;
            break;                                                   
    }
    return convertedName;
}

export function getOfficialCategoryName(category) {
    let convertedName;
    switch (category) {
        case "dex":
            convertedName = "Spot Trading";
            break;
        case "farm":
            convertedName = "Earn";
            break;
        case "YieldOptimization":
            convertedName = "Earn";
            break;  
        case "lending":
            convertedName = "Lending";
            break;      
        case "assets":
            convertedName = "Assets";
            break;    
        case "derivatives":
            convertedName = "Derivatives";
            break;        
        case "payments":
            convertedName = "Payments";
            break;      
        default:
            convertedName = "Misc";
            break;                    
        // default:
        //     convertedName = capitalize2(category);
        //     break;                                                   
    }
    return convertedName;
}
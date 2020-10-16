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

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function replaceAll(str, searchStr, replaceStr) {
	return str.split(searchStr).join(replaceStr);
}
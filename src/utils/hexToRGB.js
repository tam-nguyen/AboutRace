const hexToRGB = (hex,alpha) => {
 var h = "0123456789ABCDEF";
 var r = h.indexOf(hex[1])*16+h.indexOf(hex[2]);
 var g = h.indexOf(hex[3])*16+h.indexOf(hex[4]);
 var b = h.indexOf(hex[5])*16+h.indexOf(hex[6]);
 if(alpha) return `rgba(${r},${g},${b},${alpha})`
 else return `rgb(${r},${g},${b})`
}

export default hexToRGB

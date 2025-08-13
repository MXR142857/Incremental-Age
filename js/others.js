function n(number){
    return new Decimal(number)
}
function mod(num1,num2){
    return num1.sub(num1.div(num2).floor().mul(num2));
}
function max(num1,num2){
    if(num1.gte(num2)) return num1
    else return num2
}
function min(num1,num2){
    if(num1.gte(num2)) return num2
    else return num1
}
function w(id,data){
    document.getElementById(id).innerHTML = data
}
function e(id){
    return document.getElementById(id)
}

var zero = n(0)
var one = n(1)
var two = n(2)
var ten = n(10)

var year=n(31536000),uni=year.mul(13800000000)
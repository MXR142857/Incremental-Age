var t = new Date()
var diff = n(0)
var timestart = n(0)
var shift = false
//define player
var player = {}
load("IA")
function loadAllData() {
    loader("playTime", 0);
    loader("age", n(0)); loader("ageAll", n(0))
    loader(["ab", 1], n(1));loader(["ab", 2], n(1));loader(["ab", 3], n(0))
    loader("cultivation", n(0));loader("ctAll",n(0))
    loader("cr", n(1)); loader("crTime", n(0))
    loader(["curTab", 0], "Age");loader(["curTab", 1], "Spd");loader(["curTab", 2], "Qj")
    loader(["unlocked","cul"],false);loader(["unlocked","reni"],false)
    loader("RP",n(0));loader("RPo",n(0))
    for(var i=1;i<=3;i++) loader(["rb",i],n(0))
    for(var i=1;i<=3;i++) loader(["autoAb",i],false)
    for (var i0 = 1; i0 <= 70; i0++) loader(["ach", i0], false)
}
loadAllData()
var timer = Number(t.getTime())
function setup() {
    let tmpStr = ""
    for (var i = 1; i <= 3; i++) {
        tmpStr =
            `<span id="b${i}Title" style="text-align: left;grid-area:a;"></span>
        <span id="b${i}Discription" style="text-align: left;grid-area:b;"></span>
        <button class="buttonf" style="grid-area:c;" id="b${i}Button" onclick="buyAB(${i})"></button>`
        e("ab" + i).innerHTML = tmpStr;
    }
    tmpStr = ``
    for (var i = 1; i <= 3; i++) {
        tmpStr +=
            `<button class="button3" id="rb${i}" onclick="buyRb(${i})">
                <span id="rb${i}t"></span><span id="rb${i}d" style="font-size:14px"></span><span id="rb${i}c" style="font-size:14px"></span>
            </button>`
    }
    e("rb").innerHTML = tmpStr
    //<button class="button3" id="rb1" onclick="buyRb(1)"><span id="rb1t"></span><span id="rb1d" style="font-size:14px"></span><span id="rb1c" style="font-size:14px"></span></button>
    tmpStr = ``
    for (var i = 1; i <= Object.keys(crEff).length; i++) {
        tmpStr += `<div id="staIr${i}"></div>`
    }
    e("staIr").innerHTML = tmpStr
    tmpStr = ``
    for (var i = 1; i <= 14; i++) {
        tmpStr += `<span id="a${i}" style="position:relative">
        <span id="kuang${i}" style="font-size:12px"></span>
        <span id="img${i}" style="width:100px;height:100px" onmouseover="showKuang(${i})" onmouseleave="hideKuang(${i})"><img src="images/locked.png" width="100" height="100" onmouseover="showKuang(${i})" onmouseleave="hideKuang(${i})"></span>
        </span>`
    }
    e("achBox").innerHTML = tmpStr;
    console.log(player.curTab)
    for (i in player.curTab) {
        changeTab(player.curTab[i])
    }
    
    HTMLupdate()
}

setup()
t = new Date()
timestart = t.getTime()
console.log("游戏初始化使用了" + (Number(t.getTime()) - timer) + "ms")
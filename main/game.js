
function HTMLupdate() {
    //
    e("age").innerHTML = formatTime(player.age)
    e("agePerSec").innerHTML = formatTime(getAgePerSec())
    for (var i = 1; i <= 3; i++) {
        e("b" + i + "Title").innerHTML = getABTitle(i) + "Lv." + format(getABLevel(i))
        if(getABExtraLevel(i).gt(0)) e("b" + i + "Title").innerHTML +="+"+format(getABExtraLevel(i))
        e("b" + i + "Discription").innerHTML = getABDiscription(i)
        e("b" + i + "Button").innerHTML = "价格：" + formatTime(getABCost(i))
    }
    e("cultivation").innerHTML = "修为：" + format(player.cultivation)
    e("startImc").innerHTML = isCuling ? "修炼中(" + format(culProg) + "%)" : "开始修炼"
    e("getCultivationText").innerHTML = getRbLevel(3).gte(1)? "每秒获得" + format(getCultivationPerCul()) + "修为" :"每次修炼可获得" + format(getCultivationPerCul()) + "修为"
    e("cr").innerHTML = getCrTitle()
    if(nextEffCrId()==Infinity) e("crDisc").innerHTML = ""
    else e("crDisc").innerHTML = "当达到" + formatCR(getCrEffNeed(nextEffCrId())) + "时，" + getCrEffDisc(nextEffCrId())
    e("crNeed").innerHTML = "需要：" + format(getCrNeed()) + "修为"
    e("reniReset").innerHTML="重置之前所有内容，获得"+format(getRPGain())+"轮回点（RP）"
    e("RP").innerHTML="轮回点："+format(player.RP)
    e("RPo").innerHTML=`轮回力量：${format(player.RPo)}(+${format(getRPoPerSec())}/s)`
    e("RPoEff").innerHTML=`使年龄和修为获取*${format(getRpoEffect())}${getRpoEffect().gte("1e30")?"(已达软上限)":""}`
    for (var i = 1; i <= 3; i++) {
        e("rb" + i + "t").innerHTML = getRbTitle(i) + " Lv." + format(getRbLevel(i))+"<br>"
        if(getRbExtraLevel(i).gt(0)) e("b" + i + "t").innerHTML +="+"+format(getRbExtraLevel(i))
        e("rb" + i + "d").innerHTML = getRbDiscription(i)+"<br>"
        e("rb" + i + "c").innerHTML = "价格：" + format(getRbCost(i))+"RP"
    }
    //auto
    e("autoAB1").checked=player.autoAb[1]
    e("autoAB2").checked=player.autoAb[2]
    e("autoAB3").checked=player.autoAb[3]
    //sta
    e("staAgeAll").innerHTML = "总计年龄：" + format(player.ageAll)
    e("staPlayTime").innerHTML = "游玩时间：" + formatTimen(player.playTime)
    e("staDl").innerHTML=stadl()
    e("staCtAll").innerHTML = "总计修为：" + format(player.ctAll)
    for(var i=1;i<=Object.keys(crEff).length;i++){
        e("staIr"+i).style.display=hasCrEff(i)?"block":"none"
        e("staIr"+i).innerHTML=formatCR(getCrEffNeed(i))+"："+getCrEffDisc(i)
    }

    if (curAchShow && e("achDiscription")) e("achDiscription").innerHTML = getAchDiscription(curAchShow)
    for (var i = 1; i <= 14; i++) {
        if (hasAch(i) && !realShow[i]) {
            realShow[i] = true;
            e("img" + i).innerHTML = `<img src="images/a${i}.jpg" width="100" height="100"></img>`
        }
    }
}
var tabs = [["Age","Auto", "Ach", "Sta", "Set"], ["Spd", "Imc"], ["Qj", "Ir"]]
function changeTab(showingTab) {
    var f = false;
    for (i in tabs) {
        for (var j = 0; j < tabs[i].length; j++) {
            if (!f && showingTab == tabs[i][j]) {
                f = true
                j = 0
            }
            if (f) {
                console.log("tab" + tabs[i][j])
                if (showingTab == tabs[i][j]) {
                    player.curTab[i] = tabs[i][j]
                    e("tab" + tabs[i][j]).style.display = "block"
                    e("tabb" + tabs[i][j]).className = "inTabButton"
                } else {
                    e("tab" + tabs[i][j]).style.display = "none"
                    e("tabb" + tabs[i][j]).className = "tabButton"
                }
            }
        }
        if (f) break;
    }
}


function isLongPressing(element) {
    if (!element._longPressData) {
        element._longPressData = {
            isPressing: false,
            startTime: 0,
            longPressTriggered: false
        };

        const resetState = () => {
            element._longPressData.isPressing = false;
            element._longPressData.longPressTriggered = false;
        };

        // 鼠标事件
        element.addEventListener('mousedown', (e) => {
            element._longPressData.isPressing = true;
            element._longPressData.startTime = Date.now();
        });

        element.addEventListener('mouseup', resetState);
        element.addEventListener('mouseleave', resetState);

        // 触摸事件
        element.addEventListener('touchstart', (e) => {
            element._longPressData.isPressing = true;
            element._longPressData.startTime = Date.now();
        }, { passive: true });

        element.addEventListener('touchend', resetState);
        element.addEventListener('touchcancel', resetState);
    }

    const data = element._longPressData;

    // 检测长按条件
    if (data.isPressing && !data.longPressTriggered) {
        if (Date.now() - data.startTime >= 200) {
            data.longPressTriggered = true;
            return true;
        }
        return false;
    }

    return data.longPressTriggered;
}
function calcDiff() {
    t = new Date()
    diffn = (Number(t.getTime()) - timestart) / 1000
    diff = n((Number(t.getTime()) - timestart) / 1000)
    if(pause){
        diffn=0
        diff=n(0)
    }
    timestart = t.getTime()
}
var pause=false
function ps(){
    pause=!pause
}
function gameloop() {
    takeAch()
    calcDiff()
    player.playTime = player.playTime + diffn
    for (var i = 1; i <= 3; i++) if (isLongPressing(e("b" + i + "Button"))) buyAB(i)
    for (var i = 1; i <= 3; i++) if (player.autoAb[i]) ab[i].buyMax()
    player.age = player.age.add(getAgePerSec().mul(diff))
    player.ageAll = player.ageAll.add(getAgePerSec().mul(diff))
    player.crTime = player.crTime.add(diff.mul(getCtm()))
    if (isLongPressing(e("startImc"))) startCul()
    if (isLongPressing(e("buyCR"))) crReset()
    player.RPo = player.RPo.add(getRPoPerSec().mul(diff))
    calcCulProg()
    
    HTMLupdate()
    save("IA")
}

setInterval(gameloop, 50)


function hotkey() {
    var a = window.event.keyCode;
    //64+字母序数
    //alert(a)
    switch (a) {
        //M
        case 77:
            break;

        //shift
        case 16:
            shift = true
            break
    }
}
function disableHotkey() {
    var a = window.event.keyCode;
    //64+字母序数
    //alert(a)
    switch (a) {
        //shift
        case 16:
            shift = false
            break
    }
}
document.onkeydown = hotkey;
document.onkeyup = disableHotkey;
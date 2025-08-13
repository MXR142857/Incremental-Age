function getAgePerSec() {
    x = getABEffect(1).mul(getABEffect(2))
    if (hasCrEff(1)) x = x.mul(3)
    if (hasCrEff(2)) x = x.mul(getCrEffect(2))
    if (hasCrEff(3)) x = x.mul(getCrEffect(3))
    if (hasCrEff(5)) x = x.mul(getCrEffect(5))
    if (hasAch(4)) x = x.mul(getAchEfffect(4))
    x = x.mul(getRpoEffect())
    x=x.mul(getCtm())
    return x
}
var ab = {
    1: {
        id: 1,
        title: "时光龟",
        discription() { return `使年龄获取*${format(this.effect())}${this.effect().gte("1e100")?"(已达软上限)":""}` },
        effect(x = getABLevel(this.id).add(getABExtraLevel(this.id))) {
            var b = n(1.5)
            if (hasCrEff(13)) b = b.add(0.1)
            if (hasCrEff(16)) b = b.add(getCrEffect(16))
            var y=x.mul(b.pow(x.div(10).floor()))
            if(y.gte("1e100")) y=y.div("1e100").pow(0.5).mul("1e100")
            return y
        },
        cost(x = getABLevel(this.id)) { return n(5).mul(n(1.2).pow(x)) },
        buyMax() {
            var x = player.age
            if (canBuyAB(this.id)) {
                player.ab[this.id] = x.div(5).log(1.2).floor().add(1)
            }
        },
    },
    2: {
        id: 2,
        title: "助推器",
        discription() { return `使年龄获取再*${format(this.effect())}` },
        effect(x = getABLevel(this.id)) {
            var b = n(1)
            if (hasCrEff(4)) b = b.mul(getCrEffect(4))
            if (hasCrEff(8)) b = b.mul(getCrEffect(8))
            return x.mul(b).pow(getABEffect(3))
        },
        cost(x = getABLevel(this.id)) { return n(300).mul(n(1.35).pow(x.sub(1))) },
        buyMax() {
            var x = player.age
            if (canBuyAB(this.id)) {
                player.ab[this.id] = x.div(300).log(1.35).add(1).floor().add(1)
            }
        },
    },
    3: {
        id: 3,
        title: "次方引擎",
        discription() { return `使助推器的效果^${format(this.effect())}` },
        effect(x = getABLevel(this.id)) {
            return x.mul(0.2).add(1)
        },
        cost(x = getABLevel(this.id)) {
            if (hasCrEff(7)) return n(10800).mul(n(2).pow(x.pow(2).div(2)))
            return n(10800).mul(n(2).pow(x.add(0.5).pow(2).sub(0.25).div(2)))
        },
        buyMax() {
            var x = player.age
            if (canBuyAB(this.id)) {
                player.ab[this.id] = x.div(10800).log(2).mul(2).sqrt().floor().add(1)
            }
        },
    },
}
function getABTitle(id) {
    return ab[id].title
}
function getABDiscription(id) {
    return ab[id].discription()
}
function getABLevel(id) {
    return player.ab[id]
}
function getABExtraLevel(id) {
    if (id == 1) {
        if (hasCrEff(14)) return getCrEffect(14)
    }
    return n(0)
}
function getABEffect(id) {
    return ab[id].effect()
}
function getABCost(id) {
    let lv = getABLevel(id)
    return ab[id]["cost"](lv)
}
function canBuyAB(id) {
    return player.age.gte(getABCost(id))
}
function buyAB(id) {
    if (canBuyAB(id)) {
        player.age = player.age.sub(getABCost(id))
        player.ab[id] = player.ab[id].add(1)
    }
}
function changeAutoAb(ele, id) {
    if (ele.checked) player.autoAb[id] = true
    else player.autoAb[id] = false
}
var culProg = n(0), isCuling = false
function startCul() {
    isCuling = true
}
function stopCul() {
    isCuling = false
}
function getCulSpeed() {
    var x = n(20).mul(getCtm())
    if (hasAch(7)) x = x.mul(2)
    if (hasAch(11)) x = x.mul(2.5)
    return x
}
function calcCulProg() {
    if (getRbLevel(3).gte(1)) {
        isCuling = true
        culProg = n(100)
        player.cultivation = player.cultivation.add(getCultivationPerCul().mul(diff))
        player.ctAll = player.ctAll.add(getCultivationPerCul().mul(diff))
    } else {
        if (isCuling) culProg = culProg.add(getCulSpeed().mul(diff))
        if (culProg.gte(100)) {
            isCuling = false
            culProg = n(0)
            player.cultivation = player.cultivation.add(getCultivationPerCul())
            player.ctAll = player.ctAll.add(getCultivationPerCul())
        }
    }
}
function getCultivationPerCul() {
    var x = player.age.div(year).div(80).root(3).mul(10)
    if (hasCrEff(11)) x = x.mul(10)
    x = x.mul(getRpoEffect())
    if(hasAch(14)) x=x.mul(4).mul(getCtm())
    return x
}
function getCrTitle() {
    var x = player.cr
    if (x.lte(20)) return "当前境界：" + formatCR(player.cr)
    else return "折算|境界：" + formatCR(player.cr)
}
function getCrNeed() {
    var x = player.cr, y
    if (x.gt(20)) x = x.div(20).pow(2).mul(20)
    y = n(20).mul(n(3).pow(x.add(8).pow(2).sub(81).div(18)))
    y = y.root(getRbEffect(3))
    return y
}
var crEff = {
    1: {
        need: n(2),
        discription() { return "年龄获取速度*3" },
    },
    2: {
        need: n(3),
        effect() {
            var x = player.age.add(1).log10().div(4).add(1)
            if (hasCrEff(12)) x = x.div(getCrEffect(12)).add(1).pow(getCrEffect(12))
            return x
        },
        discription() { return "年龄提升自身获取量。当前：*" + format(this.effect()) },
    },
    3: {
        need: n(4),
        effect() {
            var b = n(2)
            if (hasCrEff(10)) b = b.add(getCrEffect(10))
            return max(b.pow(player.cr.sub(3)), n(1))
        },
        discription() { return "从练气四层开始，每提升一层境界，年龄获取*2。当前：*" + format(this.effect()) },
    },
    4: {
        need: n(5),
        effect() {
            x = player.crTime.div(50)
            if (hasCrEff(6)) x = x.mul(2)
            return x.add(1)
        },
        discription() { return "基于境界提升后的时间，提高助推器基础效果。当前：*" + format(this.effect()) },
    },
    5: {
        need: n(6),
        effect() { return player.cultivation.sqrt().div(10).add(1) },
        discription() { return "基于修为，提升年龄获取。当前：*" + format(this.effect()) },
    },
    6: {
        need: n(8),
        discription() { return "练气四层的效果翻倍。" },
    },
    7: {
        need: n(9),
        discription() { return "改善次方引擎的价格公式。" },
    },
    8: {
        need: n(10),
        effect() { return getABLevel(2).div(100).add(1) },
        discription() { return "助推器的等级也会提高自身效果基数。当前：*" + format(this.effect()) },
    },
    9: {
        need: n(11),
        discription() { return "解锁自动化。" },
    },
    10: {
        need: n(12),
        effect() { return max(n(0.1).mul(player.cr.sub(10)), n(0)) },
        discription() { return "根据境界，提升练气四层奖励基数。当前：+" + format(this.effect()) },
    },
    11: {
        need: n(15),
        discription() { return "修为获取*10" },
    },
    12: {
        need: n(16),
        effect() { return n(1).add(n(0.5).mul(max(player.cr.sub(10), n(0))).pow(0.8)) },
        discription() { return "基于境界，练气二层奖励先除以x，再变为x次方。当前：" + format(this.effect()) },
    },
    13: {
        need: n(18),
        discription() { return "时光龟每升10级获得的增益增加0.1" },
    },
    14: {
        need: n(20),
        effect() { return getABLevel(2).div(10).floor() },
        discription() { return "每购买10次助推器，就提供1免费时光龟等级。当前：+" + format(this.effect()) },
    },
    15: {
        need: n(21),
        discription() { return "解锁破境轮回" },
    },
    16: {
        need: n(25),
        effect() {
            x = player.crTime.div(10).add(1).log10().div(10)
            return x
        },
        discription() { return "基于境界提升后的时间，提高时光龟每升10级获得的增益。当前：+" + format(this.effect(), 4) },
    },
    17: {
        need: n(27),
        discription() { return "轮回点获取*2。"},
    },
    18: {
        need: n(28),
        discription() { return "提高年龄对轮回力量获取加成的指数"},
    },
    19: {
        need: n(31),
        discription() { return "提高轮回力量的效果指数"},
    },
}
function getCrEffect(x) {
    return crEff[x].effect()
}
function getCrEffDisc(x) {
    return crEff[x].discription()
}
function getCrEffNeed(x) {
    return crEff[x].need
}
function hasCrEff(id) {
    return player.cr.gte(getCrEffNeed(id))
}
function nextEffCrId() {
    var x = player.cr
    for (var i = 1; i <= Object.keys(crEff).length; i++) {
        if (x.lt(getCrEffNeed(i))) return i
    }
    return Infinity
}
function getCtm(){
    var x=n(1)
    if(hasAch(13)) x=x.mul(2)
    return x
}
function crReset() {
    if (player.cultivation.lt(getCrNeed())) return
    player.age = n(0)
    player.ab[1] = n(1)
    player.ab[2] = n(1)
    player.ab[3] = n(0)
    player.cultivation = n(0)
    player.crTime = n(0)
    player.cr = player.cr.add(1)
}
function getRPGain() {
    if (player.age.gte(uni.mul("1e50"))) {
        var x = player.age.div(uni.mul("1e50"))
        x = n(10).pow(x.log10().pow(0.9).mul(0.05))
        x = x.mul(getRbEffect(1))
        if(hasCrEff(17)) x=x.mul(2)
        return x
    }
    return n(0)
}
function getRPoPerSec() {
    var x = player.RP.pow(getRbEffect(2)).div(100)
    if(hasCrEff(18)) x = x.mul(player.age.root(75))
    else x = x.mul(player.age.root(100))
    return x
}
function reniReset() {
    if (player.age.lt(player.age.gte(uni.mul("1e50")))) return
    player.RP = player.RP.add(getRPGain())
    player.RPo = n(0)
    player.age = n(0)
    player.ab[1] = n(1)
    player.ab[2] = n(1)
    player.ab[3] = n(0)
    player.cultivation = n(0)
    player.crTime = n(0)
    player.cr = n(1)
}
function getRpoEffect() {
    var x=player.RPo.div(10)
    if(hasCrEff(19)) x=x.pow(2).add(1)
    else  x=x.pow(1.5).add(1)
    if(x.gte("1e30")) x=x.div("1e30").pow(0.75).mul("1e30")
    return x
}
var rb = {
    1: {
        id: 1,
        title: "轮回复制",
        discription() { return `轮回点获取*${format(this.base())}<br>当前：*${format(this.effect())}` },
        base() { return n(2) },
        effect(x = getRbLevel(this.id)) {
            var b = this.base()
            return b.pow(x)
        },
        cost(x = getABLevel(this.id)) { return n(100).mul(n(10).pow(x)) },
        buyMax() {

        },
    },
    2: {
        id: 2,
        title: "金坷垃？",
        discription() { return `轮回力量的产生指数变为${format(this.effect())}` },
        effect(x = getRbLevel(this.id)) {
            return n(2).add(x.pow(0.8).div(4))
        },
        cost(x = getABLevel(this.id)) { return n(50000).mul(n(10).pow(x.add(3).pow(2).sub(9).div(5))) },
        buyMax() {

        },
    },
    3: {
        id: 3,
        title: "破障通明",
        discription() { return `境界提升需求变为${format(this.effect())}次方根` },
        effect(x = getRbLevel(this.id)) {
            return x.add(10).pow(0.6).sub(2.981071706)
        },
        cost(x = getABLevel(this.id)) { return n(3000).mul(n(10).pow(x.add(5).pow(2).sub(25).div(10))) },
        buyMax() {

        },
    },
}
function getRbTitle(id) {
    return rb[id].title
}
function getRbDiscription(id) {
    return rb[id].discription()
}
function getRbLevel(id) {
    return player.rb[id]
}
function getRbExtraLevel(id) {
    return n(0)
}
function getRbEffect(id) {
    let lv = getRbLevel(id)
    return rb[id].effect(lv)
}
function getRbCost(id) {
    let lv = getRbLevel(id)
    return rb[id]["cost"](lv)
}
function canBuyRb(id) {
    return player.RP.gte(getRbCost(id))
}
function buyRb(id) {
    if (canBuyRb(id)) {
        player.RP = player.RP.sub(getRbCost(id))
        player.rb[id] = player.rb[id].add(1)
    }
}
function changeAutoRb(ele, id) {
    if (ele.checked) player.autoRb[id] = true
    else player.autoRb[id] = false
}
var ach={
    1:{
        id:1,
        title:"启程",
        discription() { return "升级一次时光龟"},
        need(){ return getABLevel(1).gte(2)},
    },
    2:{
        id:2,
        title:"第二个因子",
        discription() { return "升级一次助推器"},
        need(){ return getABLevel(2).gt(1)},
    },
    3:{
        id:3,
        title:"这么快就乘方了？",
        discription() { return "升级一次次方引擎"},
        need(){ return getABLevel(3).gte(1)},
    },
    4:{
        id:4,
        title:"这是升级游戏吗？",
        discription() { return "时光龟、助推器、次方引擎三者等级之和达到100。奖励：基于三者等级之和提高年龄获取*"+format(this.effect())},
        need(){ return getABLevel(1).add(getABLevel(2)).add(getABLevel(3)).gte(100)},
        effect(){return getABLevel(1).add(getABLevel(2)).add(getABLevel(3)).div(100).add(1)}
    },
    5:{
        id:5,
        title:"奇怪的知识增加了",
        discription() { return "年龄达到80岁。奖励：解锁修仙"},
        need(){ return player.age.gte(n(80).mul(year.mul(80)))},
    },
    6:{
        id:6,
        title:"万法归宗",
        discription() { return "修为达到10000"},
        need(){ return player.cultivation.gte(10000)},
    },
    7:{
        id:7,
        title:"筑“基”",
        discription() { return "境界达到筑基一层。奖励：修炼速度*2"},
        need(){ return player.cr.gte(11)},
    },
    8:{
        id:8,
        title:"这个宇宙度量很弱欸",
        discription() { return "年龄达到1宇宙年龄。奖励：你知道某些东西可以长按"},
        need(){ return player.age.gte(uni)},
    },
    9:{
        id:9,
        title:"该来的还是来了…………",
        discription() { return "某个东西达到软上限"},
        need(){ return getRpoEffect().gte("1e30")},
    },
    10:{
        id:10,
        title:"恶臭成就",
        discription() { return "时、助、次三者等级之和达到1145。奖励：呃，哼，哼，啊啊啊啊啊啊啊呃啊啊啊啊啊啊，啊啊啊啊啊"},
        need(){ return getABLevel(1).add(getABLevel(2)).add(getABLevel(3)).gte(1145)},
    },
    11:{
        id:11,
        title:"丹疼",
        discription() { return "破境轮回一次。奖励：修炼速度*一坤"},
        need(){ return player.RP.gt(0)},
    },
    12:{
        id:12,
        title:"你能恰好达成12个成就吗",
        discription() { return "达成12个成就"},
        need(){ return Object.keys(player.ach).length>=12},
    },
    13:{
        id:13,
        title:"大数入门？",
        discription() { return "年龄达到1古戈尔。奖励：境界提升时间流速*2"},
        need(){ return player.age.gte(uni.mul("1e100"))},
    },
    14:{
        id:14,
        title:"诈骗",
        discription() { return "升级“破障通明”。奖励：当破障通明等级超过0时，修为自动获取"},
        need(){ return getRbLevel(3).gte(1)},
    },
}
function hasAch(id){
    return player.ach[id]
}
function getAchEfffect(id){
    return ach[id].effect()
}
function getAchTitle(id){
    return ach[id].title
}
function getAchDiscription(id){
    return ach[id].discription()
}
function takeAch(){
    for(var id=1;id<=Object.keys(ach).length;id++)
    if(ach[id].need()) player.ach[id]=true
}
var curAchShow=0,realShow=[]
function showKuang(i){
    console.log("show"+i)
    curAchShow=i
    e("kuang"+i).innerHTML=`<span class="achKuang"><span>${getAchTitle(i)}</span><span id="achDiscription" style="font-size:13px"></span></span>`;
}
function hideKuang(i){
    console.log("hide"+i)
    e("kuang"+i).innerHTML=``;
}
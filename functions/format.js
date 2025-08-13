//var standard = ["k","m"]
function format(x,p = 2){
    if(x.lt(0)) return "-"+format(x.neg(),p)
    if(x.eq(0)) return "0"
    if(x.lte(10000)){
        return x.toFixed(p)
    }
    var exp = x.log10().floor()
    var mag = x.div(n(10).pow(exp))
    return `${format(mag,2)}e${format(exp,0)}`
}

function formatWhole(x){
    return format(x,0)
}

function formatTime(x){
    if(x.lt(60)) return format(x)+"秒"
    if(x.lt(3600)) return format(x.div(60))+"分"
    if(x.lt(86400)) return format(x.div(3600))+"时"
    if(x.lt(31536000)) return format(x.div(86400))+"天"
    if(x.lt(31536000*138*10**8)) return format(x.div(31536000))+"年"
    return format(x.div(31536000*138*10**8))+"宇宙年龄"
}
var cr=["练气","筑基","金丹","元婴","化神","合体","渡劫","大乘"]
var cha=["一","二","三","四","五","六","七","八","九","十"]
function formatCR(x){
    if(x.lte(80)){
        //console.log(format(mod(x.sub(1),n(10))))
        return cr[format(x.sub(1).div(10).floor())-0]+cha[format(mod(x.sub(1),n(10)))-0]+"层"
    }else{
        return cr[7]+format(x.sub(70))+"层"
    }
}
function formatTimen(x){
    var s=(x%60).toFixed(3);x=Math.floor(x/60)
    var m=x%60;x=Math.floor(x/60)
    var h=x%24;x=Math.floor(x/24)
    var d=x%365;x=Math.floor(x/365)
    var y=x,str='',f=false
    if(y!=0||f){f=true;str+=y+" y "}
    if(d!=0||f){f=true;str+=d+" d "}
    if(h!=0||f){f=true;str+=h+" h "}
    if(m!=0||f){f=true;str+=m+" m "}
    str+=s+" s"
    return str
}

function stadl(){
    var x=player.age
    if(x.lt(6.4)) return `你的年龄足够眨眼${x.div(0.4)}次`
    if(x.lt(2400)) return `你的年龄足够呼吸${x.div(6.4)}次`
    if(x.lt(28800)) return `你的年龄足够上${x.div(2400)}节课`
    if(x.lt(666666)) return `你的年龄足够睡${x.div(28800)}觉`
    if(x.lt(283824000)) return `你的年龄足够在《升镐UYPickaxe》中在各量产器三级无词缀时合成${x.div(666666)}个精神支柱`
    if(x.lt(1.5768e11)) return `你的年龄足够进行${x.div(283824000)}次九年义务教育`
    if(x.lt(6.3072e15)) return `你的年龄足够单位质量碳十四减半${x.div(1.5768e11)}次`
    if(x.lt(5.574e20)) return `你的年龄足够细胞色素c的氨基酸序列发生1%的改变${x.div(6.3072e15)}次`
    if(x.lt(5.214e46)) return `假如一个人每秒数3个，你的年龄足够他数完${x.div(5.574e20)}个地球的水分子数`
    if(x.lt(5.214e71)) return `假如一个人每秒数3个，你的年龄足够他数完${x.div(5.574e20)}个宇宙的水分子数`
    var y=x.div(4.605163).pow(3.321928).log10().floor()
    return `假如一个人每秒打开一次QwQ Random网站，你的年龄足够连续抛至少${format(y)}次抛硬币为正面的概率超过99%`
}
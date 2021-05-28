setTimeout(function(){
    siteWelcome.classList.remove('active')
},1000)   

window.onscroll = function(){
    if(window.scrollY > 0){
        siteNav.classList.add('sticky')
    }else{
        siteNav.classList.remove('sticky')
    }
}
let liTags = document.querySelectorAll('nav > div > ul > li')
for(let i=0; i<liTags.length;i++){
    liTags[i].onmouseenter =function(x){
        x.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function(x){
        x.currentTarget.classList.remove('active')
    }
}

// 监听click事件
let sb = document.querySelector('.sideBar')
let lines = document.querySelector('.lines')
lines.onclick = function(e){
    sb.classList.remove('hide')

}

let closed = document.querySelector('.sideBar > .closed')
closed.onclick = function(e){
    sb.classList.add('hide')
}
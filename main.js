var key = [
    [
        'esc','F1','F2','F3','F4','F5',
        'F6','F7','F8','F9','F10','F11',
        'F12','Print','Pause','Del',
    
    ],
    
    [
        '`','1','2','3','4','5','6',
        '7','8','9','0','-','=','Back','Home',
    ],
    
    [
        'Tab','q','w','e','r','t','y',
        'U','I','O','P','[',']','\\','Up'
    ],
    
    [
        'Ctrl','a','s','d','f','g','h',
        'j','k','l',';','\'','Enter','Down',
    ],
    
    [
        'Shift','z','x','c','v','b','n',
        'm',',','.','/','Shift','↑','End',
    ],
    
    [
        'Caps','option','command','NIZ','Alt','Fn',
        'Ctrl','←','↓','→',
    ],
    
]
// js中的hash
var hash = {
    
        'esc':'网址','F1':'网址','F2':'网址','F3':'网址','F4':'网址','F5':'网址',
        'F6':'网址','F7':'网址','F8':'网址','F9':'网址','F10':'网址','F11':'网址',
        'F12':'网址','Print':'网址','Pause':'网址','Del':'网址',
    
        '`':'网址','1':'网址','2':'网址','3':'网址','4':'网址','5':'网址','6':'网址',
        '7':'网址','8':'网址','9':'网址','0':'网址','-':'网址','=':'网址','Back':'网址','Home':'网址',
    
        'Tab':'网址','q':'qq.com','w':'weibo.com','e':'','r':'网址','t':'','y':'youtube.com',
        'u':'网址','i':'iconfont.cn','o':'网址','p':'网址','[':'网址',']':'网址','\\':'网址','Up':'网址',
    
        'Ctrl':'网址','a':'acfun.com','s':'sm.ms','d':'dribble.com','f':'','g':'github.com','h':'网址',
        'j':'jdbbs.com','k':'网址','l':'网址',';':'网址','\'':'网址','Enter':'网址','Down':'网址',
    
        'Shift':'网址','z':'网址','x':'网址','c':'cssgradient.io','v':'v2ex.com','b':'bilili.com','n':'网址',
        'm':'mcguffen.github.io',',':'网址','.':'网址','/':'网址','Shift':'网址','↑':'网址','End':'网址',
    
        'Caps':'网址','option':'网址','command':'网址','long':'网址','Alt':'网址','Fn':'网址',
        'Ctrl':'网址','←':'网址','↓':'网址','→':'网址',
    
}
// 浏览器中的hash
// 取出localStorage中的'userWebsiteEdit'内容，因为是字符串所以解析成hash
var hashInLocalStorage = JSON.parse(localStorage.getItem('userWebsiteEdit') || 'null')

// 覆盖修改前的js给浏览器的hash 
if(hashInLocalStorage){
    hash = hashInLocalStorage
}

keyboard = document.getElementById("keyboard")

// 遍历keys，生成kbd标签。
index = 0
while(index < key.length){
    // index 0 1 2 3 4 5
    // row 代表第 1 2 3 4 5个数组
    row = key[index]
    // console.log(row)
    div = document.createElement("div")
    div.className = 'row'
    keyboard.appendChild(div)

    index2 = 0
    while(index2 < row.length){
        kbd = document.createElement('kbd')
        kbd.textContent = row[index2]
        kbd.className = 'key'
        // 给按键添加一个编辑按钮
        buttonEdit = document.createElement('button')
        buttonEdit.textContent = "edit"
        buttonEdit.id = row[index2]
        // 添加网址icon图标
        imgIcon = document.createElement('img')
        if(hash[row[index2]]){
            imgIcon.src = 'http://' + hash[row[index2]] + '/favicon.ico'
        }else{
            imgIcon.src = '//i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg'
            console.log('上面图片一定成功，如果失败说明图挂了。')
        }
        imgIcon.onerror = function(e){
            console.log("下载失败了,帮你添加一个肯定成功的favicon.ico,地址为https://i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg")
            e.target.src = '//i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg'
        }


        buttonEdit.onclick = function(e){
            // 用户输入的键 e[target]就是用户点击的元素
            button =  e.target
            key = button.id
            // 就是在用户点击button的时候重新获取imgIconNew图片地址
            imgIconNew = button.previousSibling
            userWebsiteEdit = prompt('请输入您想输入的网址')
            // 将用户输入的网址存入对应的hash中去
            hash[key] = userWebsiteEdit // hash 变更
            imgIconNew.src = 'http://' + userWebsiteEdit + '/favicon.ico'
            imgIconNew.onerror = function(e){
                console.log("下载失败了,帮你添加一个肯定成功的favicon.ico,地址为https://i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg")
                e.target.src = '//i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg'
            }

            // 只要用户修改website 就将修改后的hash存入'userWebsiteEdit'保存
            // 由于这个方法只接受参数是string所以将hash转换成字符串存入
            localStorage.setItem('userWebsiteEdit',JSON.stringify(hash))
            // console.log(hash);
        }
        kbd.appendChild(imgIcon)
        kbd.appendChild(buttonEdit)
        div.appendChild(kbd)
        index2 += 1

    }
    
     index += 1

}

document.onkeypress = function(e){
    // 监听键盘按下的按键
        key = e['key'] // qwertyuiop[]\
        website = hash[key]
        console.log(website)
        // 将当前浏览器页面地址换成我们按下按键对应的地址
        // 模拟用户在地址栏输入
        // location.href = 'http://' + website
        //在浏览器新页面窗口打开我们按下按键对应的网址
        // 模拟用户新打开一个浏览器页面
        window.open('http://' + website, '_blank')
}


// 1。 初始化数据
var init = initData()
var keys = init['keys']
var hash = init['hash']

// 2. 生成键盘
generateKeboard(keys,hash)


// 3. 监听用户键盘操作
listenToUser(hash)


// 下面是工具函数 位置不重要 

// 从localStorage中拿hash数据
function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name) || 'null')
 }
// 创建标签
function tag(tagName, attributes){
    var element = document.createElement(tagName)
    // for in 循环可以遍历一个hash 为啥不用for循环 因为你不知道attributes里面具体有什么 有多少
    for(var key in attributes){// key 为className，id，textContent 就是xx.后边的内容
        element[key] = attributes[key]

    }
    return element
 }

// 创建ImgIcon
function createImgIcon(domain){
     // 创建img标签
    var imgIcon = tag('img')
    if(domain){
        imgIcon.src = 'http://' + domain + '/favicon.ico'
    }else{
        imgIcon.src = '//i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg'
        console.log('上面图片一定成功，如果失败说明图挂了。')
    }
    imgIcon.onerror = function(e){
        console.log("下载失败了,帮你添加一个肯定成功的favicon.ico,地址为https://i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg")
        e.target.src = '//i.bmp.ovh/imgs/2021/05/4871781e4fa1f4d3.jpg'
    }
    return imgIcon
}
function createButton(textName,id){
    // 给按键添加一个按钮
    var button = tag('button',{textContent: textName,id: id})
    button.onclick = function(e){
        // 用户输入的键 e[target]就是用户点击的元素
        var button =  e.target
        var key = button.id
        // 就是在用户点击button的时候重新获取imgIconNew图片地址
        var imgIconNew = button.previousSibling
        var userWebsiteEdit = prompt('请输入您想输入的website')
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
    return button
}

function initData(){
    // 初始化数据
    var keys = [
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
            'Caps','option','command','niz','Alt','Fn',
            'Ctrl','←','↓','→',
        ],
        
    ]
    // js中的hash,可以理解为初始化用到的数据。
    var hash = {
        
            'esc':'qq.com','F1':'qq.com','F2':'qq.com','F3':'qq.com','F4':'qq.com','F5':'qq.com',
            'F6':'qq.com','F7':'qq.com','F8':'qq.com','F9':'qq.com','F10':'qq.com','F11':'qq.com',
            'F12':'qq.com','Print':'qq.com','Pause':'qq.com','Del':'qq.com',
        
            '`':'diandian.com','1':'qq.com','2':'qq.com','3':'qq.com','4':'qq.com','5':'qq.com','6':'qq.com',
            '7':'qq.com','8':'qq.com','9':'qq.com','0':'qq.com','-':'qq.com','=':'qq.com','Back':'qq.com','Home':'qq.com',
        
            'Tab':'qq.com','q':'qq.com','w':'weibo.com','e':'','r':'qq.com','t':'','y':'qq.com',
            'u':'qq.com','i':'qq.com','o':'qq.com','p':'qq.com','[':'qq.com',']':'qq.com','\\':'qq.com','Up':'qq.com',
        
            'Ctrl':'qq.com','a':'acfun.com','s':'qq.com','d':'qq.com','f':'','g':'github.com','h':'qq.com',
            'j':'qq.com','k':'qq.com','l':'qq.com',';':'qq.com','\'':'qq.com','Enter':'qq.com','Down':'qq.com',
        
            'Shift':'qq.com','z':'qq.com','x':'qq.com','c':'qq.com','v':'qq.com','b':'qq.com','n':'qq.com',
            'm':'qq.com',',':'qq.com','.':'qq.com','/':'qq.com','Shift':'qq.com','↑':'qq.com','End':'qq.com',
        
            'Caps':'qq.com','option':'qq.com','command':'qq.com','niz':'qq.com','Alt':'qq.com','Fn':'qq.com',
            'Ctrl':'qq.com','←':'qq.com','↓':'qq.com','→':'qq.com',
        
    }
    // 浏览器中的hash
    // 取出localStorage中的'userWebsiteEdit'内容，因为是字符串所以解析成hash
    var hashInLocalStorage = getFromLocalStorage('userWebsiteEdit')
    
        // 覆盖修改前的js给浏览器的hash 
        if(hashInLocalStorage){
            hash = hashInLocalStorage
        }
    
        return {
            "keys": keys,
            "hash": hash
        }
    }

    // 生成键盘
function generateKeboard(keys,hash){
    var keyboard = document.getElementById("keyboard")

    // 遍历keys，生成kbd标签。
    for(var index = 0; index < keys.length; index += 1){
        // index 0 1 2 3 4 5
     
        // console.log(row)
    
        var div = tag("div",{className:'row'})
    
        keyboard.appendChild(div)
        
           // row 代表第 1 2 3 4 5个数组
           var row = keys[index]
            for(var index2 = 0; index2 < row.length; index2 += 1){
    
                    // 给按键添加一个编辑按钮
                    var button = createButton('edit',row[index2])
     
                    // 添加网址icon图标
                    var imgIcon = createImgIcon(hash[row[index2]])
            
                    // 创建kbd标签
                    var kbd = tag('kbd',{className: 'key',textContent: row[index2]})
                    kbd.appendChild(imgIcon)
                    kbd.appendChild(button)
                    div.appendChild(kbd)    
            
        } 
    }
}
// 监听用户键盘方法
function listenToUser(hash){
    document.onkeypress = function(e){
        // 监听键盘按下的按键
            var key = e['key'] // qwertyuiop[]\
            var website = hash[key]
            console.log(website)
            // 将当前浏览器页面地址换成我们按下按键对应的地址
            // 模拟用户在地址栏输入
            // location.href = 'http://' + website
            //在浏览器新页面窗口打开我们按下按键对应的网址
            // 模拟用户新打开一个浏览器页面
            window.open('http://' + website, '_blank')
    }
}
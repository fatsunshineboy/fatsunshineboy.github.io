## 经验总结

### 输入框

   ```css
   <!-- 改变输入框的光标位置 -->
   padding-left: 20px;
   
   <!-- 改变输入框的背景透明度而不影响字体的透明度 -->
   background-color: rgba(0, 0, 0, 0.1);
   
   <!-- 改变 placeHolder 的样式 -->
   ::-webkit-input-placeholder {
       /* WebKit, Blink, Edge */
       color: #909;
   }
   ::-moz-placeholder {
       /* Mozilla Firefox 4 to 18 */
       color: #909;
   }
   ::-moz-placeholder {
       /* Mozilla Firefox 19+ */
       color: #909;
   }
   ::-ms-input-placeholder {
       /* Internet Explorer 10-11 */
       color: #909;
   }
   
   <!-- 取消输入框的边框 -->
   input{
        outline：none;
   }
   ```

###  修改 svg 图标的颜色

   ```css
   <!-- 页面内引入svg,修改fill属性 -->
   
   <!-- img标签引入svg,此时css对svg文件无法生效，此时要用到CSS3滤镜filter中的drop-shadow，通过生产一个可指定颜色的阴影放置于svg的位置，并将原始svg移出视线 -->

    svg{
        filter: drop-shadow(#ff0 100px 0);
        transform: translateX(-100px);
    }
   ```

### vue3 + scss 动态换肤

   (1) 在一个 scss 文件中定义全局变量，变量引用 css 变量
   ```scss
    // setting.scss
    // 主要颜色
    $primaryColor: var(--primaryColor);
    // 字体颜色
    $fontColor: var(--fontColor);
    // svg 图标字体颜色
    $svgColor: var(--svgColor);
    // 图标颜色
    $iconColor: var(--iconColor);
    // 图标背景颜色
    $iconBackColor: var(--iconBackColor);
    // placeHolder颜色
    $placeHolderColor: var(--placeHolderColor);
   ```

   (2) 在项目的根组件处导入 scss文件
   ```scss
    @import "@/style/setting.scss";
   ```

   (3) 用一个 div 将根组件都包起来，在 vue 的对象中定义 css 变量,将对象绑定到 div 的 style 中，此时 scss 变量的作用域为整个项目，将修改变量的方法注入，子组件调用方法修改变量，便可以实现换肤

    例子:
   ```vue
    <template>
    <div class="root" :style=styleSetting as any>
        <HeaderViewVue></HeaderViewVue>
        <ContentViewVue></ContentViewVue>
        <FooterViewVue></FooterViewVue>
    </div>
    </template>

    <script setup lang="ts">
    import HeaderViewVue from "@/views/Header/HeaderView.vue";
    import ContentViewVue from "@/views/Content/ContentView.vue";
    import FooterViewVue from "@/views/Footer/FooterView.vue";

    import { reactive, provide, type StyleValue } from "vue";

    import type { styleSetting } from "@/type/styleSetting";

    // 修改样式的方法,并将方法提供给子组件

    let styleSetting: styleSetting = reactive({
        // 主要颜色
        "--primaryColor": "#ec4141",
        // 字体颜色
        "--fontColor": "#fff",
        // svg 图标字体颜色
        "--svgColor": "#ec4141",
        // 图标颜色
        "--iconColor": "#fff",
        // 图标背景颜色
        "--iconBackColor": "black",
        // placeHolder颜色
        "--placeHolderColor": "#ccc"
    })

    const changeStyleSetting: Function = (styleSettingObject: styleSetting): void => {
        // 保持响应性
        Object.assign(styleSetting, { ...styleSettingObject })
    }

    provide("changeStyleSettingFun", changeStyleSetting);
    </script>

    <style scoped lang="scss">
    @import "@/style/setting.scss";
    </style>
   ```

### 进度条的实现
   ```html
    <div class="progress">
        <div class="progressItem" style="--progress:90%"></div>
    </div>
   ```

   ```scss
    .progress {
        width: 352px;
        height: 2.5px;
        border-radius: 25px;
        background-color: #eee;
        margin: 0 4px 0 4px;
        .progressItem {
        width: var(--progress);
        height: inherit;
        border-radius: 25px 0 0 25px;
        background-color: #ff4e4e;
        }
    }
   ```

### 鼠标经过显示提示

   设置 title 属性即可

### audio 属性

    ontimeupdate 监听音频播放

   1. currentTime属性、startTime属性与duration属性

    可以使用video元素或audio元素的currentTime属性来读取媒体的当前播放位置，也可以通过修改currentTime性情
    为修改当前的播放位置。如果修改的位置上没有可用的媒体数据时，将抛出INVALID_STATE_ERR异常；如果修改的
    位置超出了浏览器在一次请求中可以请求的数据范围，将抛出INDEX_SIZE_ERR异常。
    
    可以使用video元素或audio元素的startTime属性来读取媒体播放的开始时间，通常为0。
    
    可以使用video元素或audio元素的dutation属性来读取媒体文件总的播放时间。
    
    三者的时间、单位均为秒，currentTime为可读与属性，其余两个均为只读属性。

   2. volume属性和muted属性

    volume属性读取或修改媒体的的播放音量，范围从0到1，0为表单，1为最大音量。
    
    muted属性读取或修改媒体的表单状态，该值为布尔值，true表示静音状态，false表示非静音状态。

   3. defaultPlayRate属性与playbackRate属性

    defaultPlayRate属性读取或修改媒体的播放速率。
    
    playbackRate属性读取或修改媒体当前的播放速率。
    
    ```
        audio 的控制函数主要有：
    
        load() 加载音频、视频软件，通常不必调用，除非是动态生成的元素，用来在播放前预加载
        play() 加载并播放音频、视频文件，除非文件已经暂停在其他位置，否则默认重头开始播放
        pause() 暂停处于播放状态的音频、视频文件


        audio 的只读媒体特性有：
    
        duration 获取媒体文件的播放时长，以s为单位，如果无法获取，则为NaN
        paused 如果媒体文件被暂停，则返回true，否则返回false
        ended 如果媒体文件播放完毕，则返回true
        startTime 返回起始播放时间，一般是0.0，除非是缓冲过的媒体文件，并一部分内容已经不在缓冲区
        error 在发生了错误后返回的错误代码
        currentSrc 以字符串形式返回正在播放或已加载的文件，对应于浏览器在source元素中选择的文件
    
        audio 可脚本控制的特性值：
    
        autoplay 自动播放已经加载的的媒体文件，或查询是否已设置为autoplay
        loop 将媒体文件设置为循环播放，或查询是否已设置为loop
        currentTime 以s为单位返回从开始播放到目前所花的时间，也可设置 currentTime的值来跳转到特定位置
        controls 显示或者隐藏用户控制界面
        volume 在0.0到1.0间设置音量值,或查询当前音量值
        muted 设置是否静音
        autobuffer 媒体文件播放前是否进行缓冲加载，如果设置了autoplay，则忽略此特性
    
        歌曲播放进度
    
        这个功能用到的 audio api 主要有：
    
        currentTime() ：以秒为单位返回从开始播放到目前所花的时间，也可设置 currentTime 的值来跳转到特定位置；
        duration：获取媒体文件的播放时长，以秒为单位，如果无法获取，则为 NaN；
    
        歌曲进度：首先先设置一个定时器，分别获取这两个值，用当前播放的秒数除以歌曲总秒数，再乘以歌曲进度条的总宽度（px），就能算出歌曲进度条一      秒钟可以走多少。
    
        歌曲进度调节：点击进度条的某个位置，歌曲跳转到响应位置，这个功能的实现是先获取到点击的位置距离进度条最左边的长度（让 Firefox 支持 offsetX、offsetY），接着获得这段距离在整个进度条的长度里所占的百分比，用这个百分比乘以歌曲的总长度，就能算出该给 currentTime 设置的值。
    
        歌曲时间显示
    
        歌曲显示：在计算歌曲进度的定时器内，不断发送歌曲的播放时间和总时间，左边的时间为歌曲的播放时间，也就是 currentTime 的值，右边的时间用总时间减去 currentTime ，并将它们转换为我们需要的格式即可。
    
        音量的调节
    
        volume：在0.0到1.0间设置音量值,或查询当前音量值；
    
        音量调节：这个功能实现起来很简单，把 volume 的值设为 0.0，就静音了。在控件上调节音量的原理和也歌曲的进度条一样，判断点击位置距离第一个相对元素 Y 轴上最顶端的位置，然后再进一步计算出具体的数值，注意数值的格式，别超过1，并且小数点后只有1位。
    
        播放列表与播放方式
    
        把整个歌曲文件的信息都写在 json 文件里，获取并生成播放列表。当播放歌曲时，系统会生成当前播放歌曲的引索值（例如：1,2，表示第二张专辑的第三首歌，这个很重要，歌曲切换都是基于这个引索值的），当要播放下一曲时，系统会根据当前是什么播放方式（列表循环，单曲循环，随机播放，顺  序播放），生成新的引索值，然后通知播放器，下一首该怎么播放，是随机，还是循环，还是播放结束。
    
        同步显示歌词
    
        ajax获取歌词文件（lrc文件）
    
        用正则分别过滤出歌词和歌词前面对应的时间，存入数组
    
        将歌词的时间和内容遍历存入 HTML
    
        每秒都去判断一下现在歌曲播放的时间，如果和临时数据 data-timeline 里的值一样，就滚动
    ```

### js 动态改变 audio 的 src

    :::tip
        要改变 audio 的 src 值才有效果，改变 source 的 src 没有用，调用完后可以在调用 audio 的 load 函数
    :::

### img实现图片加载前默认图片，加载时替换真实图片，加载失败时替换加载失败图片

```css
/* css 实现替代图片 */
img {
    margin: 25px 10px 25px 0;
    width: 260px;
    height: 164px;
}
img[src=""],img:not([src]){
	width: 0;
    height: 0;
    padding: 82px 130px;
    background: url('/static/img/sitg.jpg') no-repeat center;
    background-size:100% 100% ;
}
```

```html
<!-- 加载失败 -->
<img :src="personInfo.avatar" onerror="javascript:this.src='/static/img/fail.png';this.οnerrοr=null;">
```

### 用户点击按钮，弹出框出现，弹出框里有确认&取消按钮，点击确认&取消&其他区域，弹出框才消失

难点：弹出框出现后怎么判断鼠标的下一次点击，最开始的时候，我在弹出框出现后，开始监听鼠标垫点击事件，判断 e.target.classname 是否有弹出框的类名，这种方式十分麻烦，在网上搜寻半天，找到一个较好的方法：

DOM事件流规定的事件流包括三个阶段：
1，事件捕获阶段。
2，处于目标阶段。
3，事件冒泡阶段。
事件流首先是经过事件捕获阶段，接着是处于目标阶段，最后是事件冒泡阶段

首先在事件捕获过程中，document对象首先接收到click事件，然后事件沿着DOM树依次向下，一直传播到事件的实际目标。
接着在事件冒泡的过程中，事件开始是由具体的元素接收，然后逐级向上传播到较为不具体的节点。

事件触发可以在捕获阶段，也可以在冒泡阶段，默认是冒泡阶段

addEventListener 可以传第三个参数，决定事件的触发时间， 不传默认为 false （冒泡），true（捕获）

新版第三个参数可以传对象，也可以直传 true 和 false 
```js
el.addEventListener(type, listener, {
    capture: false, // === useCapture
    once: false,    // 是否设置单次监听
    passive: false  // 是否让 阻止默认行为(preventDefault()) 失效
})
// 新增参数的三个属性，默认值都是 false。
```

实现目标的要点是，除了设置一个变量控制弹出框的显示与隐藏，再设置一个变量 flag ，默认为 true ,document.body 在捕获和冒泡阶段都触发鼠标点击事件。先执行捕获事件，将 falg 设为 true ，即默认鼠标点击了其它地方，此时事件捕获到目标弹出框，再将 flag 设置为 false ,最后在body的冒泡阶段判断 flag 的值，只要点击在弹出框上面就不会隐藏

```vue
<template >
    <div class="root">
        <input @click="show()" />
        <div class="calender" v-if="showCalender" @click="showDetail"></div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

let showCalender = ref(false)

let flag = ref(true)

const show = () => {
    showCalender.value = true;
    flag.value = false;
    console.log(789);
}

const showDetail = (e: any) => {
    flag.value = false
    console.log(123);
}

document.body.addEventListener('click', function () {
    flag.value = true
    console.log(456);
}, true)

document.body.addEventListener('click', function () {
    console.log("aaa");

    if (flag.value) {
        showCalender.value = false
    }
})


</script>

<style lang="scss" scoped>
.root {
    .calender {
        width: 200px;
        height: 200px;
        background-color: red;
    }
}
</style>
```



### 在 vue 中使用 scss 的变量

- 1. 新建一个以 `.module.scss`结尾的 scss 的文件 ，如 “ setting.module.scss ”
- 2. 创建一个变量并且导出
```scss
$headerHeight:70px;

// 导出,在vue中引用
:export {
  headerHeight: $headerHeight;
}
```
- 3. 在 vue 文件中引入 scss 文件 
```js
import config from "setting.module.scss";
```
- 4. 使用变量
```js
console.log(config.headerHeight);
```



### 对象数组的深浅拷贝

歌单的值由状态管理 pinia 负责，播放全部写成一个组件，通过props传值给组件，点击播放时，组件将歌单传给 pinia ,但由于对象和数组直接赋值时都是传的地址，这导致在 pinia 中修改歌单，影响到了页面的数据

浅拷贝
什么是浅拷贝：两者是指向一个对象。

对象的浅拷贝
1、对象的直接遍历赋值。

2、ES6中的 var copyObj = Object.assign({}, obj);

3、ES7扩展运算符 var copyObj = { ...obj }

4、Jquery浅拷贝 var copiedObject = jQuery.extend({}, originalObject) 如果改变了originalObject，copiedObject 也会变。

数组的浅拷贝
（两者指向不同的对象，但是只能拷贝一层）

`array.concat()`
`array.slice(0)`

如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发 生改变，则新的和原来的数组中的这个元素也会发生改变，所以是浅拷贝。

对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。

也就是说，如果原数组改变的是基本数据类型，比如String，Boolean，Number的数据，不会影响到新数组；
但是如果改变的是对象或者数组中的数据，是会影响到新数组的，也也就是对于对象或者数组，新旧数组指向的是一个对象。

深拷贝
（下面说的深拷贝是基本对象的深拷贝，不考虑对象的复杂属性，比如set，get，Function等）

1、最简单的方式 JSON.parse(JSON.stringify(Obj)) 这种方法使用较为简单，可以满足基本的深拷贝需求，而且能够处理JSON格式能表示的所有数据类型，但是对于正则表达式类型、函数类型等无法进行深拷贝(而且会直接丢失相应的值)。

2、jQuery深拷贝 var copiedObject = $.extend(true, {}, originalObject)

3、手动写递归方式
```js
var array = [
    { number: 1 },
    { number: 2 },
    { number: 3 }
];
function copy (obj) {
    var newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    }
    for(var i in obj){
       newobj[i] = typeof obj[i] === 'object' ? copy(obj[i]) : obj[i];
    }
    return newobj
}
var copyArray = copy(array)
copyArray[0].number = 100;
console.log(array); //  [{number: 1}, { number: 2 }, { number: 3 }]
console.log(copyArray); // [{number: 100}, { number: 2 }, { number: 3 }]
```



### 对象数组的去重（歌单为例）

```ts
// 增加歌曲到播放列表
  const appendSongToPlayLsit = (
    insertPlayList: Array<playList>,
    playAtOnce = true
  ) => {
    // 剔除已经在歌单里的歌
    let tempPlayList = JSON.parse(JSON.stringify(playList.value));
    let tempInsertPlayList = JSON.parse(JSON.stringify(insertPlayList));

    // 新添加的歌单都是在 nowToPlayId 的后面，不可能在之前
    tempPlayList.splice(nowToPlayId.value + 1, 0, ...tempInsertPlayList);

    let hash = new Map();
    let deletedIndex: Array<number> = [];
    let nowToPlayIdCount = 0;
    let temp = tempPlayList.reduce(
      (acc: Array<playList>, cru: playList, index: number) => {
        if (hash.get(cru["id"])) {
          if (hash.get(cru["id"])["index"] <= nowToPlayId.value) {
            // 有重复的值，并且第一个值在当前播放的前面
            // 删除第一个值，把第二个值存到 hash
            // 把 nowToPlayId 的值向往前移一位
            // acc.splice(hash.get(cru["id"])["index"], 1);
            // 这个删除导致在 nowToPlayId 的id对应的索引错位
            // 解决方法再加一个 deletedIndex 记录要删除的下标
            deletedIndex.push(hash.get(cru["id"])["index"]);
            hash.set(cru["id"], { index: acc.length });
            acc.push(cru);
            nowToPlayIdCount += 1;
          }
          // else if (hash.get(cru["id"])["index"] >= nowToPlayId.value) {
          // 有重复的值，并且第一个值在当前播放的后面，删除第二个值,也就是什么都不处理
          // 有重复的值，并且就是当前播放的歌曲，还是什么都不处理
          // }
        } else {
          // 如果之前没有这个值，就把这个值存到 hash
          hash.set(cru["id"], { index: acc.length });
          acc.push(cru);
        }
        // console.log(acc);
        return acc;
      },
      []
    );

    // 循环将数组应删除的元素删除，删完将变成 undefined
    for (let i = 0; i < deletedIndex.length; i++) {
      delete temp[deletedIndex[i]];
    }
    // 将 undefined 删除
    temp = temp.filter((item: playList) => {
      return item != undefined;
    });

    playList.value = temp;
    localStorage.setItem("playList", JSON.stringify(playList.value));
    setNowToPlayId(nowToPlayId.value - nowToPlayIdCount);

    if (playAtOnce) {
      setNowToPlayId(nowToPlayId.value + 1);
    }
  };
```

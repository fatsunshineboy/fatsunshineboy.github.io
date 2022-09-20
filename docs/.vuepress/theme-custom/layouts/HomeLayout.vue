<template>
    <div class="home">
        <div class="main">
            <div class="content sun" v-for="(item,index) in pages" :key="index">
                <div class="content_card">
                    <div class="title" @click="toDetailContent(item.path)">{{item.title}}</div>
                    <div class="time">{{item.lastUpdated}}</div>
                    <div class="abstract"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, getCurrentInstance, ref, onBeforeMount } from "vue";

// 全局系统变量
const app = getCurrentInstance();

// 全部页面
let pages = ref([])
// 路由
let router = ref()

const toDetailContent = (path) => {
    if (path === "/") {
        return
    }
    router.value.push(path)
}

onBeforeMount(() => {
    // console.log(app);
    pages.value = app.proxy.$site.pages
    // 去除掉首页
    pages.value.shift()
    router.value = app.proxy.$router
    console.log(pages.value);
})

</script>

<style>
@import "../styles/home.scss"
</style>
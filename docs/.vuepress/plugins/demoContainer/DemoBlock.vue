/* demoBlock.vue */
<template>
    <div class="block">
        <div class="demo-content">
            <!-- 插入组件 -->
            <slot name="demo"></slot>
        </div>
        <div class="meta" ref="meta">
            <div class="description">
                <!-- 插入描述信息 -->
                <slot name="description"></slot>
            </div>
            <div class="code-content">
                <!-- 插入代码块 -->
                <slot name="source"></slot>
            </div>
        </div>
    </div>
</template>

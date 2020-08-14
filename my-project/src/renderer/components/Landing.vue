<template>
    <div class="container-fiuled">
        <div class="container-fiuled">
            <div class="row justify-content-start">
                <div class="row">
                    <div class="col-2">
                        <p>
                            <img src="/statics/images/course/smiley.gif" alt="图片未找到" width="32" height="32"></p>
                    </div>
                    <div class="col-1 ">
                        <button class=btn-block @click="open('sy')">首页</button>
                    </div>
                    <div class="col-1">
                        <button class=btn-block @click="open('zd')">字典</button>
                    </div>
                    <div class="col-1">
                        <button class=btn-block @click="open('ba')">病案</button>
                    </div>
                    <div class="col-1">
                        <button class=btn-block @click="open('drg')">DR G</button>
                    </div>
                    <div class="col-2">
                        <button class=btn-block @click="open('gx')">共享病案分析</button>
                    </div>
                    <div class="col-2">
                        <button class=btn-block @click="open('bj')">BJ病案分析</button>
                    </div>
                    <div class="col-1">
                        <button class=btn-block @click="open('lt')">论坛</button>
                    </div>
                    <div class="col-1">
                        <button class=btn-block @click="open('yh')">用户</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'landing',
    methods: {
      open (link) {
        this.$router.push(link)
      }
    }
  }
</script>

<template>
    <div id="app">
        <Menu />
        <Content />
        <Footer />
    </div>
</template>

<script>
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'

export default {
    name: 'app',
    components: { Menu, Content, Footer }
}
</script>

<style>
#app {
    margin-top: 60px;
}
</style>

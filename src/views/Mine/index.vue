<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div id="main">
	  <Header title="我的"></Header>
	  <Login></Login>
	  <TabBar></TabBar>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header/index.vue';
import TabBar from '@/components/TabBar/index.vue';
import Login from '@/components/Login/index.vue';

export default {
  name: 'mine',
  components: {
    Header,TabBar,Login
  }
}
</script>

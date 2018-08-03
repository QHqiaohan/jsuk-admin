<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
    *{
      border: none;
    margin: 0;
    outline: 0;
    padding: 0;
    box-sizing: border-box;
    }
    ul,li{
      list-style: none;
    }
    a{
      text-decoration: none;
      color: #333;
    }
    a:hover, a:focus {
      text-decoration: none;
      color: #333;
    }
    .after:after{
      display: block;
      content: "";
      clear: both;
    }
    input{
      outline: none;
      vertical-align:middle;
    }
    .img-my{
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
</style>
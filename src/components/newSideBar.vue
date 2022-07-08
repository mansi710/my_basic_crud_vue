<template>
  <ul>
    <li><router-link :to="{ name: 'apiAddNewBlog' }">Blog Add</router-link></li>
    <li><router-link :to="{ name: 'apiListOfBlog' }">BlogList</router-link></li>
  </ul>
</template>

<style scoped>
ul {
  background: white;
  padding: 10px;
  list-style: none;
  margin-right: 20px;
}
li {
  margin: 10px;
}
</style>

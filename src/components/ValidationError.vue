<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />
  <div v-if="validationErrors" id="err">
    <ul class="alert alert-danger">
      <li v-for="(value, idx) in validationErrors" :key="idx">@{{ value }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["errors"],
  computed: {
    validationErrors() {
      let errors = Object.values(this.errors);
      errors = errors.flat();
      console.log(errors);
      return errors;
    },
  },
};
</script>
<style>
#err {
  margin-top: 20px;
}
</style>

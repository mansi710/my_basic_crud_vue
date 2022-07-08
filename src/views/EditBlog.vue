<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />

  <form @submit.prevent="updateBlog" id="page">
    <div class="card-header">
      <h4>Update Blog</h4>
    </div>
    <br />
    <div class="form-group row">
      <validation-errors
        :errors="validationErrors"
        class="alert alert-danger"
        v-if="validationErrors"
        id="err"
      >
        {{ validationErrors }}
      </validation-errors>
    </div>
    <div class="form-group row">
      <label for="title" class="col-sm-2 col-form-label">Enter Title</label>
      <div class="col-sm-8">
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="enter your title"
          v-model="blog.title"
        />
      </div>
    </div>
    <br />
    <div class="form-group row">
      <label for="description" class="col-sm-2 col-form-label">
        Enter Description
      </label>
      <div class="col-sm-8">
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="enter description here"
          v-model="blog.description"
        ></textarea>
      </div>
    </div>
    <br />
    <div class="form-group row">
      <label for="status" class="col-sm-2 col-form-label">Enter Status</label>
      <div class="col-sm-8">
        <input
          type="text"
          class="form-control"
          id="status"
          placeholder="enter your status"
          v-model="blog.status"
        />
      </div>
    </div>
    <br />
    <div class="form-group row">
      <label for="tag" class="col-sm-2 col-form-label">Enter Tag</label>
      <div class="col-sm-8">
        <input
          type="text"
          class="form-control"
          id="tag"
          placeholder="enter your tag"
          v-model="blog.tag"
        />
      </div>
    </div>
    <br />
    <div class="form-group row">
      <label for="order" class="col-sm-2 col-form-label">Enter order</label>
      <div class="col-sm-8">
        <input
          type="number"
          class="form-control"
          id="order"
          placeholder="enter your order"
          v-model="blog.order"
        />
      </div>
    </div>
    <br />
    <div class="form-group row">
      <div class="col-sm-10">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import ValidationError from "@/components/ValidationError.vue";
export default {
  name: "EditBlog",
  data() {
    return {
      components: { ValidationError },
      validationErrors: "",
      blog: {
        title: "",
        description: "",
        status: "",
        tag: "",
        order: "",
        _method: "patch",
      },
    };
  },
  mounted() {
    this.showBlog();
  },
  methods: {
    showBlog() {
      axios
        .get(`/editBlog/${this.$route.params.id}`)
        .then((response) => {
          const { title, description, status, tag, order } = response.data.blog;
          this.blog.title = title;
          this.blog.description = description;
          this.blog.status = status;
          this.blog.tag = tag;
          this.blog.order = order;
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.validationErrors = error.response.data.message;
          }
        });
    },
    updateBlog() {
      axios
        .put(`/updateBlog/${this.$route.params.id}`, this.blog)
        .then((response) => {
          if (response.status == 200) {
            alert("update data successfully");
            this.$router.push("/apiListOfBlog");
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
  },
};
</script>
<style>
#page {
  margin-top: 100px;
}
</style>

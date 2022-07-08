<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />

  <form @submit.prevent="createNewBlog">
    <div class="card-header">
      <h4>Add New Blog</h4>
    </div>
    <br />
    <!-- <div class="alert alert-success mt-4" v-if="errors.length">
      <ul class="mb-0">
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div> -->

    <div class="form-group row">
      <div v-for="(errorArray, idx) in notifmsg" :key="idx">
        <div
          v-for="(allErrors, idx) in errorArray"
          :key="idx"
          class="alert alert-danger"
        >
          <span class="error">{{ allErrors }} </span>
        </div>
      </div>
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
          type="text"
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
// import ValidationError from "@/components/ValidationError.vue";
export default {
  name: "AddNewBlog",

  data() {
    return {
      // components: { ValidationError },
      // validationErrors: "",
      blog: {
        title: "",
        description: "",
        status: "",
        tag: "",
        order: "",
      },
      notifmsg: "",
      errors: [],
    };
  },
  methods: {
    createNewBlog() {
      this.errors = [];
      if (!this.blog.title) {
        this.errors.push("title is required");
      }
      if (!this.blog.description) {
        this.errors.push("description is required");
      }
      if (!this.blog.status) {
        this.errors.push("status is required");
      }
      if (!this.blog.tag) {
        this.errors.push("tag is required");
      }
      if (!this.blog.order) {
        this.errors.push("order is required");
      }
      if (!this.errors.length) {
        // alert("asd");
        let formData = new FormData();
        formData.append("title", this.blog.title);
        formData.append("description", this.blog.descriptin);
        formData.append("status", this.blog.status);
        formData.append("tag", this.blog.tag);
        let url = "createNewBlog";
        axios
          .post(url, this.blog, (this.allerros = []))
          .then((response) => {
            if (response.status == 200) {
              this.$router.push({ name: "apiListOfBlog" });
            }
          })
          .catch((e) => {
            if (e.response.status == 422) {
              this.notifmsg = e.response.data;
            }
          });
      }
    },
  },
};
</script>

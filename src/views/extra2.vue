<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />

  <div class="row">
    <div class="col-12 mb-2 text-end">
      <!-- <router-link :to="{ name: 'apiAddNewBlog' }" class="btn btn-primary"
        >Create</router-link
      > -->
    </div>
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4>Blogs List</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Tag</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody v-if="blogs">
                <tr v-for="blog in blogs.data" :key="blog.id">
                  <td>{{ blog.id }}</td>
                  <td>{{ blog.title }}</td>
                  <td>{{ blog.description }}</td>
                  <td>{{ blog.status }}</td>
                  <td>{{ blog.tag }}</td>
                  <td>{{ blog.order }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'apiEditBlog', params: { id: blog.id } }"
                      class="btn btn-success"
                      >Edit</router-link
                    >
                    <button
                      type="button"
                      @click="deleteBlog(blog.id)"
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" align="center">No Blogs Found.</td>
                </tr>
              </tbody>
            </table>

            <!-- <NewPagination
              v-if="pagination.last_page > 1"
              :pagination="pagination"
              :offset="5"
              @paginate="getBlogs()"
            ></NewPagination> -->

            <laravel-vue-pagination
              align="center"
              :data="blogs"
              @pagination-change-page="getBlogs"
            ></laravel-vue-pagination>
            <!-- <div class="row mt-2">
              <div class="col-md-8">
                <nav>
                  <ul class="pagination">
                    <li
                      v-bind:class="{ disabled: !pagination.first_link }"
                      class="page-item"
                    >
                      <a
                        href="#"
                        class="page-link"
                        @click="getBlogs(pagination.first_link)"
                        >&laquo;</a
                      >
                    </li>
                    <li
                      v-bind:class="{ disabled: !pagination.prev_link }"
                      class="page-item"
                    >
                      <a
                        href="#"
                        class="page-link"
                        @click="getBlogs(pagination.prev_link)"
                        >&lt;</a
                      >
                    </li>
                    <li
                      v-for="n in pagination.last_page"
                      :key="n"
                      v-bind:class="{ active: !pagination.current_page == n }"
                      class="page-item"
                    >
                      <a
                        href="#"
                        class="page-link"
                        @click="getBlogs(pagination.path_page + n)"
                        >{{ n }}</a
                      >
                    </li>
                    <li
                      v-bind:class="{ disabled: !pagination.next_link }"
                      class="page-item"
                    >
                      <a
                        href="#"
                        class="page-link"
                        @click="getBlogs(pagination.next_link)"
                        >&gt;</a
                      >
                    </li>
                    <li
                      v-bind:class="{ disabled: !pagination.last_link }"
                      class="page-item"
                    >
                      <a
                        href="#"
                        class="page-link"
                        @click="getBlogs(pagination.last_link)"
                        >&raquo;</a
                      >
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="col-md-4">
                Page:
                {{ pagination.form_page }} - {{ pagination.to_page }} Total:{{
                  pagination.total_page
                }}
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import LaravelVuePagination from "laravel-vue-pagination";
// import NewPagination from "@/components/NewPagination.vue";
export default {
  name: "ListOfBlog",
  // components: { NewPagination },
  components: { LaravelVuePagination },
  data() {
    return {
      blogs: [],
      pagination: {},
    };
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    // getBlogs(pagination) {
    //   pagination = pagination || `/getAllBlog`;
    //   console.log(this.pegination);
    getBlogs(page = 1) {
      axios
        .get(`/getAllBlog?page=${page}`)
        .then((response) => {
          this.blogs = response.data;
          // this.pagination = {
          //   current_page: response.current_page,
          //   last_page: response.last_page,
          //   form_page: response.from_page,
          //   to_page: response.to_page,
          //   total_page: response.total_page,
          //   per_page: response.per_page,
          //   path_page: response.path + "?page",
          //   first_link: response.first_link,
          //   last_link: response.last_link,
          //   prev_link: response.prev_link,
          //   next_link: response.next_link,
          // };
          // this.pagination = response.data;
        })
        .catch((error) => {
          console.log(error);
          console.log("handle server error from here");
          this.blogs = [];
        });
    },
    async deleteBlog(id) {
      if (confirm("Are you sure to delete this category ?")) {
        await axios
          .post(`destroyBlog/${id}`)
          .then((response) => {
            this.getBlogs();
            if (response) {
              alert("blog deleted sucessfully");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />

  <div class="row">
    <div class="col-12 mb-2 text-end">
      <router-link :to="{ name: 'apiAddNewBlog' }" class="btn btn-primary"
        >Create</router-link
      >
    </div>

    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4>Blogs List</h4>
        </div>
        <!-- for global search search any filed by common search box -->
        <div class="card-tools" id="search">
          <div class="input-group input-group-sm" style="width: 250px">
            <input
              name="table_search"
              class="form-control float-right"
              placeholder="Global Search"
              v-model="searchTerm"
              type="search"
              aria-label="Search"
            />
            <div class="input-group-append">
              <button type="submit" class="btn btn-info" @click="performSearch">
                Search
              </button>
            </div>
          </div>
        </div>
        <!-- end of common serch -->
        <div class="alert alert-danger col-12 mb-2" v-if="message">
          <p>{{ message }}</p>
        </div>
        <!-- individual serach -->
        <div class="card-tools">
          <button class="btn btn-primary btn-lg" @click="isHidden = !isHidden">
            Showing Advanced search
          </button>
          <div class="input-group" id="advancedSearch" v-if="!isHidden">
            <input
              class="form-control"
              type="text"
              v-model="searchByTitle"
              placeholder="Search by title"
            />
            <input
              class="form-control"
              type="text"
              v-model="searchByDescription"
              placeholder="Search by description"
            />
            <input
              class="form-control"
              type="text"
              v-model="searchByStatus"
              placeholder="Search by status"
            />
            <input
              class="form-control"
              type="text"
              v-model="searchByTag"
              placeholder="Search by tag"
            />
            <input
              class="form-control"
              type="text"
              v-model="searchByOrder"
              placeholder="Search by order"
            />
            <div class="input-group-append">
              <button type="submit" class="btn btn-info" @click="performSearch">
                Individual Search
              </button>
            </div>
          </div>
        </div>
        <!-- for soting -->
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th
                    @click="orderBy('id')"
                    v-bind:class="[sortBy === 'id' ? sortKey : '']"
                  >
                    ID
                  </th>
                  <th
                    @click="orderBy('title')"
                    v-bind:class="[sortBy === 'title' ? sortKey : '']"
                  >
                    Title
                  </th>
                  <th
                    @click="orderBy('description')"
                    v-bind:class="[sortBy === 'description' ? sortKey : '']"
                  >
                    Description
                  </th>
                  <th
                    @click="orderBy('status')"
                    v-bind:class="[sortBy === 'status' ? sortKey : '']"
                  >
                    Status
                  </th>
                  <th
                    @click="orderBy('tag')"
                    v-bind:class="[sortBy === 'tag' ? sortKey : '']"
                  >
                    Tag
                  </th>
                  <th
                    @click="orderBy('order')"
                    v-bind:class="[sortBy === 'order' ? sortKey : '']"
                  >
                    Order
                  </th>
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
                  <td colspan="6" align="center">No Blogs Found.</td>
                </tr>
              </tbody>
            </table>
            <!-- for pagination -->
            <div class="row mt-2">
              <div class="col-md-8">
                <nav>
                  <ul class="pagination">
                    <li
                      v-bind:class="{ disabled: !pagination.first_page_url }"
                      class="page-item"
                    >
                      <a
                        href="#"
                        class="page-link"
                        @click="getBlogs(pagination.first_page_url)"
                        >&laquo;</a
                      >
                    </li>
                    <li
                      v-bind:class="{ disabled: !pagination.prev_page_url }"
                      class="page-item"
                    >
                      <a
                        href="#"
                        class="page-link"
                        @click="getBlogs(pagination.prev_page_url)"
                        >&lt;</a
                      >
                    </li>
                    <li
                      v-for="n in pagination.last_page"
                      :key="n"
                      v-bind:class="{ active: !pagination.current_page == n }"
                      class="page-item"
                    >
                      <a href="#" class="page-link" @click="getBlogs(n)">
                        {{ n }}
                      </a>
                    </li>
                    <li
                      v-bind:class="{ disabled: !pagination.next_page_url }"
                      class="page-item"
                    >
                      <a
                        href="#"
                        class="page-link"
                        @click="getBlogs(pagination.next_page_url)"
                        >&gt;</a
                      >
                    </li>
                    <li
                      v-bind:class="{ disabled: !pagination.last_page_url }"
                      class="page-item"
                    >
                      <a
                        href="#"
                        class="page-link"
                        @click="getBlogs(pagination.last_page_url)"
                        >&raquo;</a
                      >
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="col-md-4">
                Page:
                {{ pagination.from }} to {{ pagination.to }} Total:
                {{ pagination.total }}
              </div>
              <update-profile
                :data="blog"
                :show="showUpdateModal"
                v-on:save="updateUser"
                v-on:close="showUpdateModal = false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ListOfBlog",
  data() {
    return {
      blogs: [],
      pagination: {},
      searchTerm: "",
      blog: "",
      message: "",
      isHidden: true,
      searchByTitle: "",
      searchByDescription: "",
      searchByStatus: "",
      searchByTag: "",
      searchByOrder: "",
      sortKey: "asc",
      sortBy: "id",
      // multipleColumns: true,
      // initialSortBy: [
      //   { field: "id", type: "asc" },
      //   { field: "title", type: "asc" },
      // ],
    };
  },
  mounted() {
    this.getBlogs();
  },
  methods: {
    getBlogs(pagination) {
      axios
        .post(
          `/getAllBlog?page=${pagination}&search=${this.searchTerm}&title=${this.searchByTitle}&description=${this.searchByDescription}&status=${this.searchByStatus}&tag=${this.searchByTag}&order=${this.searchByOrder}&sortKey=${this.sortKey}&sortBy=${this.sortBy}`
        )
        .then((response) => {
          this.blogs = response.data.blog;
          this.pagination = response.data.blog;
          this.message = "";
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 404) {
            this.message = error.response.data.message;
          }
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
    performSearch() {
      this.getBlogs();
    },
    orderBy: function (s) {
      if (s === this.sortBy) {
        this.sortKey = this.sortKey === "asc" ? "desc" : "asc";
      }
      this.sortBy = s;
      this.getBlogs();
    },
  },

  computed: {
    commonFilterSearchBlog() {
      if (this.searchTerm) {
        return this.blogs.filter((searchTerm) => {
          return (
            searchTerm.title.match(this.searchTerm) >= 0 ||
            searchTerm.description.match(this.searchTerm) >= 0 ||
            searchTerm.status.match(this.searchTerm) >= 0 ||
            searchTerm.tag.match(this.searchTerm) >= 0 ||
            searchTerm.order.match(this.searchTerm) >= 0
          );
        });
      } else {
        return this.message;
      }
    },
    individualSearchBlog: function () {
      return this.blogs.filter((blog) => {
        var searchByTitle = blog.title.match(this.searchByTitle);
        var searchByDescription = blog.description.match(
          this.searchByDescription
        );
        var searchByStatus = blog.status.match(this.searchByStatus);
        var searchByTag = blog.tag.match(this.searchByTag);
        var searchByOrder = blog.order.match(this.searchByOrder);

        if (searchByTitle) {
          return searchByTitle;
        }

        if (searchByDescription) {
          console.log(searchByDescription);
          return searchByDescription;
        }

        if (searchByStatus) {
          return searchByStatus;
        }
        if (searchByTag) {
          return searchByTag;
        }
        if (searchByOrder) {
          return searchByOrder;
        }
      });
    },
  },
  sortedBlogs: function () {
    return this.blogs.orderBy((p1, p2) => {
      let modifier = 1;
      if (this.sortKey === "desc") modifier = -1;
      if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier;
      if (p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
      return 0;
    });
  },
};
</script>
<style scoped>
#search {
  margin-top: 20px;
  margin-left: 1200px;
}
#advancedSearch {
  margin-top: 20px;
}
.asc:after {
  content: "\25B2";
}
.desc:after {
  content: "\25BC";
}
</style>

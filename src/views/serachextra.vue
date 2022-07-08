filteredBlogs() {
      if (this.searchTerm) {
        return this.blogs.filter((searchTerm) => {
          return (
            searchTerm.title.indexOf(this.searchTerm.toLowerCase()) >= 0 ||
            searchTerm.description.indexOf(this.searchTerm.toLowerCase()) >=
              0 ||
            searchTerm.status.indexOf(this.searchTerm.toLowerCase()) >= 0 ||
            searchTerm.tag.indexOf(this.searchTerm.toLowerCase()) >= 0 ||
            searchTerm.order.indexOf(this.searchTerm.toLowerCase()) >= 0
          );
        });
      } else {
        return this.message;
      }
    },


       filteredBlogs() {
      if (this.searchTerm) {
        return this.blogs.filter((blog) => blog.body.includes(this.searchTerm));
      } else {
        return this.message;
      }
    },


    // filteredBlogs: function () {
    //   return this.blogs.filter((blog) => {
    //     var searchByTitle = blog.title.match(this.searchTerm);
    //     var searchByDescription = blog.title.match(this.searchTerm);
    //     var searchByStatus = blog.status.match(this.searchTerm);
    //     var searchByTag = blog.tag.match(this.searchTerm);
    //     var searchByOrder = blog.order.match(this.searchTerm);

    //     if (searchByTitle) {
    //       return searchByTitle;
    //     }

    //     if (searchByDescription) {
    //       return searchByDescription;
    //     }

    //     if (searchByStatus) {
    //       return searchByStatus;
    //     }
    //     if (searchByTag) {
    //       return searchByTag;
    //     }
    //     if (searchByOrder) {
    //       return searchByOrder;
    //     }
    //     if (this.searchTerm.length == 0 || this.searchTerm == "") {
    //       return (this.message = "invalid data");
    //     }
    //   });
    // },
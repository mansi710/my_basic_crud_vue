<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />
  <div class="container">
    <form @submit.prevent="CreatePost" id="page">
      <div class="container"></div>
      <div class="card-header">
        <h4>Register</h4>
      </div>
      <div class="form-group row">
        <div v-if="notifmsg">
          <div v-for="(errorArray, idx) in notifmsg" :key="idx">
            <div
              v-for="(allErrors, idx) in errorArray"
              :key="idx"
              class="alert alert-danger"
            >
              {{ allErrors }}
            </div>
          </div>
        </div>

        <div v-if="rules" class="alert alert-danger">
          {{ rules }}
        </div>
      </div>
      <br />
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">
          Enter User Name
        </label>
        <div class="col-sm-8">
          <input
            type="text"
            class="form-control"
            placeholder="enter your name"
            v-model="formData.name"
          />
        </div>
      </div>
      <br />
      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label"> Enter Email </label>
        <div class="col-sm-8">
          <input
            type="text"
            class="form-control"
            placeholder="enter your email"
            v-model="formData.email"
          />
        </div>
      </div>
      <br />
      <div class="form-group row">
        <label for="pwd" class="col-sm-2 col-form-label">Enter Password </label>
        <div class="col-sm-8">
          <input
            type="text"
            class="form-control"
            id="pwd"
            placeholder="enter your password"
            v-model="formData.password"
          />
        </div>
      </div>
      <br />
      <div class="form-group row">
        <label for="c_pwd" class="col-sm-2 col-form-label">
          Enter Confirm Password
        </label>
        <div class="col-sm-8">
          <input
            type="text"
            class="form-control"
            id="c_pwd"
            placeholder="Enter Confirm Password"
            v-model="formData.confirm_password"
          />
        </div>
      </div>
      <br />
      <!-- <p v-for="error in passwordValidation.errors" :key="error.id">
        {{ error }}
      </p> -->
      <!-- <transition name="hint" appear>
        <div
          v-if="passwordValidation.errors.length > 0 && !submitted"
          class="hints"
        ></div>
      </transition> -->
      <div class="matches" v-if="notSamePasswords">
        <p>Passwords don't match.</p>
      </div>
      <div class="form-group row">
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import { required, minLength, maxLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
// import ValidationError from "@/components/ValidationError.vue";
export default {
  name: "CreatePost",
  data() {
    return {
      // components: { ValidationError },
      // validationErrors: "",
      formData: {
        // userId: "",
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        // submitted: false,
      },
      notifmsg: "",
      rules: "",
      // rules: [
      //   // { message: "One lowercase letter required.", regex: /[a-z]+/ },
      //   // { message: "One uppercase letter required.", regex: /[A-Z]+/ },
      //   { message: "8 characters minimum.", regex: /.{8,}/ },
      //   { message: "number required.", regex: /[0-9]+/ },
      // ],
    };
  },
  methods: {
    CreatePost() {
      axios
        .post("register", this.formData)
        .then((response) => {
          if (response.status == 200) {
            alert("sucess");
            this.$router.push({ name: "apiLogin" });
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            console.log(error.response.data);
            this.notifmsg = error.response.data;
          }
          if (error.response.status == 401) {
            console.log(error.response.data);
            this.rules = error.response.data.confirmationError;
          }
        });
    },
  },
  // computed: {
  //   notSamePasswords() {
  //     if (this.passwordsFilled) {
  //       return this.formData.password !== this.formData.confirm_password;
  //     } else {
  //       return false;
  //     }
  //   },
  //   passwordsFilled() {
  //     return (
  //       this.formData.password !== "" && this.formData.confirm_password !== ""
  //     );
  //   },
  //   passwordValidation() {
  //     let errors = [];
  //     for (let condition of this.rules) {
  //       if (!condition.regex.test(this.formData.password)) {
  //         errors.push(condition.message);
  //       }
  //       // return { $router({ name:"apiLogin"}) };
  //     }
  //     if (errors.length === 0) {
  //       return { valid: true, errors };
  //     } else {
  //       return { valid: false, errors };
  //     }
  //   },
  // },
};
</script>
<style>
.invalid-feedback {
  color: red;
}
.hints {
  max-width: 400px;
  padding: 1em;
  background: whitesmoke;
  margin: 1em 0;
  font-size: 0.9em;
  color: darken(#d4dedf, 50%);
  h2 {
    margin: 0.5em 0 0.2em 0;
  }
  p {
    margin: 0;
    padding-left: 1em;
    &::before {
      content: ">";
      font-size: 0.9em;
      margin-right: 6px;
      display: inline-block;
    }
  }
}
#page {
  margin-top: 100px;
}
</style>

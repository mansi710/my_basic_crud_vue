<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
    // async CreatePost() {
    //   try {
    //     const response = await axios.post("login", {
    //       email: this.data.email,
    //       password: this.data.password,
    //     });
    //     localStorage.setItem("token", response.data.access_token);
    //     this.$router.push("/home");
    //   } catch (e) {
    //     this.error = "invalid user name and password";
    //   }
    // },

    // async CreatePost() {
    //   let response = await axios
    //     .post("login", this.data)
    //     .then((response) =>
    //       localStorage.setItem("token", response.data.access_token)
    //     )
    //     .catch((error) => console.log(error));
    //   if (response) {
    //     console.log("sucess");
    //     this.$router.push({ name: "home" });
    //   }
    // },



    <!-- <div>
    <form @submit.prevent="CreatePost">
      <div>
        <label for="name">User Name</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          placeholder="Enter name"
          class="input"
          required
        />
      </div>
      <div>
        <label for="email">User Email</label>
        <input
          type="text"
          id="email"
          v-model="formData.email"
          placeholder="Enter Email"
          class="input"
          required
        />
      </div>
      <div>
        <label for="password">password</label>
        <input
          type="text"
          id="password"
          v-model="formData.password"
          placeholder="Enter Password"
          class="input"
          :class="{ valid: passwordValidation.valid }"
          required
        />
      </div>
      <div>
        <label for="C_pwd">Confirm Password</label>
        <input
          type="text"
          id="c_password"
          v-model="formData.confirm_password"
          placeholder="Enter Confirm Password"
          class="input"
          required
        />
      </div>
      <p v-for="error in passwordValidation.errors" :key="error.id">
        {{ error }}
      </p>
      <transition name="hint" appear>
        <div
          v-if="passwordValidation.errors.length > 0 && !submitted"
          class="hints"
        ></div>
      </transition>
      <div class="matches" v-if="notSamePasswords">
        <p>Passwords don't match.</p>
      </div>
      <button class="btn">Sign Up</button>
    </form>
  </div> -->

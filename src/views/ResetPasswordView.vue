<template>
  <div>
    <h1>Reset Password View</h1>
    <form @submit.prevent="resetPassword">
      <!-- <div>
        <label for="email">email</label>
        <input type="email" id="email" class="input" v-model="formData.email" />
      </div> -->
      <div>
        <label for="password">Password</label>
        <input
          type="text"
          id="password"
          class="input"
          v-model="formData.password"
          :class="{ valid: passwordValidation.valid }"
        />
      </div>
      <div>
        <label for="C_pwd">Confirm Password</label>
        <input
          type="text"
          id="c_password"
          class="input"
          v-model="formData.password_confirmation"
        />
      </div>
      <transition name="hint" appear>
        <div
          v-if="passwordValidation.errors.length > 0 && !submitted"
          class="hints"
        >
          <h2>Hints</h2>
          <p v-for="error in passwordValidation.errors" :key="error.id">
            {{ error }}
          </p>
        </div>
      </transition>
      <div class="matches" v-if="notSamePasswords">
        <p>Passwords don't match.</p>
      </div>
      <div>
        {{ message }}
      </div>
      <button class="btn">Set A New Password</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      formData: {
        // email: "",
        password: "",
        password_confirmation: "",
        message: "",
        submitted: false,
      },
      rules: [
        { message: "8 characters minimum.", regex: /.{8,}/ },
        { message: "number required.", regex: /[0-9]+/ },
      ],
    };
  },
  methods: {
    async resetPassword() {
      const response = await axios.post("reset-password", {
        // email: this.formData.email,
        password: this.formData.password,
        password_confirmation: this.formData.password_confirmation,
        token: this.$route.params.token,
      });
      console.log(response);
      console.log(this.$route.params.token);
      if (response) {
        this.formData.message = "your password updated successfully";
        this.$router.push("/apiLogin");
      }
    },
  },
  computed: {
    notSamePasswords() {
      if (this.passwordsFilled) {
        return this.formData.password !== this.formData.password_confirmation;
      } else {
        return false;
      }
    },
    passwordsFilled() {
      return (
        this.formData.password !== "" && this.formData.confirm_password !== ""
      );
    },
    passwordValidation() {
      let errors = [];
      for (let condition of this.rules) {
        if (!condition.regex.test(this.formData.password)) {
          errors.push(condition.message);
        }
        // return { $router({ name:"apiLogin"}) };
      }
      if (errors.length === 0) {
        return { valid: true, errors };
      } else {
        return { valid: false, errors };
      }
    },
  },
};
</script>

<style scoped></style>

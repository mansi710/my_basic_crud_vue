<template>
  <div>
    <form @submit.prevent="forgotPassword">
      <div>
        <label for="email">User Email</label>
        <input type="email" id="email" class="input" v-model="email" />
      </div>
      <button class="btn">Reset Password</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async forgotPassword() {
      const response = await axios.post("forgot-password", {
        email: this.email,
      });
      if (response) {
        alert("your password will be reset after sometime");
      }

      // this.$router.push({ path: "/apiResetPassword/" });
    },
  },
};
</script>

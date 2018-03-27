<template>
  <v-app>
    <span>
      {{msg}}
    </span>
  </v-app>
</template>

<script>
export default {
  name: "LandingPage",
  data: () => {
    return {
      msg: "this will be Landing Page"
    };
  }
};
</script>

<template>
  <section class="text-center">
    加载中...
    {{name}}
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    let { name } = this.$route.params;
    this.name
    if (name) {
      this.getUserInfo();
    }
  },
  methods: {
    getUserInfo() {
      let { name } = this.$route.params;
      let { query } = this.$route;

      this.$store.dispatch('getUserInfo')
        .then(() => {
          this.name = name;
          // this.go(name, query);
        });
    },
    go(name, query) {
      this.$router.replace({ name, params: query });
    }
  }
}
</script>

<style>

</style>

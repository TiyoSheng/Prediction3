<template>
  <div id="app">
    <nav-header></nav-header>
    <div class="all">
      <div class="container">
        <router-view />
      </div>
    </div>
    <!-- <page-footer></page-footer> -->
    <network-shadow />
  </div>
</template>
<script>
import NavHeader from "@/components/Nav.vue";
import NetworkShadow from "@/components/Shadow";
import PageFooter from "@/components/Footer";
import { mapState } from "vuex";
import mixin from "@/mixin/mixin";
export default {
  mixins: [mixin],
  components: {
    NavHeader,
    NetworkShadow,
    PageFooter,
  },
  async created() {
    let self = this;
    await self.connect_wallet();
  },
  computed: {
    ...mapState(["badChainId", "web3"]),
  },
  watch: {
    async web3() {
      let self = this;
      window.ethereum.on("chainChanged", (chainId) => {
        console.log("changeNetwork,chainId:", chainId);
        self.connect_wallet();
      });
      window.ethereum.on("accountsChanged", async (wallet_address) => {
        console.log("changeWallet:", wallet_address);
        self.$store.commit("setAddress", { address: wallet_address[0] });
        self.update_balance();
      });
    },
  },
  async mounted() {
    let self = this;
  },
  methods: {
    async initFactory() {
      let self = this;
    },
  },
};
</script>
<style lang="less">
#app {
  font-size: 0;
  min-height: 100vh;
  // font-family: 'Inter';
  // font-style: normal;
}

.main-content {
  max-width: 1440px;
  margin: 0px auto;
  position: relative;
}

.container {
  // max-width: 1440px;
  margin: 0px auto;
  position: relative;
}

a {
  color: unset;

  &:hover,
  &:link,
  &:hover,
  &:active,
  &:visited {
    color: unset !important;
    text-decoration: none;
  }
}
</style>

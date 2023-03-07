<template>
  <div class="demo float-l">
    {{ count }}
    <van-button type="danger" @click="onMutations">危险按钮</van-button>
    <button @click="onActions">123</button>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { Button } from "vant";
import { useStore } from "vuex";
import { forum, threads } from "@/api";

export default {
  components: {
    [Button.name]: Button,
  },
  setup() {
    // const {mapState, mapActions} = createNamespacedHelpers('app');

    const store = useStore();
    const count = computed(() => store.state.app.count);

    const onMutations = () => {
      store.commit("app/increment");
    };
    const onActions = () => {
      store.dispatch("app/incrementIfOddOnRootSum");
    };

    const getForum = async () => {
      const params = { include: "users" };
       const data = await forum(params);
       console.log("===>forum", data);
    };

    const getThreads = async () => {
      const params = {
        include:
          "user,user.groups,firstPost,firstPost.images,firstPost.postGoods,category,threadVideo,threadAudio",
        "filter[isDeleted]": "no",
        "filter[isApproved]": 1,
        "filter[isSite]": "yes",
        "page[number]": 1,
        "page[limit]": 10,
      };
      const data = await threads(params);
      console.log("===>threads", data);
    };

    onMounted(() => {
      getForum();
      getThreads();
    });

    return {
      count,
      onMutations,
      onActions,
    };
  },
};
</script>
<style lang="scss" scoped>
.demo {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
}
</style>

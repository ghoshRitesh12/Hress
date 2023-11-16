<template>
  <div data-level-income>
    <div class="text-2xl border-b-[1px] border-zinc-700/80 pb-3 mt-0">
      {{ props?.adminView ? "Level Income" : "My Level Income" }}
    </div>

    <div class="text-[.85rem] text-zinc-400 mt-2">
      Select a level to view level income for the
      <span v-if="d.getDate() <= 15"> 1<sup>st</sup> </span>
      <span v-else> 2<sup>nd</sup> </span>
      half of the month of
      {{ d.toLocaleString("default", { month: "long" }) }}.
    </div>

    <Select
      v-if="props?.selectIncomeLevels?.length"
      class="w-[15rem] ml-auto mt-4"
      placeholder="Select level income"
      :options="props?.selectIncomeLevels"
      @input-change="fetchLevelIncome"
    />

    <Inconvenience
      v-else
      img-src="/images/join_team.svg"
      :img-width="512"
      :img-height="532"
      img-style="max-w-[9rem] sm:max-w-[12rem] md:max-w-[15rem]"
      class="mt-6"
    >
      <div v-if="props?.adminView">
        Oops, it seems like you haven't sponsored any member yet.
        <br />
        Members sponsored by you show up here in their respective levels.
      </div>
      <div v-else>Oops this user hasn't sponsored any member yet.</div>
    </Inconvenience>

    <IncomeLevelWiseTab
      :level="incomeLevelInfo"
      class="my-6"
    />
  </div>
</template>

<script setup>
const d = new Date();
const { setPopupMessage } = usePopup();

const props = defineProps({
  selectIncomeLevels: Array,
  fetchUrl: {
    type: String,
    required: true,
  },
  adminView: {
    type: Boolean,
    default: false,
  },
});

const incomeLevelInfo = useState(() => null);
async function fetchLevelIncome(incomeLevel) {
  try {
    if (!props?.fetchUrl) throw new Error("fetch url not found");

    const { data, error } = await useFetch(`${props.fetchUrl}/${incomeLevel}`, {
      headers: useRequestHeaders(["cookie"]),
    });

    if (error.value) {
      setPopupMessage(error.value?.statusMessage);
      return;
    }
    incomeLevelInfo.value = data.value;
  } catch (err) {
    console.error(err);
  }
}

onUnmounted(() => {
  incomeLevelInfo.value = null;
});
</script>

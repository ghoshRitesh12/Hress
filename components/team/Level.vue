<template>
  <div data-level>
    <div
      class="flex items-center py-3 px-4 bg-zinc-800 border-[1px] border-zinc-700 rounded-2xl cursor-pointer sm:px-5 shadow-md shadow-black/50"
    >
      <div
        class="flex items-center w-full text-[1.08rem] pointer-events-none border-[0px]"
      >
        <div class="align-middle">
          Level
          <span class="ml-1">
            {{ props.levelNo }}
          </span>
        </div>

        <div
          class="flex items-center ml-auto mr-6 sm:mr-10 text-zinc-300 text-[.9rem]"
        >
          <Icon
            class="text-lg"
            name="fluent:people-queue-24-regular"
          />
          <div class="ml-[.4rem] select-none">
            {{ props?.totalNoOfReferrals ?? 0 }}
          </div>
        </div>
      </div>

      <div class="ml-auto pointer-events-none">
        <Icon
          class="text-2xl"
          :name="`${
            props.levelOpen
              ? 'material-symbols:expand-less-rounded'
              : 'material-symbols:expand-more-rounded'
          }`"
        />
      </div>
    </div>

    <!-- v-show="props.levelOpen" -->
    <div
      data-level-members
      class="flex flex-col gap-1 overflow-hidden mx-2 pt-0 border-[1px] border-t-0 border-zinc-700 rounded-bl-xl rounded-br-xl"
    >
      <TeamMember
        v-for="member in props.referrals"
        :key="member.referralId"
        :commission="member.commission"
        :user="member"
      />

      <button
        v-if="hasMore"
        type="button"
        :class="
          fc(`
            border-zinc-700 border-[1px] text-[.85rem]  
            mx-auto w-fit py-2 px-6 mb-3 mt-1 rounded-xl
            text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800/70 
            active:scale-95 transition ease-in duration-100
          `)
        "
        @click="fetchMoreReferrals"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup>
import fc from "~/utils/classes";

const props = defineProps({
  levelNo: {
    type: Number,
    required: true,
  },
  referrals: {
    type: Array,
    required: true,
  },
  totalNoOfReferrals: {
    type: Number,
    default: false,
  },
  hasMoreReferrals: {
    type: Boolean,
    default: false,
  },
});

const { setPopupMessage } = usePopup();

const referrals = useState(() => []);
const hasMore = useState(() => false);
const next_crsr = useState(() => undefined);

onMounted(() => {
  referrals.value = props.referrals;
  hasMore.value = props.hasMoreReferrals;
  next_crsr.value = referrals?.value?.at(-1)?.crsr;
});

async function fetchMoreReferrals() {
  try {
    if (!next_crsr) return;

    const { data, error } = await useFetch(
      `/api/account/team/${props.levelNo}?next_crsr=${next_crsr.value}`,
      {
        headers: useRequestHeaders(["cookie"]),
      }
    );

    if (error?.value) {
      setPopupMessage(error?.value?.statusMessage);
      return;
    }
    referrals?.value?.push(...data?.value?.referrals);
    hasMore.value = data?.value?.hasMore;
    next_crsr.value = data?.value?.referrals?.at(-1)?.crsr;
    //
  } catch (err) {
    console.log(err);
  }
}

onUnmounted(() => {
  referrals.value = [];
  hasMore.value = false;
  next_crsr.value = undefined;
});
</script>

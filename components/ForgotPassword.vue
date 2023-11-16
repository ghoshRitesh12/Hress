<template>
  <div class="ml-auto w-fit">
    <div
      class="text-[.9rem] pl-4 pr-1 mt-4 cursor-pointer text-green-200"
      type="button"
      @click="generateVerifyCode"
    >
      <span class="pointer-events-none"> Forgot password? </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  emailId: {
    type: String,
    required: true,
  },
});

const { setPopupMessage } = usePopup();

async function generateVerifyCode() {
  try {
    if (!props?.emailId?.trim()) return;

    const { data, error } = await useFetch("/api/pwd/gen-verifycode", {
      method: "POST",
      body: {
        email: props?.emailId,
      },
    });

    if (error?.value) {
      setPopupMessage(error?.value?.statusMessage);
      return;
    }
    localStorage.setItem("hress_forgot_pwd_try", true);
    setPopupMessage(data?.value?.message);
    //
  } catch (err) {
    console.error(err);
  }
}
</script>

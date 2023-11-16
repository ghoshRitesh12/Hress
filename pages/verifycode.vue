<template>
  <div
    class="flex items-center justify-center px-4 py-6 min-h-full mt-auto text-base"
  >
    <div
      class="border-2 px-5 sm:px-6 py-12 md:px-8 rounded-2xl border-zinc-800"
    >
      <div class="text-center mb-10">
        <div class="mb-8 text-2xl font-semibold">Account Recovery</div>

        <p
          class="max-w-[40ch] leading-[1.4]"
          style="text-decoration: none"
        >
          Enter your new password to continue account recovery.
        </p>
      </div>

      <VForm
        @submit="submitPwdResetForm"
        :validation-schema="clientPwdResetSchema"
      >
        <div class="mt-4">
          <VField
            type="hidden"
            name="userId"
            :value="userId"
          />

          <div>
            <label class="block">New Password</label>

            <VField
              :type="`${pwdVisible ? 'text' : 'password'}`"
              placeholder="secret new password"
              required
              autocorrect="false"
              class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
              name="newPassword"
              spellcheck="false"
              autocapitalize="false"
              autocomplete="false"
            />

            <VErrorMessage
              name="newPassword"
              :class="
                fc(`
                  block text-red-300 text-[.8rem] 
                  mt-1 max-w-[40ch] w-full mx-auto 
                  text-center leading-[1.2]
                `)
              "
            />
          </div>

          <div class="mt-4">
            <label class="block">Confirm new password</label>

            <VField
              :type="`${pwdVisible ? 'text' : 'password'}`"
              placeholder="confirm new secret"
              required
              autocorrect="false"
              class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
              name="confirmNewPassword"
              spellcheck="false"
              autocapitalize="false"
              autocomplete="false"
            />

            <VErrorMessage
              name="confirmNewPassword"
              :class="
                fc(`
                  block text-red-300 text-[.8rem] 
                  mt-1 max-w-[40ch] w-full mx-auto 
                  text-center leading-[1.2]
                `)
              "
            />
          </div>

          <label
            aria-label="password visibility toggler"
            class="block mt-4 ml-auto w-fit text-zinc-400"
          >
            <input
              type="checkbox"
              class="mr-2 h-[.85rem] w-[.85rem] aspect-square accent-accent-200 align-middle"
              v-model="pwdVisible"
            />

            <div class="inline-block select-none text-[.92rem]">
              Show password
            </div>
          </label>
        </div>

        <div class="mt-8">
          <button
            type="submit"
            :class="
              fc(`
                flex items-center justify-center gap-3 w-full
                bg-accent-200 hover:bg-green-400 px-4 py-3 
                rounded-2xl text-primary-900 font-semibold 
                transition ease-in duration-100 text-[.95rem]
                ${isPending ? 'pointer-events-none' : ''}
              `)
            "
          >
            {{ isPending ? "Just a sec..." : "Continue Recovery" }}
            <Icon
              v-show="isPending"
              class="text-2xl"
              name="line-md:loading-twotone-loop"
            />
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script setup>
import fc from "~/utils/classes";
import { clientPwdResetSchema } from "~/utils/pwdResetSchemas";

useHead({
  title: "Hress Account Recovery",
});
definePageMeta({
  layout: "auth",
});

const { setPopupMessage } = usePopup();
const pwdVisible = useState(() => false);
const { query } = useRoute();

if (!query?.t?.trim()) {
  navigateTo("/");
}

const fetchUrl = new URL(
  "/api/pwd/verifycode",
  useRuntimeConfig()?.public?.auth?.origin
);
fetchUrl.searchParams.set("token", query?.t);

const userId = useState(() => null);
const { data, error } = await useFetch(fetchUrl.href);
if (error?.value || !data?.value) {
  setPopupMessage(error?.value?.statusMessage);
  navigateTo(`/login?msg=${error?.value?.statusMessage}`);
} else {
  userId.value = data?.value?.id;
}

const isPending = useState(() => false);
async function submitPwdResetForm(values) {
  try {
    console.log(values);

    const { data, error } = await useFetch("/api/pwd/reset", {
      method: "POST",
      body: markRaw(values),
    });

    if (error?.value) {
      setPopupMessage(error?.value?.statusMessage);
      return;
    }
    setPopupMessage(data?.value?.message);
    localStorage.removeItem("hress_forgot_pwd_try");
    navigateTo("/login");
    //
  } catch (err) {
    console.log(err);
  }
}
</script>

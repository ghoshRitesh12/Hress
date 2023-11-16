<template>
  <div
    class="flex items-center justify-center px-4 py-6 min-h-full mt-auto text-base"
  >
    <div
      class="border-2 px-5 sm:px-6 py-12 md:px-8 rounded-2xl border-zinc-800"
    >
      <div class="text-center mb-10">
        <div class="mb-8 text-2xl font-semibold">Welcome back</div>

        <p
          class="max-w-[40ch] leading-[1.4]"
          style="text-decoration: none"
        >
          Enter your credentials to access your account.
        </p>
      </div>

      <VForm
        @submit="submitLoginForm"
        :validation-schema="clientLoginSchema"
      >
        <div class="relative">
          <label
            for="email"
            class="block"
          >
            Email address
          </label>

          <VField
            type="email"
            placeholder="name@email.com"
            name="email"
            required
            v-model="emailField"
            autocorrect="false"
            :class="
              fc(`
                px-4 py-3 rounded-xl bg-zinc-800 w-full mt-3
                focus:outline-none focus:outline-green-300 
                focus:outline-1 focus:outline-offset-0
              `)
            "
            autocapitalize="false"
            autocomplete="false"
          />

          <VErrorMessage
            name="email"
            class="errMsg"
          />
        </div>

        <div class="relative mt-4">
          <label
            for="password"
            class="block"
          >
            Password
          </label>

          <div class="relative w-full">
            <VField
              :type="`${pwdVisible ? 'text' : 'password'}`"
              placeholder="secret password"
              name="password"
              required
              autocorrect="false"
              :class="
                fc(`
                  pl-4 pr-14 py-3 rounded-xl bg-zinc-800 mt-3 
                  focus:outline-none focus:outline-green-300 
                  focus:outline-1 focus:outline-offset-0 w-full
                `)
              "
              autocapitalize="false"
              autocomplete="false"
            />

            <button
              @click="togglePwdField"
              type="button"
              class="absolute top-[50%] translate-y-[-36%] right-1 border-[0px] py-2 px-3"
              aria-label="password visibility toggler"
            >
              <Icon
                :name="pwdIcon"
                class="text-2xl text-zinc-300"
              />
            </button>
          </div>

          <VErrorMessage
            name="password"
            class="errMsg"
          />
        </div>

        <ForgotPassword :email-id="emailField" />

        <div class="mt-10">
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
            {{ isPending ? "Just a sec" : "Login" }}
            <Icon
              v-show="isPending"
              class="text-2xl"
              name="line-md:loading-twotone-loop"
            />
          </button>
        </div>
      </VForm>

      <div class="mt-6 text-center">
        Don't have an account yet?

        <NuxtLink
          to="/signup"
          class="text-accent-100"
        >
          Create one
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import fc from "~/utils/classes";
import { clientLoginSchema } from "~/utils/loginSchema";

useHead({
  meta: [
    {
      name: "title",
      content: "Hress - Login",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://hress.in/login",
    },
  ],
});
useSeoMeta({
  title: "Hress - Login",
  robots: {
    index: true,
    follow: true,
    maxImagePreview: "large",
    maxSnippet: -1,
    maxVideoPreview: -1,
  },
  description: `Log in to Hress to continue learning about blockchain and cryptocurrency, while also earning with us`,
  ogTitle: "Hress - Login",
  ogDescription: `Log in to Hress to continue learning about blockchain and cryptocurrency, while also earning with us`,
  ogImage: "https://hress.in/images/hress-og-img.png",
  ogUrl: "https://hress.in/login",
  ogImageWidth: "192",
  ogImageHeight: "192",
  ogSiteName: "Hress",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterSite: "@hress",
  twitterTitle: "Hress - Login",
  twitterDescription: `Log in to Hress to continue learning about blockchain and cryptocurrency, while also earning with us`,
  twitterImageSrc: "https://hress.in/images/hress-og-img.png",
  keywords: "Hress, Hress Login, Credentials, Access account, account",
});
definePageMeta({
  layout: "auth",
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/account",
  },
});

const { setPopupMessage } = usePopup();
const emailField = useState(() => "");

const pwdVisible = useState("pwdVisible", () => false);
const pwdIcon = useState("pwdIcon", () => "mdi:eye-off-outline");

function togglePwdField() {
  pwdVisible.value = !pwdVisible.value;
  if (pwdVisible.value) {
    pwdIcon.value = "mdi:eye-outline";
    return;
  }
  pwdIcon.value = "mdi:eye-off-outline";
}

const isPending = useState(() => false);
async function submitLoginForm(values) {
  try {
    const { signIn } = useAuth();

    isPending.value = true;
    const { error, url } = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/account",
    });
    isPending.value = false;

    if (url) {
      setPopupMessage("Welcome back 🤗");
      return navigateTo("/account");
    }

    setPopupMessage(error);
  } catch (err) {
    console.log(err);
    throw createError({
      message: err.message,
    });
  }
}

// related to pwd reset
const { query } = useRoute();
if (
  process.client &&
  JSON.parse(localStorage.getItem("hress_forgot_pwd_try")) &&
  query?.msg
) {
  setPopupMessage(decodeURIComponent(query?.msg));
}
</script>

<style scoped>
.errMsg {
  @apply block text-red-300 text-[.8rem] 
    mt-1 max-w-[40ch] w-full mx-auto 
    text-center leading-[1.2];
}
</style>

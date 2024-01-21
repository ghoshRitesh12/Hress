<template>
  <div
    class="flex items-center justify-center px-4 py-6 min-h-full mt-auto text-base"
  >
    <div
      class="border-2 px-5 sm:px-6 py-12 md:px-8 rounded-2xl border-zinc-800 relative overflow-hidden"
    >
      <div
        data-form-progress
        class="absolute top-0 left-0 w-full flex items-center"
      >
        <div
          class="min-h-[.25rem] flex-grow"
          :class="`${formStep >= 0 ? 'bg-accent-200' : ''}`"
          style="transition: 0.1s ease-in"
        ></div>
        <div
          class="min-h-[.25rem] flex-grow"
          :class="`${formStep >= 1 && formStep <= 3 ? 'bg-accent-200' : ''}`"
          style="transition: 0.1s ease-in"
        ></div>
        <div
          class="min-h-[.25rem] flex-grow"
          :class="`${formStep >= 2 && formStep <= 3 ? 'bg-accent-200' : ''}`"
          style="transition: 0.1s ease-in"
        ></div>
        <div
          class="min-h-[.25rem] flex-grow"
          :class="`${formStep >= 3 ? 'bg-accent-200' : ''}`"
          style="transition: 0.1s ease-in"
        ></div>
      </div>

      <div class="text-center mb-10 w-fit mx-auto">
        <div class="mb-8 text-2xl font-semibold">Create an account</div>

        <p
          class="max-w-[35ch] leading-[1.4]"
          style="text-decoration: none"
        >
          Register to create your first account and get started.
        </p>
      </div>

      <VForm
        @submit="nextSignup"
        keep-values
        :validation-schema="currentSchema"
        v-slot="{ values: { email, fullname } }"
      >
        <div
          data-signup-step-0
          v-if="formStep === 0"
        >
          <div>
            <label class="block">Full name</label>

            <VField
              type="text"
              placeholder="John Doe"
              required
              autocorrect="false"
              class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
              name="fullname"
              spellcheck="false"
              autocapitalize="false"
              autocomplete="false"
            />

            <VErrorMessage
              name="fullname"
              class="errMsg"
            />
          </div>

          <div class="mt-4">
            <label
              for="email"
              class="block"
            >
              Email address
            </label>

            <!-- required -->
            <VField
              type="email"
              placeholder="name@email.com"
              autocorrect="false"
              class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
              name="email"
              spellcheck="false"
              autocapitalize="false"
              autocomplete="false"
            />

            <VErrorMessage
              name="email"
              class="errMsg"
            />
          </div>

          <div class="mt-4">
            <div class="mb-2">Type of course:</div>

            <div class="flex flex-col pl-4 justify-between">
              <div class="flex items-center">
                <VField
                  name="course"
                  type="radio"
                  value="basic"
                  class="block accent-accent-200 h-[.9rem] w-[.9rem] mr-3"
                  id="basic-course"
                />
                <label
                  for="basic-course"
                  class="block w-full"
                >
                  Basic course
                </label>
              </div>

              <div class="flex items-center">
                <VField
                  name="course"
                  type="radio"
                  value="advance"
                  class="block accent-accent-200 h-[.9rem] w-[.9rem] mr-3"
                  id="advance-course"
                />
                <label
                  for="advance-course"
                  class="block w-full"
                >
                  Advance course
                </label>
              </div>
            </div>

            <VErrorMessage
              name="course"
              class="errMsg"
            />
          </div>
        </div>

        <div
          data-signup-step-1
          v-else-if="formStep === 1"
        >
          <div>
            <label class="block">
              Referer ID
              <span class="text-[.8rem] text-zinc-400 ml-1">
                (only for spillover joining)
              </span>
            </label>

            <VField
              type="text"
              minlength="10"
              placeholder="referer's id"
              autocorrect="false"
              maxlength="10"
              class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
              name="refererId"
              spellcheck="false"
              autocapitalize="false"
              autocomplete="false"
            />

            <VErrorMessage
              name="refererId"
              class="errMsg"
            />
          </div>

          <div class="mt-4">
            <label class="block">Sponsorer ID</label>

            <VField
              type="text"
              placeholder="sponsorer's id"
              required
              autocorrect="false"
              maxlength="10"
              class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
              name="sponsorerId"
              spellcheck="false"
              autocapitalize="false"
              autocomplete="false"
            />

            <VErrorMessage
              name="sponsorerId"
              class="errMsg"
            />
          </div>
        </div>

        <div
          data-signup-step-2
          v-else-if="formStep === 2"
        >
          <div class="mt-4">
            <div>
              <label class="block">Password</label>

              <VField
                :type="`${pwdVisible ? 'text' : 'password'}`"
                placeholder="secret password"
                required
                autocorrect="false"
                class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
                name="password"
                spellcheck="false"
                autocapitalize="false"
                autocomplete="false"
              />

              <VErrorMessage
                name="password"
                class="errMsg"
              />
            </div>

            <div class="mt-4">
              <label class="block">Confirm password</label>

              <VField
                :type="`${pwdVisible ? 'text' : 'password'}`"
                placeholder="confirm secret"
                required
                autocorrect="false"
                class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
                name="confirmPassword"
                spellcheck="false"
                autocapitalize="false"
                autocomplete="false"
              />

              <VErrorMessage
                name="confirmPassword"
                class="errMsg"
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
        </div>

        <div
          data-signup-step-3
          v-else
        >
          <div class="mt-4">
            <label class="block"> Active token </label>

            <VField
              type="text"
              placeholder="account activation token"
              required
              autocorrect="false"
              class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
              name="activeToken"
              spellcheck="false"
              maxlength="18"
              autocapitalize="false"
              autocomplete="false"
            />

            <VErrorMessage
              name="activeToken"
              class="errMsg"
            />
          </div>

          <div class="mt-4">
            <label class="block">OTP</label>

            <VField
              type="text"
              placeholder="otp in your email"
              required
              autocorrect="false"
              class="px-4 py-3 rounded-xl bg-zinc-800 focus:outline-none focus:outline-green-300 focus:outline-1 focus:outline-offset-0 w-full mt-3"
              name="otp"
              spellcheck="false"
              maxlength="6"
              autocapitalize="false"
              autocomplete="false"
            />

            <VErrorMessage
              name="otp"
              class="errMsg"
            />
          </div>

          <div class="mt-4 w-fit ml-auto">
            <button
              type="button"
              class="px-4 py-2 bg-zinc-800 rounded-2xl text-[.9rem] border-[1px] border-accent-100 hover:bg-zinc-900 transition ease-in duration-100"
              @click="sendOtp(email, fullname)"
              ref="sendOtpBtn"
            >
              Send OTP
            </button>
          </div>

          <label class="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              class="h-[.9rem] w-[.9rem] align-middle aspect-square accent-accent-200"
              v-model="agreeTerms"
            />

            <div
              class="max-w-[37ch] text-[.8rem] mt-4 text-zinc-400 inline-block leading-[1.4]"
            >
              By signin up, you agree to our
              <NuxtLink
                to="/terms"
                class="text-zinc-200"
              >
                Terms
              </NuxtLink>
              and have read and acknowledged our
              <NuxtLink
                to="/privacy"
                class="text-zinc-200"
              >
                Privacy policy.
              </NuxtLink>
            </div>
          </label>
        </div>

        <div class="flex items-center gap-4 mt-10">
          <button
            v-if="formStep > 0"
            type="button"
            @click="prevStep"
            class="bg-zinc-600 hover:bg-zinc-700 px-3 pl-[1.1rem] py-3 rounded-2xl text-white flex-shrink-0 font-semibold transition ease-in duration-100"
          >
            <Icon
              name="material-symbols:arrow-back-ios-rounded"
              class="text-xl"
            />
          </button>

          <button
            type="submit"
            class="w-full bg-accent-200 hover:bg-green-400 px-4 py-3 rounded-2xl text-primary-900 text-[.95rem] disabled:bg-accent-200/60 disabled:pointer-events-none font-semibold transition ease-in duration-100"
            :disabled="formStep > 2 && !agreeTerms"
            :class="isPending && 'pointer-events-none'"
          >
            <div
              v-if="isPending"
              class="flex items-center justify-center gap-3"
            >
              Signing you up
              <Icon
                class="text-2xl"
                name="line-md:loading-twotone-loop"
              />
            </div>

            <div v-else>
              {{ formStep < 3 ? "Continue" : "Sign up" }}
            </div>
          </button>
        </div>
      </VForm>

      <div class="mt-6 text-center">
        Already have an account?

        <NuxtLink
          to="/login"
          class="text-accent-100"
        >
          Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { clientSignupSchema } from "../utils/signupSchema.js";

useHead({
  meta: [
    {
      name: "title",
      content: "Hress - Signup",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://hress.in/signup",
    },
  ],
});

useSeoMeta({
  title: "Hress - Signup",
  robots: {
    index: true,
    follow: true,
    maxImagePreview: "large",
    maxSnippet: -1,
    maxVideoPreview: -1,
  },
  description: `Create account at Hress to learn about blockchain and cryptocurrency, while also earning with us`,
  ogTitle: "Hress - Signup",
  ogDescription: `Create account at Hress to learn about blockchain and cryptocurrency, while also earning with us`,
  ogImage: "https://hress.in/images/hress-og-img.png",
  ogUrl: "https://hress.in/signup",
  ogImageWidth: "192",
  ogImageHeight: "192",
  ogSiteName: "Hress",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterSite: "@hress",
  twitterTitle: "Hress - Signup",
  twitterDescription: `Create account at Hress to learn about blockchain and cryptocurrency, while also earning with us`,
  twitterImageSrc: "https://hress.in/images/hress-og-img.png",
  keywords:
    "Hress, Hress Signup, Credentials, Create account, new account, account",
});

definePageMeta({
  layout: "auth",
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/account",
  },
});

const agreeTerms = useState("agreeTerms", () => false);
const pwdVisible = useState("pwdVisible", () => false);

const sendOtpBtn = useState("sendOtpBtn", () => null);
const formStep = useState("formStep", () => 0);

const currentSchema = computed(() => {
  return clientSignupSchema[formStep.value];
});

const prevStep = () => {
  if (formStep.value > 0) {
    formStep.value--;
  }
};

const { setPopupMessage } = usePopup();

const isPending = useState(() => false);
const nextSignup = async (values) => {
  if (formStep.value < 3) return formStep.value++;

  try {
    if (!agreeTerms.value) return;
    isPending.value = true;

    const { data, error, pending } = await useFetch("/api/auth/signup", {
      method: "POST",
      body: markRaw(values),
    });
    isPending.value = pending.value;

    if (data?.value) {
      navigateTo("/login");
      setPopupMessage(data?.value?.message);
      formStep.value = 0;
    } else {
      setPopupMessage(error?.value?.statusMessage);
    }
  } catch (err) {
    console.log(err);
  }
};

const sendOtp = async (email, fullname) => {
  try {
    if (!email) return;
    sendOtpBtn.value.innerText = "...Sending OTP";

    const { data, error } = await useFetch("/api/auth/sendotp", {
      method: "POST",
      body: {
        emailId: email,
        fullname,
      },
    });

    sendOtpBtn.value.innerText = "Send OTP";
    if (data?.value) {
      setPopupMessage(data?.value?.message);
    } else {
      setPopupMessage(error?.value?.statusMessage);
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped>
.errMsg {
  @apply block text-red-300 text-[.8rem] 
    mt-1 max-w-[40ch] w-full mx-auto 
    text-center leading-[1.2];
}
</style>

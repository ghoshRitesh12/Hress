<template>

  <div data-account-team class="pb-12">

    <TeamParentMember
      class="mb-6"
      :sponsorer-pfp="'https://api.dicebear.com/6.x/bottts/png?seed=1687525386415&eyes=shade01&mouth=smile01&texture=circuits&face=round02&sides=square'"
      :sponsorer-name="'Susanta Ghosh'"
    />

    <div 
      class="
      text-2xl border-b-[1px] border-zinc-700/80
      pb-3 mt-0
      "
    >
      My Team
    </div>


    <div class="flex flex-col gap-6 mt-8">
      
      <TeamLevel
        v-for="level, index in levels"
        :index="index"
        :key="level.levelNo"
        :level-no="level.levelNo"
        :referrals="level.referrals"
        :level-open="activeLevel === index"
        @toggle-level="toggleLevel"
      />

    </div>


  </div>

</template>


<script setup>

useHead({
  title: 'Account - My Team'
})

definePageMeta({
  layout: 'account'
})


const activeLevel = ref(-1);

const toggleLevel = (levelIndex) => {
  activeLevel.value = levelIndex
}


const levels = [
  {
    "levelNo": 1,
    "referrals": [
      {
        "commission": 20,
        "userRef": {
          "name": "Ritesh Ghosh"
        }
      }
    ]
  },
  {
    "levelNo": 2,
    "referrals": [
      {
        "commission": 6,
        "userRef": {
          "name": "Mamata Ghosh"
        }
      },
      {
        "commission": -1,
        "userRef": {
          "name": "Qwerty Poppins"
        }
      }
    ]
  },
  {
    "levelNo": 3,
    "referrals": [
      {
        "commission": 23,
        "userRef": {
          "name": "Peter"
        }
      },
      {
        "commission": 23,
        "userRef": {
          "name": "Sebastian"
        }
      },
      {
        "commission": 3,
        "userRef": {
          "name": "Martin"
        }
      }
    ]
  }
]

  
</script>


<style>

</style>

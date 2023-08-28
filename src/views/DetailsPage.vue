<script setup>
import { ref } from 'vue'
import { recipeFinderAPIrequest } from '../utilities/RecipeFinderAPI'

const props = defineProps({
  id: {
    type: String
  }
})

const loading = ref(false)
const loadedRecipeInformation = () => {
  loading.value = true
  recipeFinderAPIrequest(`recipes/${props.id}/information`)
    .then(function (response) {
      // handle success
      console.log(response)
      recipeInformation.value = {
        id: response.data.id,
        name: response.data.title,
        image: response.data.image,
        servings: response.data.servings,
        readyInMinutes: response.data.readyInMinutes,
        ingredients: response.data.extendedIngredients,
        instructions: response.data.instructions
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error)
      APIErrorHasHappenned.value = true
    })
    .finally(function () {
      loading.value = false
    })
}
loadedRecipeInformation()
const recipeInformation = ref({})
const APIErrorHasHappenned = ref(false)
const fit = 'contain'
</script>

<template>
  <header></header>
  <body>
    <el-row
      ><el-col :span="24" class="mx-1" size="large"> {{ recipeInformation.name }}</el-col></el-row
    >
    <div :key="fit" class="block">
      <el-image :src="recipeInformation.image" :fit="fit" alt="Recipe Picture" />
    </div>
    <el-row :gutter="20">
      <el-col :span="12" class="mx-1" size="large">{{ recipeInformation.servings }} servings</el-col
      ><el-col :span="12" class="mx-1" size="large"
        >Ready in {{ recipeInformation.readyInMinutes }} minutes</el-col
      ></el-row
    >
    <el-row
      ><el-col
        :span="24"
        v-for="ingredient in recipeInformation.ingredients"
        :key="ingredient.id"
        class="mx - 1"
        size="large"
        >{{ ingredient.original }}</el-col
      ></el-row
    >
    <el-row
      ><el-col :span="24" class="mx-1" size="large">
        <div v-html="recipeInformation.instructions"></div></el-col
    ></el-row>
    <p v-if="APIErrorHasHappenned">Oops! Error in loading data.</p>
  </body>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

<script setup>
import { computed, ref } from 'vue'
import { recipeFinderAPIrequest } from '../utilities/RecipeFinderAPI'

const props = defineProps({
  ingredients: {
    type: String
  }
})

const ingredientsArray = computed(() => {
  return JSON.parse(props.ingredients)
})

let numberOfRecipesToLoad = 10

console.log(props)
console.log(ingredientsArray.value)
var APIRequestCount = 0

const loading = ref(false)
const loadedRecipes = () => {
  loading.value = true
  const ingredientsString = ingredientsArray.value.join()
  APIRequestCount += 1
  if (APIRequestCount < 10) {
    recipeFinderAPIrequest('recipes/findByIngredients', {
      number: numberOfRecipesToLoad,
      ingredients: ingredientsString
    })
      .then(function (response) {
        // handle success
        console.log(response)
        recipes.value = response.data.map(function (recipe) {
          console.log(recipe)
          return { name: recipe.title, id: recipe.id }
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        APIErrorHasHappenned.value = true
      })
      .finally(function () {
        loading.value = false
        if (numberOfRecipesToLoad < 100) {
          numberOfRecipesToLoad += 10
        }
      })
  }
}
loadedRecipes()
const recipes = ref([])
const APIErrorHasHappenned = ref(false)
</script>

<template>
  <header></header>
  <body>
    <ul v-infinite-scroll="loadedRecipes" class="infinite-list" style="overflow: auto">
      <li
        v-for="recipe in recipes"
        :key="recipe.name"
        :loading="loading"
        class="infinite-list-item"
      >
        <router-link :to="{ name: 'details', params: { id: recipe.id } }">{{
          recipe.name
        }}</router-link>
      </li>
    </ul>
    <p v-if="!loading && recipes.length === 0 && !APIErrorHasHappenned">Oops! No search results.</p>
    <p v-if="APIErrorHasHappenned">Oops! Error in loading data.</p>
  </body>
</template>

<style>
.nav {
  margin-top: 2rem;
}
.infinite-list {
  height: 73vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

p {
  text-align: center;
}
</style>

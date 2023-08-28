<script setup>
import { ref } from 'vue'
import { recipeFinderAPIrequest } from '../utilities/RecipeFinderAPI'

const loading = ref(false)
const remoteMethod = (query) => {
  // Make a request for a user with a given ID
  if (query) {
    loading.value = true
    recipeFinderAPIrequest('food/ingredients/autocomplete', { query: query, number: 5 })
      .then(function (response) {
        // handle success
        console.log(response)
        options.value = response.data.map(function (recipe) {
          console.log(recipe)
          return { label: recipe.name, value: recipe.name }
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        APIErrorHasHappenned.value = true
      })
      .finally(function () {
        loading.value = false
      })
  } else {
    options.value = []
  }
}
const selectedIngredients = ref([])
const options = ref([])
const APIErrorHasHappenned = ref(false)
</script>

<template>
  <main>
    <span class="search-block">
      <div class="description">Pick your ingredients!</div>
      <div class="vl"></div>
      <el-select
        v-model="selectedIngredients"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter your ingredients"
        remote-show-suffix
        :multiple-limit="5"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div>
        <router-link
          :to="{
            name: 'results',
            params: {
              ingredients: JSON.stringify(selectedIngredients)
            }
          }"
          type="primary"
          >Run the search!</router-link
        >
      </div>
    </span>
    <p v-if="APIErrorHasHappenned">Oops! Error in loading data.</p>
  </main>
</template>

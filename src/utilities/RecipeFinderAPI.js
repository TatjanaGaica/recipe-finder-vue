import axios from 'axios'

export const recipeFinderAPIrequest = (address, params = {}) => {
  params.apiKey = import.meta.env.VITE_RECIPE_FINDER_API_KEY
  return axios.get(`https://api.spoonacular.com/${address}`, {
    params: params
  })
}

<script setup>
import { ref } from 'vue'

const titles = ['fight', 'ring', 'space', 'war', 'hero', 'animal', 'kingdom', 'witch']
const random = Math.floor(Math.random() * titles.length)
const movies = ref(null)

fetch(`https://www.omdbapi.com/?apikey=15b675db&s=${titles[random]}&type=movie&y=2023&page=1`)
  .then(response => response.json())
  .then(data => movies.value = data.Search)
  .catch(err => console.log('error', err))
</script>

<template>
  <div>
    <h1>The Open Movie Database</h1>
    <div
      class="movies"
      v-for="movie of movies"
      v-if="movies"
    >
      <img :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://stuartanddunn.officechoice.com.au/Images/ProductImages/product-image-1.png'" alt="poster">
      <h4>{{ movie.Title }}</h4>
      <h6>{{ movie.Year }}</h6>
    </div>
    <div v-else>
      <center>Loading...</center><br>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  *, *:before, *:after {
    -webkit-box-sizing: border-box !important;
    -moz-box-sizing: border-box !important;
    -ms-box-sizing: border-box !important;
    box-sizing: border-box !important;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 24px;
    text-decoration: underline;
  }

  .movies {
    overflow: hidden;

    img {
      width: 100%;
      max-width: 310px;
      padding: 4px;
      border: solid 1px #ddd;
    }

    h4 {
      margin: 0;
    }

    h6 {
      margin-top: 0;
      margin-bottom: 20px;
    }
  }
</style>

import Header from './header.js';
import Footer from './footer.js';
import { fetchData } from './productos.js';
import { stickyfunction } from './sticky.js'; // Importa la función de sticky.js

const App = {
  template: `
    <div class="grid-container">
      <header-component></header-component>
      <main class="item2">
        <img src="images/marca.jpg" class="imagen-centrada" alt="">
        <br><br>
        <h2>Destacados</h2>
        <div id="carouselExampleCaptions" class="carousel slide">
          <div class="carousel-indicators">
            <button v-for="(group, index) in groupedProducts" :key="index" type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="index" :class="{ active: index === 0 }" :aria-label="'Slide ' + (index + 1)"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(group, index) in groupedProducts" :key="index" class="carousel-item" :class="{ active: index === 0 }">
              <div class="d-flex justify-content-around">
                <div v-for="producto in group" :key="producto.id" class="card">
                  <img :src="producto.image" class="d-block w-100" :alt="producto.title" style="max-height: 150px; object-fit: contain;">
                  <div class="card-body">
                    <h6 class="card-title text-truncate" style="font-size: 0.8rem;">{{ producto.title }}</h6>
                    <p class="card-text" style="font-size: 0.7rem;">{{ producto.price }}</p>
                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </main>
        <footer-component></footer-component>
      </div>
    `,
    components: {
      'header-component': Header,
      'footer-component': Footer,
    },
    data() {
      return {
        menProducts: [],
        womenProducts: [],
      };
    },
    computed: {
      allProducts() {
        return [...this.menProducts, ...this.womenProducts];
      },
      groupedProducts() {
        let groups = [];
        for (let i = 0; i < this.allProducts.length; i += 3) {
          groups.push(this.allProducts.slice(i, i + 3));
        }
        return groups;
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const menData = await fetchData('https://fakestoreapi.com/products/category/men\'s clothing');
          this.menProducts = menData;

          const womenData = await fetchData('https://fakestoreapi.com/products/category/women\'s clothing');
          this.womenProducts = womenData;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
    },
    mounted() {
        stickyfunction(); // Llama a la función cuando se monta la aplicación
    },
};

Vue.createApp(App).mount('#app');
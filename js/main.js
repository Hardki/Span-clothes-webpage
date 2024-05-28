import Header from './header.js';
import Footer from './footer.js';
import { obtenerDatos } from './productos.js';
import { stickyfunction } from './sticky.js'; // Importa la función de sticky.js

const App = {
  template: `
    <div class="grid-container">
      <mi-header></mi-header>
      <main class="item2">
        <img src="images/marca.jpg" class="imagen-centrada" alt="">
        <br><br>
        <h2>Destacados</h2>
        <div id="carouselExampleCaptions" class="carousel slide">
          <div class="carousel-indicators">
            <button v-for="(grupo, indice) in agruparDatos" :key="indice" type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="indice" :class="{ active: indice === 0 }" :aria-label="'Diapositiva ' + (indice + 1)"></button>
          </div>
          <div class="carousel-inner">
            <div v-for="(grupo, indice) in agruparDatos" :key="indice" class="carousel-item" :class="{ active: indice === 0 }">
              <div class="d-flex justify-content-around">
                <div v-for="producto in grupo" :key="producto.id" class="card">
                  <img :src="producto.image" class="d-block w-100" :alt="producto.title" style="max-height: 150px; object-fit: contain;">
                  <div class="card-body">
                    <h6 class="card-title text-truncate" style="font-size: 0.8rem;">{{ producto.title }}</h6>
                    <p class="card-text" style="font-size: 0.7rem;">$ {{ producto.price }}</p>
                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Siguiente</span>
            </button>
          </div>
        </main>
        <mi-footer></mi-footer>
      </div>
    `,
    components: {
      'mi-header': Header,
      'mi-footer': Footer,
    },
    data() {
      return {
        hombresDatos: [],
        mujeresDatos: [],
      };
    },
    computed: {
      todosDatos() {
        return [...this.hombresDatos, ...this.mujeresDatos];
      },
      agruparDatos() {
        let grupos = [];
        for (let i = 0; i < this.todosDatos.length; i += 3) {
          grupos.push(this.todosDatos.slice(i, i + 3));
        }
        return grupos;
      },
    },
    created() {
      this.obtenerDatos();
    },
    methods: {
      async obtenerDatos() {
        try {
          const datosHombres = await obtenerDatos('https://fakestoreapi.com/products/category/men\'s clothing');
          this.hombresDatos = datosHombres;

          const datosMujeres = await obtenerDatos('https://fakestoreapi.com/products/category/women\'s clothing');
          this.mujeresDatos = datosMujeres;
        } catch (error) {
          console.error('Error recibiendo datos:', error);
        }
      },
    },
    mounted() {
        stickyfunction(); // Llama a la función cuando se monta la aplicación
    },
};

Vue.createApp(App).mount('#app');

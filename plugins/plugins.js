import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueTableIcons from 'vue-tabler-icons';

import 'vue3-perfect-scrollbar/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PerfectScrollbarPlugin);
  nuxtApp.vueApp.use(VueTableIcons);
});

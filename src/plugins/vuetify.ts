/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          primary: "#00c7f7",
          secondary: "#9026ff",
        },
      },
      dark: {
        colors: {
          primary: "#00c7f7",
          secondary: "#9026ff",
        },
      },
    },
  },
});

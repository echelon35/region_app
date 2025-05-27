import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  plugins: [
    forms,
  ],
} satisfies Config


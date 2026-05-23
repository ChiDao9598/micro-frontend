/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cdo: {
          'bg-primary':   '#0d1117',
          'bg-secondary': '#161b22',
          'bg-tertiary':  '#21262d',
          'border':       '#30363d',
          'text':         '#e6edf3',
          'text-muted':   '#8b949e',
          'text-faint':   '#6e7681',
          'accent':       '#58a6ff',
          'success':      '#3fb950',
          'warning':      '#d29922',
          'danger':       '#f85149',
          'info':         '#388bfd',
          'purple':       '#bc8cff',
          'orange':       '#ffa657',
        },
      },
    },
  },
};

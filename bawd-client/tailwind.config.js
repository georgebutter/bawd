module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
      },
      fontWeight: {
        'inherit': 'inherit',
      },
    },
    colors: {
      'primary': 'var(--primary)',
      'success': 'var(--success)',
      'error': 'var(--error)',
      'warning': 'var(--warning)',
      'primaryfaded': 'var(--primary-faded)',
      'bg': 'var(--bg)',
      'text': 'var(--text)',
      'faded': 'var(--faded)',
      'fg': 'var(--fg)',
      'transparent': 'transparent',
    },
    maxHeight: {
      8: '8rem',
    },
    minHeight: {
      8: '8rem',
    },
  },
  variants: {},
  plugins: [],
};

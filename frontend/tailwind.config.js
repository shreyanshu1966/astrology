/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'cosmic-purple': '#2D1B69',
        'golden-wisdom': '#FFD700',
        'mystic-teal': '#1F4E79',
        
        // Secondary Colors
        'celestial-blue': '#4A90E2',
        'sacred-rose': '#E91E63',
        'sage-green': '#7CB342',
        
        // Neutral Colors
        'soft-cream': '#FAF8F3',
        'charcoal': '#2C2C2C',
        'silver-mist': '#F5F5F5',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'Arial', 'sans-serif'],
        'accent': ['Dancing Script', 'cursive'],
      },
      fontSize: {
        'hero': '3.5rem',      // 56px
        'section': '2.5rem',   // 40px
        'subsection': '1.875rem', // 30px
        'card': '1.25rem',     // 20px
        'caption': '0.875rem', // 14px
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2D1B69 0%, #1F4E79 100%)',
        'card-gradient': 'linear-gradient(135deg, #4A90E2 0%, #E91E63 100%)',
        'cosmic-gradient': 'linear-gradient(135deg, #FAF8F3 0%, #FFFFFF 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #FFD700' },
          '100%': { boxShadow: '0 0 20px #FFD700, 0 0 30px #FFD700' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'cosmic': '0 10px 25px rgba(45, 27, 105, 0.15)',
        'golden': '0 5px 15px rgba(255, 215, 0, 0.3)',
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

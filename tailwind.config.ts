import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // shadcn-style theme tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        // custom palette (second config)
        heritage: {
          50: "#fefaf5",
          100: "#fdf2e9",
          200: "#fbe0c4",
          300: "#f7c394",
          400: "#f19c5c",
          500: "#eb7c3a",
          600: "#dc5f2a",
          700: "#b84823",
          800: "#923b24",
          900: "#763220",
          maroon: "hsl(var(--heritage-maroon))",
          beige: "hsl(var(--heritage-beige))",
          cream: "hsl(var(--heritage-cream))",
          brown: "hsl(var(--heritage-brown))",
          gold: "hsl(var(--heritage-gold))",
        },
        cultural: {
          50: "#f7f3f0",
          100: "#ede3db",
          200: "#dcc4b1",
          300: "#c59e81",
          400: "#b17d5a",
          500: "#a06645",
          600: "#935539",
          700: "#7a4530",
          800: "#64392b",
          900: "#533026",
        },
        warli: {
          50: "#faf9f7",
          100: "#f3f0ea",
          200: "#e6ddd0",
          300: "#d4c4ab",
          400: "#bfa580",
          500: "#b08d5e",
          600: "#a37a52",
          700: "#886245",
          800: "#70523d",
          900: "#5c4434",
        },
      },
      backgroundImage: {
        "gradient-cultural": "var(--gradient-cultural)",
        "gradient-warm": "var(--gradient-warm)",
        "gradient-hero": "var(--gradient-hero)",
        "heritage-gradient":
          "linear-gradient(135deg, #dc5f2a 0%, #923b24 50%, #533026 100%)",
        "cultural-gradient":
          "linear-gradient(135deg, #eb7c3a 0%, #a06645 50%, #70523d 100%)",
        "warli-pattern":
          "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f7c394\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"2\"/%3E%3Ccircle cx=\"50\" cy=\"10\" r=\"2\"/%3E%3Ccircle cx=\"10\" cy=\"50\" r=\"2\"/%3E%3Ccircle cx=\"50\" cy=\"50\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      boxShadow: {
        cultural: "var(--shadow-cultural)",
        warm: "var(--shadow-warm)",
        "glow-gold": "var(--glow-gold)",
        heritage: "0 10px 25px rgba(220, 95, 42, 0.15)",
        culturalExtra: "0 8px 20px rgba(160, 102, 69, 0.12)",
        warmExtra: "0 4px 15px rgba(235, 124, 58, 0.25)",
      },
      fontFamily: {
        cultural: "var(--font-cultural)",
        modern: "var(--font-modern)",
        heritage: ["Inter", "system-ui", "sans-serif"],
        culturalSerif: ["Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // extra utilities from second config
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-sm": {
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        },
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        ".text-shadow-lg": {
          textShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
        },
        ".backdrop-blur-xs": {
          backdropFilter: "blur(2px)",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".rotate-x-180": {
          transform: "rotateX(180deg)",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;

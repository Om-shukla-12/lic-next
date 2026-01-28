/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.375', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.625', letterSpacing: '0.02em', fontWeight: '500' }],
                xl: ['1.25rem', { lineHeight: '1.75', letterSpacing: '0.02em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '1.875', letterSpacing: '0.02em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '2', letterSpacing: '0.02em', fontWeight: '600' }],
                '4xl': ['2.25rem', { lineHeight: '2.25', letterSpacing: '0.02em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "roboto",
                paragraph: "open sans"
            },
            colors: {
                destructive: '#EF4444',
                'destructive-foreground': '#FFFFFF',
                muted: '#F3F4F6',
                'muted-foreground': '#6B7280',
                'card-background': '#FFFFFF',
                'card-heading': '#2563EB',
                'form-label': '#1F2937',
                'input-background': '#FFFFFF',
                'input-border': '#D1D5DB',
                'input-focus-border': '#2563EB',
                'upload-area-background': '#F9FAFB',
                'upload-area-border': '#D1D5DB',
                'skeleton-background': '#F3F4F6',
                'skeleton-highlight': '#E5E7EB',
                background: '#FFFFFF',
                secondary: '#FBBF24',
                foreground: '#1F2937',
                'secondary-foreground': '#1F2937',
                'primary-foreground': '#FFFFFF',
                primary: '#0054A6',
                // Accent colors for enhanced design
                'blue-light': '#E6F0F9',
                'blue-dark': '#003366',
                'yellow-light': '#FEF3C7',
                'yellow-dark': '#D97706',
                // Next.js default variable colors (optional compatibility)
                // 'background': "var(--background)",
                // 'foreground': "var(--foreground)",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
    ],
};

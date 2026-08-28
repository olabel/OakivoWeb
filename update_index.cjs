const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const linkTag = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">`;

// Add link tag before </head> if not exists
if (!html.includes('fonts.googleapis.com/css2?family=Inter')) {
    html = html.replace('</head>', linkTag + '\n  </head>');
}

const tailwindConfigStr = `tailwind.config = {
        theme: {
          extend: {
            colors: {
              oakivo: {
                primary: '#08090A', 
                dark: '#0B0C0E',
                slate: '#121316',
                surface: '#17181C',
                card: '#111215',
                cardHover: '#18191E',
                linearIndigo: '#5E6AD2',
                linearPurple: '#8257E5',
                secondary: '#00F0FF', 
                accent: '#10B981', 
                gold: '#F59E0B',
                bg: '#08090A',
                light: '#F7F8F8',
                muted: '#8A8F98', 
                border: 'rgba(255, 255, 255, 0.08)',
                borderHover: 'rgba(255, 255, 255, 0.18)',
                glow: 'rgba(94, 106, 210, 0.2)'
              },
              slate: {
                950: '#020617',
              }
            },
            fontFamily: {
              sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
              display: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
              mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
            },
            letterSpacing: {
              'linear-tight': '-0.03em',
              'linear-normal': '-0.011em',
              'linear-wide': '0.06em'
            },
            boxShadow: {
              'linear-glow': '0 0 50px -10px rgba(94, 106, 210, 0.3)',
              'linear-cyan': '0 0 50px -10px rgba(0, 240, 255, 0.25)',
              'linear-card': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 20px rgba(0, 0, 0, 0.4)',
              'linear-card-hover': '0 0 0 1px rgba(255, 255, 255, 0.18), 0 20px 40px rgba(0, 0, 0, 0.6)',
              'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
            },
            animation: {
              'fade-in-up': 'fadeInUp 1s ease-out forwards',
              'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
              fadeInUp: {
                '0%': { opacity: '0', transform: 'translateY(30px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              }
            }
          }
        }
      }`;

const startRegex = /tailwind\.config = \{/;
const endRegex = /\}\s*\<\/script\>/;

let configStart = html.search(startRegex);
if (configStart !== -1) {
    let sub = html.substring(configStart);
    let configEnd = sub.search(endRegex);
    if (configEnd !== -1) {
        html = html.substring(0, configStart) + tailwindConfigStr + '\n    ' + sub.substring(configEnd);
    }
}

const customStyles = `
      .glass-panel {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.04);
      }
      .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.5rem;
      }
      /* Custom scrollbar for premium feel */
      ::-webkit-scrollbar {
          width: 8px;
      }
      ::-webkit-scrollbar-track {
          background: #020617; 
      }
      ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1); 
          border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2); 
      }
`;

if (!html.includes('.glass-panel')) {
    html = html.replace('<style>', '<style>' + customStyles);
}

fs.writeFileSync('index.html', html);

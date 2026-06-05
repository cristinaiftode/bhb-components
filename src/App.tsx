const colors = [
  { name: 'brand',       hex: '#00A8FF' },
  { name: 'brand-shade', hex: '#0097E6' },
  { name: 'alert',       hex: '#E84118' },
  { name: 'alert-shade', hex: '#C23616' },
  { name: 'black-grey',  hex: '#2F3640' },
  { name: 'jeans-grey',  hex: '#7F8FA6' },
  { name: 'rain-grey',   hex: '#B1B8C2' },
  { name: 'moon-grey',   hex: '#BCC3CE' },
  { name: 'cloud-grey',  hex: '#C8D0DC' },
  { name: 'snow',        hex: '#F9FAFF' },
  { name: 'white',       hex: '#FFFFFF' }
];

const typeSamples = [
  { className: 'bhb-text-bold-xxxl',  label: 'Bold/XXXL'  },
  { className: 'bhb-text-bold-xxl',   label: 'Bold/XXL'   },
  { className: 'bhb-text-bold-xl',    label: 'Bold/XL'    },
  { className: 'bhb-text-bold-l',     label: 'Bold/L'     },
  { className: 'bhb-text-bold-m',     label: 'Bold/M'     },
  { className: 'bhb-text-m',          label: 'M'          },
  { className: 'bhb-text-s',          label: 'S'          },
  { className: 'bhb-text-caps-bold-m', label: 'Caps+Bold/M' }
];

function App() {
  return (
    <main>
      <h1>BHB Components</h1>
      <p>
        BuchhaltungsButler design system for prototyping in Claude Code. Tokens extracted
        from Figma — components coming next via <code>component-from-figma</code>.
      </p>

      <h2>Colors</h2>
      <div className="swatch-grid">
        {colors.map(c => (
          <div className="swatch" key={c.name}>
            <div className="swatch__chip" style={{ background: `var(--${c.name})` }} />
            <div className="swatch__meta">
              <div className="swatch__name">--{c.name}</div>
              <div className="swatch__hex">{c.hex}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Typography</h2>
      {typeSamples.map(t => (
        <div className="type-row" key={t.className}>
          <div className="type-row__label">{t.label}</div>
          <div className={t.className}>Speichern &amp; Weiter</div>
        </div>
      ))}
    </main>
  );
}

export default App;

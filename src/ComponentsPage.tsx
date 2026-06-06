import { Button, type ButtonVariant, type ButtonSize } from '../components';

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const sizes: ButtonSize[] = ['large', 'medium', 'small'];

export function ComponentsPage() {
  return (
    <>
      <h2>Button</h2>
      <p className="component-intro">
        4 variants × 3 sizes × 5 states (Rest / Hover / Focus / Disabled / Loading) + icon modes.
        Import: <code>import {'{ Button }'} from 'bhb-components';</code>
      </p>

      {/* Variants × default size */}
      <h3 className="showcase-h3">Variants — Large (default)</h3>
      <div className="showcase-row">
        {variants.map(v => (
          <Button key={v} variant={v}>Speichern &amp; Weiter</Button>
        ))}
      </div>

      {/* Sizes — Primary variant */}
      <h3 className="showcase-h3">Sizes</h3>
      <div className="showcase-grid">
        {variants.map(v => (
          <div className="showcase-grid__cell" key={v}>
            <div className="showcase-grid__label">{v}</div>
            {sizes.map(s => (
              <Button key={s} variant={v} size={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {/* States */}
      <h3 className="showcase-h3">States (Primary, Large)</h3>
      <div className="showcase-row">
        <Button>Rest</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      <p className="showcase-hint">Hover and Focus states activate on interaction — hover or tab to a button.</p>

      {/* All variants × Disabled */}
      <h3 className="showcase-h3">Disabled — all variants</h3>
      <div className="showcase-row">
        {variants.map(v => (
          <Button key={v} variant={v} disabled>Abbrechen</Button>
        ))}
      </div>

      {/* All variants × Loading */}
      <h3 className="showcase-h3">Loading — all variants</h3>
      <div className="showcase-row">
        {variants.map(v => (
          <Button key={v} variant={v} loading>Wird gespeichert…</Button>
        ))}
      </div>

      {/* Icon modes */}
      <h3 className="showcase-h3">Icons</h3>
      <div className="showcase-row">
        <Button iconLeft={<span aria-hidden>★</span>}>Mit Icon links</Button>
        <Button iconRight={<span aria-hidden>▶</span>}>Mit Icon rechts</Button>
        <Button iconOnly aria-label="Stern">
          <span aria-hidden>★</span>
        </Button>
        <Button iconOnly variant="ghost" aria-label="Menü öffnen">
          <span aria-hidden>≡</span>
        </Button>
      </div>
      <p className="showcase-hint">
        Icon glyphs above are Unicode placeholders. In real usage, pass a{' '}
        <code>&lt;FontAwesomeIcon&gt;</code> (or any ReactNode).
      </p>

      {/* Icon-only — all sizes */}
      <h3 className="showcase-h3">Icon-only — sizes</h3>
      <div className="showcase-row">
        {sizes.map(s => (
          <Button key={s} iconOnly size={s} aria-label={`Stern ${s}`}>
            <span aria-hidden>★</span>
          </Button>
        ))}
      </div>
    </>
  );
}

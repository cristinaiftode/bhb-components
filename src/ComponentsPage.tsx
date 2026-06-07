import { useState } from 'react';
import {
  AnalyticsIcon,
  BellIcon,
  Button,
  Checkbox,
  ClipboardListIcon,
  ColumnsIcon,
  DatePicker,
  ExchangeIcon,
  FileInvoiceIcon,
  FilePlusIcon,
  Footer,
  HomeIcon,
  IndustryIcon,
  Input,
  InputWithIcon,
  Logo,
  QuestionCircleIcon,
  RadioButton,
  Select,
  Sidebar,
  Textarea,
  type ButtonSize,
  type ButtonVariant,
} from '../components';

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const sizes: ButtonSize[] = ['large', 'medium', 'small'];

export function ComponentsPage() {
  const [radio, setRadio] = useState('a');

  return (
    <>
      {/* ============ Button ============ */}
      <h2>Button</h2>
      <p className="component-intro">
        4 variants × 3 sizes × 5 states + icon modes.
        <code>{`import { Button } from 'bhb-components';`}</code>
      </p>

      <h3 className="showcase-h3">Variants — Large</h3>
      <div className="showcase-row">
        {variants.map(v => (
          <Button key={v} variant={v}>Speichern &amp; Weiter</Button>
        ))}
      </div>

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

      <h3 className="showcase-h3">States (Primary, Large)</h3>
      <div className="showcase-row">
        <Button>Rest</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>

      <h3 className="showcase-h3">Icons</h3>
      <div className="showcase-row">
        <Button iconLeft={<span aria-hidden>★</span>}>Mit Icon links</Button>
        <Button iconRight={<span aria-hidden>▶</span>}>Mit Icon rechts</Button>
        <Button iconOnly aria-label="Stern"><span aria-hidden>★</span></Button>
        <Button iconOnly variant="ghost" aria-label="Menü öffnen"><span aria-hidden>≡</span></Button>
      </div>

      {/* ============ Input ============ */}
      <h2>Input</h2>
      <p className="component-intro">
        Standard text input with label, helper, and error states.
        <code>{`import { Input } from 'bhb-components';`}</code>
      </p>
      <div className="form-grid">
        <Input label="Label" defaultValue="Input" />
        <Input label="Label" placeholder="Input" />
        <Input label="Label" defaultValue="Input" disabled />
        <Input label="Label" defaultValue="Input" readOnly />
        <Input label="Label" defaultValue="Input" error="Pflichtfeld" />
        <Input label="Label" placeholder="Input" helperText="Optional helper text" />
      </div>

      {/* ============ InputWithIcon ============ */}
      <h2>InputWithIcon</h2>
      <p className="component-intro">
        Input with leading and/or trailing icon slots.
        <code>{`import { InputWithIcon } from 'bhb-components';`}</code>
      </p>
      <div className="form-grid">
        <InputWithIcon label="Label" defaultValue="Input" iconRight={<span>★</span>} />
        <InputWithIcon label="Label" placeholder="Input" iconLeft={<span>⌕</span>} />
        <InputWithIcon label="Label" defaultValue="Input" iconLeft={<span>⌕</span>} iconRight={<span>×</span>} />
        <InputWithIcon label="Label" defaultValue="Input" iconRight={<span>★</span>} disabled />
        <InputWithIcon label="Label" defaultValue="Input" iconRight={<span>★</span>} error="Ungültige Eingabe" />
      </div>

      {/* ============ Textarea ============ */}
      <h2>Textarea</h2>
      <p className="component-intro">
        Multi-line text input.
        <code>{`import { Textarea } from 'bhb-components';`}</code>
      </p>
      <div className="form-grid">
        <Textarea label="Label" defaultValue="Mehrzeilige Eingabe…" />
        <Textarea label="Label" placeholder="Mehrzeilige Eingabe…" />
        <Textarea label="Label" defaultValue="Mehrzeilige Eingabe…" disabled />
        <Textarea label="Label" defaultValue="Mehrzeilige Eingabe…" error="Zu lang" />
      </div>

      {/* ============ Select ============ */}
      <h2>Select</h2>
      <p className="component-intro">
        Native dropdown with custom chevron.
        <code>{`import { Select } from 'bhb-components';`}</code>
      </p>
      <div className="form-grid">
        <Select
          label="Label"
          placeholder="Bitte wählen"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ]}
        />
        <Select
          label="Label"
          defaultValue="a"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
          ]}
        />
        <Select
          label="Label"
          disabled
          options={[{ value: 'a', label: 'Option A' }]}
          defaultValue="a"
        />
        <Select
          label="Label"
          error="Auswahl erforderlich"
          placeholder="Bitte wählen"
          options={[{ value: 'a', label: 'Option A' }]}
        />
      </div>

      {/* ============ DatePicker ============ */}
      <h2>DatePicker</h2>
      <p className="component-intro">
        Date input with German format placeholder (TT.MM.JJJJ) and calendar icon. v1 is a
        text input — full calendar popover is a future iteration.
        <code>{`import { DatePicker } from 'bhb-components';`}</code>
      </p>
      <div className="form-grid">
        <DatePicker label="Label" defaultValue="06.06.2026" />
        <DatePicker label="Label" />
        <DatePicker label="Label" defaultValue="06.06.2026" disabled />
        <DatePicker label="Label" defaultValue="32.13.2026" error="Ungültiges Datum" />
      </div>

      {/* ============ Checkbox ============ */}
      <h2>Checkbox</h2>
      <p className="component-intro">
        Checkbox with optional inline label.
        <code>{`import { Checkbox } from 'bhb-components';`}</code>
      </p>
      <div className="showcase-row">
        <Checkbox label="Label" />
        <Checkbox label="Label" defaultChecked />
        <Checkbox label="Label" disabled />
        <Checkbox label="Label" disabled defaultChecked />
      </div>

      {/* ============ Sidebar ============ */}
      <h2>Sidebar</h2>
      <p className="component-intro">
        Primary vertical navigation. Sectioned items with icons, user header on top, footer
        links pinned to the bottom.
        <code>{`import { Sidebar } from 'bhb-components';`}</code>
      </p>
      <div className="sidebar-preview">
        <Sidebar
          logo={<Logo width={80} />}
          userName="Peter Berg"
          organization="Beispiel GmbH"
          onSettingsClick={() => {}}
          sections={[
            {
              items: [
                { id: 'home', label: 'Startseite', icon: <HomeIcon />, active: true },
              ],
            },
            {
              title: 'Dokumente',
              items: [
                { id: 'belege', label: 'Belegverwaltung', icon: <FileInvoiceIcon /> },
                { id: 'rechnung', label: 'Rechnungsstellung', icon: <FilePlusIcon /> },
              ],
            },
            {
              title: 'Buchen',
              items: [
                { id: 'zahlungen', label: 'Zahlungen', icon: <ExchangeIcon /> },
                { id: 'belege2', label: 'Belege', icon: <FileInvoiceIcon /> },
                { id: 'erweitert', label: 'Erweitert', icon: <ColumnsIcon /> },
              ],
            },
            {
              title: 'Anlagegüter',
              items: [
                { id: 'anlagen', label: 'Anlagenverwaltung', icon: <IndustryIcon /> },
              ],
            },
            {
              title: 'Auswertungen',
              items: [
                { id: 'abschluss', label: 'Abschluss', icon: <ClipboardListIcon /> },
                { id: 'controlling', label: 'Controlling', icon: <AnalyticsIcon /> },
              ],
            },
          ]}
          footerItems={[
            { id: 'notif', label: 'Benachrichtigungen', icon: <BellIcon /> },
            { id: 'help', label: 'Hilfe & Kontakt', icon: <QuestionCircleIcon /> },
          ]}
        />
      </div>

      {/* ============ Footer ============ */}
      <h2>Footer</h2>
      <p className="component-intro">
        Thin horizontal app footer with inline links + copyright.
        <code>{`import { Footer } from 'bhb-components';`}</code>
      </p>
      <div className="footer-preview">
        <Footer
          links={[
            { label: 'Impressum', href: '#' },
            { label: 'Datenschutz', href: '#' },
            { label: 'AGB', href: '#' },
            { label: 'Kontakt', href: '#' },
            { label: 'Hilfe', href: '#' },
            { label: 'Ideen & Roadmap', href: '#' },
          ]}
          copyright="© 2026 BuchhaltungsButler"
        />
      </div>

      {/* ============ RadioButton ============ */}
      <h2>RadioButton</h2>
      <p className="component-intro">
        Radio with optional inline label. Use the native <code>name</code> attribute to
        group radios.
        <code>{`import { RadioButton } from 'bhb-components';`}</code>
      </p>
      <div className="showcase-row">
        <RadioButton
          name="demo"
          value="a"
          label="Option A"
          checked={radio === 'a'}
          onChange={() => setRadio('a')}
        />
        <RadioButton
          name="demo"
          value="b"
          label="Option B"
          checked={radio === 'b'}
          onChange={() => setRadio('b')}
        />
        <RadioButton name="demo-disabled" label="Disabled" disabled />
        <RadioButton name="demo-disabled" label="Disabled" disabled defaultChecked />
      </div>
    </>
  );
}

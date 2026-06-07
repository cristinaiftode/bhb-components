import { useState } from 'react';
import {
  AnalyticsIcon,
  BellIcon,
  Button,
  CheckIcon,
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
  LandmarkIcon,
  Layout,
  LightbulbIcon,
  ListIcon,
  LockIcon,
  Logo,
  Message,
  MoneyBillWaveIcon,
  MultiSelection,
  QuestionCircleIcon,
  RadioButton,
  RedoIcon,
  Select,
  Sidebar,
  Textarea,
  Tooltip,
  TrashIcon,
  TruckIcon,
  type ButtonSize,
  type ButtonVariant,
} from '../components';

const demoSections = [
  { items: [{ id: 'home', label: 'Startseite', icon: <HomeIcon />, active: true }] },
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
    items: [{ id: 'anlagen', label: 'Anlagenverwaltung', icon: <IndustryIcon /> }],
  },
  {
    title: 'Auswertungen',
    items: [
      { id: 'abschluss', label: 'Abschluss', icon: <ClipboardListIcon /> },
      { id: 'controlling', label: 'Controlling', icon: <AnalyticsIcon /> },
    ],
  },
];

const demoFooterItems = [
  { id: 'notif', label: 'Benachrichtigungen', icon: <BellIcon /> },
  { id: 'help', label: 'Hilfe & Kontakt', icon: <QuestionCircleIcon /> },
];

const demoFooterLinks = [
  { label: 'Impressum', href: '#' },
  { label: 'Datenschutz', href: '#' },
  { label: 'AGB', href: '#' },
  { label: 'Kontakt', href: '#' },
  { label: 'Hilfe', href: '#' },
  { label: 'Ideen & Roadmap', href: '#' },
];

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const sizes: ButtonSize[] = ['large', 'medium', 'small'];

type Beleg = { id: string; label: string; amount: string; confirmed: boolean };

const initialBelege: Beleg[] = [
  { id: 'B-001', label: 'Miete & Nebenkosten',     amount: '51.890 €', confirmed: false },
  { id: 'B-002', label: 'Bürobedarf',              amount: '128,40 €', confirmed: false },
  { id: 'B-003', label: 'Reisekosten Berlin',      amount: '742,15 €', confirmed: false },
  { id: 'B-004', label: 'Software-Abonnement',     amount: '49,00 €',  confirmed: false },
  { id: 'B-005', label: 'Strom (Q3)',              amount: '1.402,55 €', confirmed: false },
];

export function ComponentsPage() {
  const [radio, setRadio] = useState('a');

  // MultiSelection interactive demo state
  const [belege, setBelege] = useState<Beleg[]>(initialBelege);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleBeleg = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  const confirmSelected = () => {
    setBelege(prev =>
      prev.map(b => (selected.has(b.id) ? { ...b, confirmed: true } : b)),
    );
    clearSelection();
  };

  const deleteSelected = () => {
    setBelege(prev => prev.filter(b => !selected.has(b.id)));
    clearSelection();
  };

  const resetDemo = () => {
    setBelege(initialBelege);
    clearSelection();
  };

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
        Checkbox with optional inline label. Matches Figma 32:1477 — 5 states × isChecked.
        Hover/Focus rows are forced visually for showcase; the real component shows them on
        mouse hover or keyboard focus.
        <code>{`import { Checkbox } from 'bhb-components';`}</code>
      </p>
      <div className="state-grid">
        <div className="state-grid__head">Default</div>
        <div className="state-grid__head">Hover</div>
        <div className="state-grid__head">Focus</div>
        <div className="state-grid__head">Disabled</div>
        <div className="state-grid__head">Readonly</div>

        <div className="state-grid__cell"><Checkbox label="Label" /></div>
        <div className="state-grid__cell demo-hover"><Checkbox label="Label" /></div>
        <div className="state-grid__cell demo-focus"><Checkbox label="Label" /></div>
        <div className="state-grid__cell"><Checkbox label="Label" disabled /></div>
        <div className="state-grid__cell"><Checkbox label="Label" readOnly /></div>

        <div className="state-grid__cell"><Checkbox label="Label" defaultChecked /></div>
        <div className="state-grid__cell demo-hover"><Checkbox label="Label" defaultChecked /></div>
        <div className="state-grid__cell demo-focus"><Checkbox label="Label" defaultChecked /></div>
        <div className="state-grid__cell"><Checkbox label="Label" disabled defaultChecked /></div>
        <div className="state-grid__cell"><Checkbox label="Label" readOnly defaultChecked /></div>
      </div>

      {/* ============ MultiSelection ============ */}
      <h2>MultiSelection</h2>
      <p className="component-intro">
        Batch-action toolbar shown when N items are selected. Tick rows below to see the
        toolbar appear — <strong>Bestätigen</strong> marks them confirmed,{' '}
        <strong>Löschen</strong> removes them.
        <code>{`import { MultiSelection } from 'bhb-components';`}</code>
      </p>

      <div className="mselect-demo">
        <div className="mselect-demo__toolbar">
          {selected.size > 0 ? (
            <MultiSelection
              count={selected.size}
              itemLabel={selected.size === 1 ? 'ausgewählter Beleg' : 'ausgewählte Belege'}
              actions={[
                { id: 'confirm',  label: 'Bestätigen',    icon: <CheckIcon />,         active: true, onClick: confirmSelected },
                { id: 'redo',     label: 'Bestätigen',    icon: <RedoIcon />,          onClick: clearSelection },
                { id: 'lock',     label: 'Festschreiben', icon: <LockIcon />,          onClick: () => {} },
                { id: 'refresh',  label: 'Aktualisieren', icon: <LightbulbIcon />,     onClick: () => {} },
                { id: 'assign',   label: 'Zuweisen',      icon: <TruckIcon />,         onClick: () => {} },
                { id: 'account',  label: 'Kontieren',     icon: <ListIcon />,          onClick: () => {} },
                { id: 'allocate', label: 'Zuordnen',      icon: <LandmarkIcon />,      onClick: () => {} },
                { id: 'transfer', label: 'Überweisen',    icon: <MoneyBillWaveIcon />, onClick: () => {} },
                { id: 'delete',   label: 'Löschen',       icon: <TrashIcon />,         onClick: deleteSelected },
              ]}
            />
          ) : (
            <div className="mselect-demo__hint">
              Wählen Sie einen oder mehrere Belege aus, um die Aktionsleiste zu sehen.
            </div>
          )}
        </div>

        <ul className="mselect-demo__list">
          {belege.map(b => (
            <li key={b.id} className="mselect-demo__row">
              <Checkbox
                checked={selected.has(b.id)}
                onChange={() => toggleBeleg(b.id)}
                label={
                  <span className="mselect-demo__row-label">
                    <span className="mselect-demo__row-id">{b.id}</span>
                    <span>{b.label}</span>
                  </span>
                }
              />
              <span className="mselect-demo__row-amount">{b.amount}</span>
              {b.confirmed && (
                <span className="mselect-demo__row-status">
                  <CheckIcon size={14} /> Bestätigt
                </span>
              )}
            </li>
          ))}
          {belege.length === 0 && (
            <li className="mselect-demo__empty">
              Alle Belege gelöscht.{' '}
              <button type="button" onClick={resetDemo} className="mselect-demo__reset">
                Demo zurücksetzen
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* ============ Tooltip ============ */}
      <h2>Tooltip</h2>
      <p className="component-intro">
        Interactive tooltip wrapping a trigger. Hover or tab to a Button below to see it.
        <code>{`import { Tooltip } from 'bhb-components';`}</code>
      </p>
      <div className="tooltip-playground">
        <Tooltip
          content={<><strong>Miete &amp; Nebenkosten</strong><br/>51.890&nbsp;€</>}
          placement="top"
        >
          <Button variant="secondary">Top</Button>
        </Tooltip>
        <Tooltip
          content={<><strong>Miete &amp; Nebenkosten</strong><br/>51.890&nbsp;€</>}
          placement="bottom"
        >
          <Button variant="secondary">Bottom</Button>
        </Tooltip>
        <Tooltip
          content={<><strong>Miete &amp; Nebenkosten</strong><br/>51.890&nbsp;€</>}
          placement="left"
        >
          <Button variant="secondary">Left</Button>
        </Tooltip>
        <Tooltip
          content={<><strong>Miete &amp; Nebenkosten</strong><br/>51.890&nbsp;€</>}
          placement="right"
        >
          <Button variant="secondary">Right</Button>
        </Tooltip>
      </div>
      <p className="showcase-hint">
        Tooltips are keyboard-accessible — press <code>Tab</code> to focus a button and the
        tooltip appears. <code>Esc</code> dismisses it.
      </p>

      {/* ============ Message ============ */}
      <h2>Message</h2>
      <p className="component-intro">
        Alert / banner. 3 positions × 7 types. Stack is the default; pass{' '}
        <code>onClose</code> to render a × button.
        <code>{`import { Message } from 'bhb-components';`}</code>
      </p>

      <h3 className="showcase-h3">Position = content (inline state flag)</h3>
      <div className="message-stack">
        <Message type="success" position="content">Success Message Content</Message>
        <Message type="info" position="content">Info Message Content</Message>
        <Message type="warning" position="content">Warning Message Content</Message>
        <Message type="error" position="content">Error Message Content</Message>
      </div>

      <h3 className="showcase-h3">Position = stack (banner + close)</h3>
      <div className="message-stack">
        <Message type="success" onClose={() => {}}>Success Message Content</Message>
        <Message type="info" onClose={() => {}}>Info Message Content</Message>
        <Message type="warning" onClose={() => {}}>Warning Message Content</Message>
        <Message type="error" onClose={() => {}}>Error Message Content</Message>
      </div>

      <h3 className="showcase-h3">Position = inline (no icon, no close)</h3>
      <div className="message-stack">
        <Message type="success" position="inline">Success Message Inline</Message>
        <Message type="info" position="inline">Info Message Inline</Message>
        <Message type="warning" position="inline">Warning Message Inline</Message>
        <Message type="warning-light" position="inline">Warning Light Message Inline</Message>
        <Message type="error" position="inline">Error Message Inline</Message>
        <Message type="brand" position="inline">Brand Message Inline</Message>
        <Message type="inactive" position="inline">Inactive Message Inline</Message>
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
          sections={demoSections}
          footerItems={demoFooterItems}
        />
      </div>

      {/* ============ Footer ============ */}
      <h2>Footer</h2>
      <p className="component-intro">
        Thin 18px horizontal app footer with inline links + copyright on a transparent
        background. Designed to sit at the bottom of the main content area.
        <code>{`import { Footer } from 'bhb-components';`}</code>
      </p>
      <div className="footer-preview">
        <Footer links={demoFooterLinks} copyright="© 2026 BuchhaltungsButler" />
      </div>

      {/* ============ Layout (full app shell) ============ */}
      <h2>Layout</h2>
      <p className="component-intro">
        App shell composing Sidebar + main content + Footer. Matches Figma node 17:113.
        Sidebar fills the left height; main content scrolls; Footer pins to the bottom.
        <code>{`import { Layout } from 'bhb-components';`}</code>
      </p>
      <div className="layout-preview">
        <Layout
          sidebar={
            <Sidebar
              logo={<Logo width={80} />}
              userName="Peter Berg"
              organization="Beispiel GmbH"
              onSettingsClick={() => {}}
              sections={demoSections}
              footerItems={demoFooterItems}
            />
          }
          footer={<Footer links={demoFooterLinks} copyright="© 2026 BuchhaltungsButler" />}
        >
          <h1 className="bhb-text-bold-xxl" style={{ margin: '0 0 0.5rem' }}>Startseite</h1>
          <p className="bhb-text-m" style={{ margin: '0 0 1.5rem', color: 'var(--jeans-grey)' }}>
            Willkommen zurück, Peter. Hier ist Ihre Übersicht für heute.
          </p>
          <div className="layout-preview__placeholder">
            <span className="bhb-text-caps-bold-s">Inhaltsbereich</span>
          </div>
        </Layout>
      </div>

      {/* ============ RadioButton ============ */}
      <h2>RadioButton</h2>
      <p className="component-intro">
        Radio with optional inline label. Matches Figma 32:1500 — 5 states × isChecked.
        Group radios via the native <code>name</code> attribute. Hover/Focus rows are
        forced for showcase parity.
        <code>{`import { RadioButton } from 'bhb-components';`}</code>
      </p>
      <div className="state-grid">
        <div className="state-grid__head">Default</div>
        <div className="state-grid__head">Hover</div>
        <div className="state-grid__head">Focus</div>
        <div className="state-grid__head">Disabled</div>
        <div className="state-grid__head">Readonly</div>

        <div className="state-grid__cell"><RadioButton name="r-row1-default" label="Label" /></div>
        <div className="state-grid__cell demo-hover"><RadioButton name="r-row1-hover" label="Label" /></div>
        <div className="state-grid__cell demo-focus"><RadioButton name="r-row1-focus" label="Label" /></div>
        <div className="state-grid__cell"><RadioButton name="r-row1-disabled" label="Label" disabled /></div>
        <div className="state-grid__cell"><RadioButton name="r-row1-readonly" label="Label" readOnly /></div>

        <div className="state-grid__cell"><RadioButton name="r-row2-default" label="Label" defaultChecked /></div>
        <div className="state-grid__cell demo-hover"><RadioButton name="r-row2-hover" label="Label" defaultChecked /></div>
        <div className="state-grid__cell demo-focus"><RadioButton name="r-row2-focus" label="Label" defaultChecked /></div>
        <div className="state-grid__cell"><RadioButton name="r-row2-disabled" label="Label" disabled defaultChecked /></div>
        <div className="state-grid__cell"><RadioButton name="r-row2-readonly" label="Label" readOnly defaultChecked /></div>
      </div>

      <h3 className="showcase-h3">Live group (try clicking)</h3>
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
        <RadioButton
          name="demo"
          value="c"
          label="Option C"
          checked={radio === 'c'}
          onChange={() => setRadio('c')}
        />
      </div>
    </>
  );
}

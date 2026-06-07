import { useMemo, useState } from 'react';
import {
  ArrowLeftIcon,
  BellIcon,
  BuildingIcon,
  Button,
  CalendarIcon,
  CaretDownIcon,
  CheckIcon,
  Checkbox,
  ClipboardListIcon,
  ColumnsIcon,
  ContextMenu,
  ExchangeIcon,
  FileImportIcon,
  FileInvoiceIcon,
  FilePlusIcon,
  HomeIcon,
  IndustryIcon,
  Input,
  LandmarkIcon,
  Layout,
  LightbulbIcon,
  ListIcon,
  LockIcon,
  Logo,
  MoneyBillWaveIcon,
  MultiSelection,
  QuestionCircleIcon,
  RedoIcon,
  Select,
  SettingsMenu,
  Sidebar,
  SignInIcon,
  SyncIcon,
  Tag,
  TimesIcon,
  TrashIcon,
  TruckIcon,
  UserCircleIcon,
  UsersCogIcon,
  type SidebarSection,
  type SettingsMenuSection,
} from '../../components';
import './EingangsbelegePage.css';

/* ---------- Sidebar data ---------- */

const SIDEBAR_SECTIONS: SidebarSection[] = [
  { items: [{ id: 'home', label: 'Startseite', icon: <HomeIcon /> }] },
  {
    items: [{ id: 'docs', label: 'Dokumente', icon: <FileInvoiceIcon /> }],
  },
  {
    title: 'Buchen',
    items: [
      { id: 'zahlungen', label: 'Zahlungen', icon: <ExchangeIcon /> },
      { id: 'belege', label: 'Belege', icon: <FileInvoiceIcon />, active: true },
      { id: 'erweitert', label: 'Erweitert', icon: <ColumnsIcon /> },
    ],
  },
  {
    items: [{ id: 'anlagen', label: 'Anlagenverwaltung', icon: <IndustryIcon /> }],
  },
  {
    items: [{ id: 'abschluss', label: 'Abschluss', icon: <ClipboardListIcon /> }],
  },
];

const SIDEBAR_FOOTER = [
  { id: 'help', label: 'Hilfe & Kontakt', icon: <QuestionCircleIcon /> },
];

const COMPANY_MENU: SettingsMenuSection[] = [
  {
    title: 'Unternehmen wechseln',
    items: [
      { id: 'bhb', label: 'Beispiel GmbH', selected: true },
      { id: 'jon', label: 'Jon Doe GmbH' },
    ],
  },
  {
    title: 'Unternehmen verwalten',
    items: [
      { id: 'data', label: 'Unternehmensdaten', icon: <BuildingIcon /> },
      { id: 'set', label: 'Einstellungen', icon: <UsersCogIcon /> },
      { id: 'users', label: 'Nutzerverwaltung', icon: <FilePlusIcon /> },
      { id: 'imp', label: 'Datenimport', icon: <FileImportIcon /> },
    ],
  },
  {
    title: 'Mein Nutzerkonto',
    items: [
      { id: 'me', label: 'Meine Daten', icon: <UserCircleIcon /> },
      { id: 'out', label: 'Abmelden', icon: <SignInIcon /> },
    ],
  },
];

/* ---------- Belege data ---------- */

type Beleg = {
  id: string;
  vendor: string;
  date: string;
  amount: string;
  description: string;
};

const INITIAL_BELEGE: Beleg[] = [
  {
    id: 'b1',
    vendor: 'Rewe',
    date: '07.11.2023',
    amount: '249,00 €',
    description: 'Bitte buchen Sie über die automatisch erstellte Zahlung.',
  },
  {
    id: 'b2',
    vendor: 'Edeka',
    date: '07.11.2023',
    amount: '129,68 €',
    description: 'Bitte buchen Sie über die automatisch erstellte Zahlung.',
  },
  {
    id: 'b3',
    vendor: 'Vollcorner',
    date: '07.11.2023',
    amount: '238,00 €',
    description: 'Bitte buchen Sie über die automatisch erstellte Zahlung.',
  },
];

const VIEW_OPTIONS = [
  { value: 'eingangsbelege', label: 'Eingangsbelege' },
  { value: 'ausgangsbelege', label: 'Ausgangsbelege' },
  { value: 'eigenbelege', label: 'Eigenbelege' },
];

/* ---------- Tiny showcase-only fragments ---------- */

/** Up/down caret stack used in column headers to signal sortability. */
const SortCarets = () => (
  <span className="eingangsbelege__sort" aria-hidden="true">
    <span className="eingangsbelege__sort-up">▲</span>
    <span className="eingangsbelege__sort-down">▼</span>
  </span>
);

/** Document preview thumbnail — represents the scanned receipt image. */
const DocPreview = () => (
  <div className="eingangsbelege__thumb" aria-hidden="true">
    <div className="eingangsbelege__thumb-line eingangsbelege__thumb-line--head" />
    <div className="eingangsbelege__thumb-line" />
    <div className="eingangsbelege__thumb-line" />
    <div className="eingangsbelege__thumb-line" />
    <div className="eingangsbelege__thumb-line eingangsbelege__thumb-line--short" />
  </div>
);

/** Notification icon button (top-right of sidebar header, w/ unread dot). */
const NotificationButton = () => (
  <button type="button" className="eingangsbelege-notif" aria-label="Benachrichtigungen">
    <BellIcon size={18} />
    <span className="eingangsbelege-notif__dot" aria-hidden="true" />
  </button>
);

/* ---------- Main page ---------- */

export interface EingangsbelegePageProps {
  onBack?: () => void;
}

export function EingangsbelegePage({ onBack }: EingangsbelegePageProps) {
  const [view, setView] = useState('eingangsbelege');
  const [query, setQuery] = useState('');
  const [unbezahlt, setUnbezahlt] = useState(false);
  const [ungebucht, setUngebucht] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(['b2', 'b3']));

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const clearFilters = () => {
    setUnbezahlt(false);
    setUngebucht(false);
    setQuery('');
  };

  const selectedCount = selected.size;

  // Sidebar with global account menu + a notification bell in the header
  // top-right (via the new `headerExtra` slot).
  const sidebar = useMemo(
    () => (
      <Sidebar
        logo={<Logo width={80} />}
        userName="Peter Berg"
        organization="Beispiel GmbH"
        companyMenu={COMPANY_MENU}
        headerExtra={<NotificationButton />}
        sections={SIDEBAR_SECTIONS}
        footerItems={SIDEBAR_FOOTER}
      />
    ),
    [],
  );

  return (
    <Layout sidebar={sidebar} flush>
      <div className="eingangsbelege">
        {/* -------------------- Top toolbar -------------------- */}
        <header className="eingangsbelege__toolbar">
          <div className="eingangsbelege__toolbar-left">
            <button
              type="button"
              className="eingangsbelege__back"
              onClick={onBack}
              aria-label="Zurück"
            >
              <ArrowLeftIcon size={20} />
            </button>
            <div className="eingangsbelege__view-select">
              <Select
                value={view}
                onChange={(e) => setView(e.target.value)}
                options={VIEW_OPTIONS}
              />
            </div>
          </div>
          <div className="eingangsbelege__toolbar-right">
            <div className="eingangsbelege__search">
              <Input
                placeholder="Volltextsuche"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button variant="secondary">Hochladen</Button>
            <ContextMenu
              triggerOnClick
              items={[
                { id: 'export', label: 'Liste exportieren', icon: <FileImportIcon /> },
                { id: 'columns', label: 'Spalten anpassen', icon: <ColumnsIcon /> },
                { id: 'archive', label: 'Archiv anzeigen', icon: <ListIcon /> },
              ]}
            >
              <button
                type="button"
                className="eingangsbelege__more-btn"
                aria-label="Weitere Aktionen"
              >
                <span aria-hidden="true">⋯</span>
              </button>
            </ContextMenu>
          </div>
        </header>

        {/* -------------------- Filter row -------------------- */}
        <div className="eingangsbelege__filters">
          <div className="eingangsbelege__filter-left">
            <span className="eingangsbelege__filter-label">Konto:</span>
            <button type="button" className="eingangsbelege__filter-link">
              <span>Alle Konten</span>
              <CaretDownIcon size={16} />
            </button>
          </div>
          <div className="eingangsbelege__filter-right">
            <Checkbox
              label="Unbezahlt"
              checked={unbezahlt}
              onChange={(e) => setUnbezahlt(e.target.checked)}
            />
            <Checkbox
              label="Ungebucht"
              checked={ungebucht}
              onChange={(e) => setUngebucht(e.target.checked)}
            />
            <button type="button" className="eingangsbelege__filter-link">
              <span>Filter auswählen</span>
              <CaretDownIcon size={16} />
            </button>
            <button
              type="button"
              className="eingangsbelege__filter-icon"
              onClick={clearFilters}
              aria-label="Filter zurücksetzen"
            >
              <TimesIcon size={16} />
            </button>
            <span className="eingangsbelege__filter-divider" aria-hidden="true" />
            <button
              type="button"
              className="eingangsbelege__filter-icon"
              aria-label="Aktualisieren"
            >
              <SyncIcon size={16} />
            </button>
          </div>
        </div>

        {/* -------------------- Column headers -------------------- */}
        <div className="eingangsbelege__cols">
          <button type="button" className="eingangsbelege__col">
            <span>Datum</span>
            <SortCarets />
          </button>
          <button type="button" className="eingangsbelege__col">
            <span>Gegenpartei</span>
            <SortCarets />
          </button>
          <button type="button" className="eingangsbelege__col eingangsbelege__col--amount">
            <span>Betrag</span>
            <SortCarets />
          </button>
        </div>

        {/* -------------------- Rows -------------------- */}
        <ul className="eingangsbelege__rows">
          {INITIAL_BELEGE.map((b) => (
            <li key={b.id} className="eingangsbelege__row">
              <div className="eingangsbelege__row-main">
                <div className="eingangsbelege__row-check">
                  <Checkbox
                    checked={selected.has(b.id)}
                    onChange={() => toggle(b.id)}
                    aria-label={`${b.vendor} auswählen`}
                  />
                </div>
                <DocPreview />
                <div className="eingangsbelege__row-info">
                  <div className="eingangsbelege__row-vendor">{b.vendor}</div>
                  <div className="eingangsbelege__row-date">
                    <CalendarIcon size={12} aria-hidden="true" />
                    <span>{b.date}</span>
                  </div>
                  <div className="eingangsbelege__row-tag">
                    <Tag type="success">Bezahlt</Tag>
                  </div>
                </div>
                <div className="eingangsbelege__row-amount">{b.amount}</div>
                <div className="eingangsbelege__row-sep" aria-hidden="true" />
                <div className="eingangsbelege__row-desc">{b.description}</div>
              </div>
              <div className="eingangsbelege__row-aside">
                <div className="eingangsbelege__row-status" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>

        {/* -------------------- MultiSelection toolbar -------------------- */}
        {selectedCount > 0 && (
          <div className="eingangsbelege__multibar">
            <MultiSelection
              count={selectedCount}
              itemLabel="ausgewählt"
              actions={[
                { id: 'confirm', label: 'Bestätigen', icon: <CheckIcon />, tone: 'primary' },
                { id: 'undo', label: 'Aufheben', icon: <RedoIcon /> },
                { id: 'lock', label: 'Festschreiben', icon: <LockIcon /> },
                { id: 'refresh', label: 'Aktualisieren', icon: <LightbulbIcon /> },
                { id: 'assign', label: 'Zuweisen', icon: <TruckIcon /> },
                { id: 'book', label: 'Kontieren', icon: <ListIcon /> },
                { id: 'map', label: 'Zuordnen', icon: <LandmarkIcon /> },
              ]}
            />
            <SettingsMenu
              placement="top"
              align="end"
              width={181}
              className="eingangsbelege__overflow-menu"
              sections={[
                {
                  items: [
                    { id: 'delete', label: 'Löschen', icon: <TrashIcon size={14} /> },
                    { id: 'transfer', label: 'Überweisen', icon: <MoneyBillWaveIcon size={18} /> },
                  ],
                },
              ]}
            >
              <button
                type="button"
                className="eingangsbelege__multibar-more"
                aria-label="Weitere Sammelaktionen"
              >
                <span aria-hidden="true">⋯</span>
              </button>
            </SettingsMenu>
          </div>
        )}
      </div>
    </Layout>
  );
}

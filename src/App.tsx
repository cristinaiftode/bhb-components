import { useState } from 'react';
import { TokensPage } from './TokensPage';
import { ComponentsPage } from './ComponentsPage';
import { EingangsbelegePage } from './pages/EingangsbelegePage';

type Tab = 'tokens' | 'components' | 'pages';

function App() {
  const [tab, setTab] = useState<Tab>('components');

  // The Pages tab renders a full-bleed app shell — no max-width <main> wrapper.
  if (tab === 'pages') {
    return (
      <div className="page-shell">
        <button
          type="button"
          className="page-shell__back"
          onClick={() => setTab('components')}
          aria-label="Zurück zur Showcase"
        >
          ← Showcase
        </button>
        <EingangsbelegePage onBack={() => setTab('components')} />
      </div>
    );
  }

  return (
    <main>
      <h1>BHB Components</h1>
      <p className="lead">
        BuchhaltungsButler design system for prototyping in Claude Code.
      </p>

      <nav className="tabs" role="tablist" aria-label="Showcase sections">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'components'}
          className={`tabs__tab ${tab === 'components' ? 'tabs__tab--active' : ''}`}
          onClick={() => setTab('components')}
        >
          Components
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'tokens'}
          className={`tabs__tab ${tab === 'tokens' ? 'tabs__tab--active' : ''}`}
          onClick={() => setTab('tokens')}
        >
          Tokens
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={false}
          className="tabs__tab"
          onClick={() => setTab('pages')}
        >
          Pages
        </button>
      </nav>

      <div role="tabpanel">
        {tab === 'components' ? <ComponentsPage /> : <TokensPage />}
      </div>
    </main>
  );
}

export default App;

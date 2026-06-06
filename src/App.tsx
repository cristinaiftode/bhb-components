import { useState } from 'react';
import { TokensPage } from './TokensPage';
import { ComponentsPage } from './ComponentsPage';

type Tab = 'tokens' | 'components';

function App() {
  const [tab, setTab] = useState<Tab>('components');

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
      </nav>

      <div role="tabpanel">
        {tab === 'components' ? <ComponentsPage /> : <TokensPage />}
      </div>
    </main>
  );
}

export default App;

'use client';

import { useId, useState } from 'react';
import type { Spec } from '@/lib/types';

const TABS = ['Description', 'Specifications', 'Shipping'] as const;
type Tab = (typeof TABS)[number];

/**
 * Follows the ARIA tabs pattern: roving tabindex, arrow-key navigation and
 * proper tab/tabpanel wiring. The old site had a tab-like UI with none of it.
 */
export default function ProductTabs({
  description,
  specs,
}: {
  description: string;
  specs: Spec[];
}) {
  const [active, setActive] = useState<Tab>('Description');
  const baseId = useId();

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = TABS.indexOf(active);
    if (e.key === 'ArrowRight') setActive(TABS[(i + 1) % TABS.length]);
    if (e.key === 'ArrowLeft') setActive(TABS[(i - 1 + TABS.length) % TABS.length]);
  };

  return (
    <section className="mt-16">
      <div
        role="tablist"
        aria-label="Product information"
        onKeyDown={onKeyDown}
        className="flex gap-1 border-b border-hairline"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            id={`${baseId}-tab-${tab}`}
            aria-selected={active === tab}
            aria-controls={`${baseId}-panel-${tab}`}
            tabIndex={active === tab ? 0 : -1}
            onClick={() => setActive(tab)}
            className={`-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${
              active === tab
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="py-8"
      >
        {active === 'Description' && (
          <p className="max-w-3xl leading-relaxed text-ink-muted">
            {description}
          </p>
        )}

        {active === 'Specifications' && (
          <dl className="max-w-2xl divide-y divide-hairline">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between gap-6 py-3 text-sm"
              >
                <dt className="text-ink-muted">{spec.label}</dt>
                <dd className="font-semibold text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {active === 'Shipping' && (
          <ul className="max-w-2xl space-y-3 text-sm text-ink-muted">
            <li>
              <strong className="text-ink">Free standard shipping</strong> on
              orders over $50. Below that, a flat $4.95.
            </li>
            <li>
              <strong className="text-ink">Delivery in 2–4 working days</strong>{' '}
              once dispatched. Orders placed before 2pm ship the same day.
            </li>
            <li>
              <strong className="text-ink">30-day returns</strong> on unopened
              items. Prescription diets can only be returned unopened.
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}

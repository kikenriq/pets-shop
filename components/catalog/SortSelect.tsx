'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SORT_OPTIONS } from '@/lib/types';

export default function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();

  const onChange = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === 'featured') next.delete('sort');
    else next.set('sort', value);
    next.delete('page');
    const qs = next.toString();
    router.push(qs ? `/products?${qs}` : '/products', { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-ink-muted">
        Sort
      </label>
      <select
        id="sort"
        value={params.get('sort') ?? 'featured'}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-hairline bg-white px-3 py-2 text-sm font-semibold text-ink"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

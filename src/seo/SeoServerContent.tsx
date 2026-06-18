/** Server-rendered tables and summaries for crawlers without JavaScript. */

function asRows(data: unknown): Record<string, unknown>[] {
  if (!Array.isArray(data)) return [];
  return data.filter((r) => r && typeof r === 'object') as Record<string, unknown>[];
}

function cell(v: unknown) {
  if (v == null || v === '') return '—';
  if (typeof v === 'number' && Number.isFinite(v)) return String(Math.round(v * 100) / 100);
  return String(v);
}

function SimpleTable({
  caption,
  columns,
  rows
}: {
  caption: string;
  columns: Array<{ key: string; label: string }>;
  rows: Record<string, unknown>[];
}) {
  if (!rows.length) return null;
  const limited = rows.slice(0, 120);
  return (
    <table className="seo-server-table w-full border-collapse text-left text-sm">
      <caption className="mb-2 text-base font-semibold">{caption}</caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} className="border border-slate-300 px-2 py-1 font-semibold">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {limited.map((row, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={c.key} className="border border-slate-300 px-2 py-1">
                {cell(row[c.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ReturnsValsTable({ vals }: { vals: Record<string, Record<string, number | undefined>> }) {
  const tickers = Object.keys(vals || {}).slice(0, 80);
  if (!tickers.length) return null;
  const horizons = new Set<string>();
  for (const t of tickers) {
    Object.keys(vals[t] || {}).forEach((h) => horizons.add(h));
  }
  const cols = Array.from(horizons).slice(0, 12);
  const rows = tickers.map((ticker) => {
    const row: Record<string, unknown> = { ticker };
    for (const h of cols) row[h] = vals[ticker]?.[h];
    return row;
  });
  return (
    <SimpleTable
      caption="Period returns (%)"
      columns={[{ key: 'ticker', label: 'Ticker' }, ...cols.map((h) => ({ key: h, label: h }))]}
      rows={rows}
    />
  );
}

function TickerDetailsTable({ rows, caption }: { rows: unknown[]; caption: string }) {
  const list = asRows(rows);
  if (!list.length) return null;
  const columns = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'name', label: 'Name' },
    { key: 'sector', label: 'Sector' },
    { key: 'return_pct', label: 'Return %' },
    { key: 'market_cap', label: 'Market cap' }
  ];
  const normalized = list.map((r) => ({
    symbol: r.symbol ?? r.ticker ?? r.Symbol,
    name: r.name ?? r.company_name ?? r.companyName,
    sector: r.sector ?? r.industry,
    return_pct: r.return_pct ?? r.returnPct ?? r.change_pct ?? r.changePercent,
    market_cap: r.market_cap ?? r.marketCap
  }));
  return <SimpleTable caption={caption} columns={columns} rows={normalized} />;
}

function OhlcTable({ rows, caption }: { rows: unknown[]; caption: string }) {
  const list = asRows(rows);
  if (!list.length) return null;
  return (
    <SimpleTable
      caption={caption}
      columns={[
        { key: 'date', label: 'Date' },
        { key: 'open', label: 'Open' },
        { key: 'high', label: 'High' },
        { key: 'low', label: 'Low' },
        { key: 'close', label: 'Close' },
        { key: 'volume', label: 'Volume' }
      ]}
      rows={list.map((r) => ({
        date: r.date ?? r.trade_date ?? r.time,
        open: r.open ?? r.o,
        high: r.high ?? r.h,
        low: r.low ?? r.l,
        close: r.close ?? r.c ?? r.adj_close,
        volume: r.volume ?? r.v
      }))}
    />
  );
}

function NewsList({ items, caption }: { items: unknown[]; caption: string }) {
  const list = asRows(items);
  if (!list.length) return null;
  return (
    <section>
      <h2 className="text-base font-semibold">{caption}</h2>
      <ul className="list-disc pl-5 text-sm">
        {list.slice(0, 40).map((item, i) => (
          <li key={i}>
            <strong>{cell(item.headline ?? item.title)}</strong>
            {item.datetime || item.published_at ? (
              <span> — {cell(item.datetime ?? item.published_at)}</span>
            ) : null}
            {item.summary ? <p>{cell(item.summary)}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function PerformanceSummary({
  label,
  payload
}: {
  label: string;
  payload: Record<string, unknown> | null | undefined;
}) {
  if (!payload) return null;
  const perf = (payload.performance as Record<string, unknown>) || payload;
  const keys = ['1D', '5D', '1M', '3M', '6M', '1Y', '3Y', '5Y', '10Y', '20Y', 'YTD'];
  const rows = keys
    .map((k) => ({ period: k, return_pct: perf[k] ?? perf[k.toLowerCase()] }))
    .filter((r) => r.return_pct != null);
  if (!rows.length) return null;
  return (
    <SimpleTable
      caption={`${label} — period returns`}
      columns={[
        { key: 'period', label: 'Period' },
        { key: 'return_pct', label: 'Return %' }
      ]}
      rows={rows}
    />
  );
}

function renderForPath(pathname: string, data: unknown) {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  const path = pathname.split('?')[0];

  if (path === '/return-table' && d.vals) {
    return <ReturnsValsTable vals={d.vals as Record<string, Record<string, number | undefined>>} />;
  }

  if (path === '/heatmap' && d.rows) {
    return <TickerDetailsTable rows={d.rows as unknown[]} caption="Market heatmap — constituents" />;
  }

  if (path === '/odin-signals' && d.indexRows) {
    return <TickerDetailsTable rows={d.indexRows as unknown[]} caption="Odin signals — index constituents" />;
  }

  if (path === '/market-movers' && d.points) {
    return <TickerDetailsTable rows={d.points as unknown[]} caption="Market movers" />;
  }

  if (path === '/news') {
    return (
      <>
        <NewsList items={(d.generalItems as unknown[]) || []} caption="Market news" />
        <NewsList items={(d.indexItems as unknown[]) || []} caption="Index news" />
        <NewsList items={(d.tickerItems as unknown[]) || []} caption="Ticker news" />
      </>
    );
  }

  if (path.startsWith('/historical-data/') && d.rows) {
    const sym = path.split('/').pop()?.toUpperCase() || 'Ticker';
    return (
      <>
        {d.company_name ? (
          <p className="text-sm">
            {String(d.company_name)} ({sym}) — OHLC preview ({cell(d.min_date)} to {cell(d.max_date)})
          </p>
        ) : null}
        <OhlcTable rows={d.rows as unknown[]} caption={`${sym} historical OHLC`} />
      </>
    );
  }

  if (path.startsWith('/ticker/')) {
    const sym = String(d.symbol || path.split('/').pop() || '').toUpperCase();
    return (
      <>
        <PerformanceSummary label={sym} payload={d.returnsSym as Record<string, unknown>} />
        <PerformanceSummary label="SPY benchmark" payload={d.returnsSpy as Record<string, unknown>} />
        {d.ohlcRows ? (
          <OhlcTable rows={d.ohlcRows as unknown[]} caption={`${sym} OHLC (1 year)`} />
        ) : null}
      </>
    );
  }

  if (path.startsWith('/indices/') || path.startsWith('/sector-data/')) {
    const series = asRows(d.fullChartSeries).map((r) => ({
      date: r.date,
      close: r.close
    }));
    return (
      <>
        {series.length ? (
          <SimpleTable
            caption={`${d.slug} — close price series`}
            columns={[
              { key: 'date', label: 'Date' },
              { key: 'close', label: 'Close' }
            ]}
            rows={series}
          />
        ) : null}
        <PerformanceSummary label="SPY" payload={d.returnsSpy as Record<string, unknown>} />
      </>
    );
  }

  if (path.startsWith('/statistic-data') && d.ohlcRows) {
    return <OhlcTable rows={d.ohlcRows as unknown[]} caption="OHLC signals sample" />;
  }

  if (path.startsWith('/stock-splits') && d.splits) {
    return (
      <SimpleTable
        caption="Recent stock splits"
        columns={[
          { key: 'symbol', label: 'Symbol' },
          { key: 'execution_date', label: 'Date' },
          { key: 'split_ratio', label: 'Ratio' }
        ]}
        rows={asRows(d.splits).map((r) => ({
          symbol: r.symbol ?? r.ticker,
          execution_date: r.execution_date ?? r.date,
          split_ratio: r.split_ratio ?? r.ratio
        }))}
      />
    );
  }

  if (path.startsWith('/relative-performance/') && d.seriesData) {
    const series = d.seriesData as Record<string, unknown[]>;
    const firstKey = Object.keys(series)[0];
    if (firstKey) {
      return (
        <OhlcTable rows={series[firstKey]} caption={`Relative performance — ${firstKey}`} />
      );
    }
  }

  if (path.includes('/statistic/ticker-')) {
    const sym = String(d.symbol || '').toUpperCase();
    return (
      <>
        {d.primaryReturnsRaw ? (
          <OhlcTable rows={d.primaryReturnsRaw as unknown[]} caption={`${sym} returns`} />
        ) : null}
        {d.annualReturnsRaw ? (
          <OhlcTable rows={d.annualReturnsRaw as unknown[]} caption={`${sym} annual returns`} />
        ) : null}
        {d.quarterlyReturnsRaw ? (
          <OhlcTable rows={d.quarterlyReturnsRaw as unknown[]} caption={`${sym} quarterly returns`} />
        ) : null}
        {d.statsRows ? (
          <OhlcTable rows={d.statsRows as unknown[]} caption={`${sym} OHLC statistics`} />
        ) : null}
      </>
    );
  }

  if (path.startsWith('/ticker-report/') && d.report) {
    const report = d.report as Record<string, unknown>;
    const meta = (report.meta as Record<string, unknown>) || report;
    return (
      <article className="text-sm">
        <h2>{cell(meta.title ?? `${d.symbol} monthly report`)}</h2>
        <p>{cell(meta.summary ?? meta.description ?? report.summary)}</p>
      </article>
    );
  }

  if (path === '/market') {
    return (
      <>
        {d.summaryReturns ? (
          <ReturnsValsTable
            vals={d.summaryReturns as Record<string, Record<string, number | undefined>>}
          />
        ) : null}
        {d.watchlistRows ? (
          <TickerDetailsTable rows={d.watchlistRows as unknown[]} caption="Market watchlist snapshot" />
        ) : null}
      </>
    );
  }

  return null;
}

type SeoServerContentProps = {
  pathname: string;
  data: unknown;
};

/** Rendered inside `<noscript>` — in the HTML for crawlers, never shown when JS is enabled. */
export function SeoServerContent({ pathname, data }: SeoServerContentProps) {
  const body = renderForPath(pathname, data);
  if (!body) return null;

  return (
    <noscript>
      <section aria-label="Market data summary" className="seo-crawler-content">
        {body}
      </section>
    </noscript>
  );
}

import { Suspense } from 'react';
import Chart from './features/chart';
import Stock from './features/stock';
import { StockModel } from './features/stock/models';
import Recommendation from './features/stock/recommendation/recommendation';
import SeachResult from './features/stock/search/seach-result/search-result';
import SearchBar from './features/stock/search/search-bar/search-bar';
import { verifyAndGetStock } from './features/stock/utils';
import { RecommendationSkeleton, StockSkeleton } from './features/ui/skeletons';

type Props = {
  searchParams: {
    query: string;
  };
};

type VerifiedStockState = null | undefined | '' | StockModel;

export default async function Home({ searchParams: { query } }: Props) {
  const verifiedStock: VerifiedStockState = query
    ? await verifyAndGetStock(query)
    : '';
  return (
    <main className="flex min-h-screen flex-col gap-5 p-8 md:p-16 md:flex-row">
      <section className="flex-1 flex flex-col gap-5">
        <SearchBar query={query} />
        {verifiedStock && (
          <Stock>
            <Suspense key={query + 'result'} fallback={<StockSkeleton />}>
              <SeachResult stock={verifiedStock} />
            </Suspense>
            <p>Recommended peer companies:</p>
            <Suspense
              key={query + 'recommendation'}
              fallback={<RecommendationSkeleton />}
            >
              <Recommendation symbol={query} />
            </Suspense>
          </Stock>
        )}
        {verifiedStock === undefined && (
          <div>
            No stock belongs to the provided ticker:{' '}
            <span className="border border-solid border-red-800 p-2">
              {query}
            </span>
          </div>
        )}
        {verifiedStock === null && (
          <div>Something went wrong, server could not fetch tickers</div>
        )}
        {verifiedStock === '' && (
          <div>Use the search bar to receive stock information</div>
        )}
      </section>
      <section className="flex-1">
        <Chart />
      </section>
    </main>
  );
}

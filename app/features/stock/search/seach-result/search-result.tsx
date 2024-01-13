import {
  CurrentPriceSkeleton,
  HLOCSkeleton
} from '@/app/features/ui/skeletons';
import { api } from '@/app/lib/api';
import { Suspense } from 'react';
import { StockModel } from '../../models';
import CurrentPrice from '../../quote/current-price/current-price';
import HighLowOpenClose from '../../quote/high-low-open-close-price/high-low-open-close-price';

type Props = {
  query: string;
};
// const dataFilePath = path.join(process.cwd(), 'json/symbols.json');

async function SeachResult({ query }: Props) {
  if (!query) {
    return <div>Use the search bar to receive stock information</div>;
  }

  // TODO - OPTIMIZATION cache it locally as the response is more than 2MB so it cannot be cached by default, groupBy ticker so select will be O(1)
  const response = await api.get<StockModel[]>('/stock/symbol', 'exchange=US');

  // For local development:
  // const data = await fsPromises.readFile(dataFilePath);
  // const response = JSON.parse(data);
  if (!response) {
    return <div>Something went wrong, please try again</div>;
  }

  const searchedStock = response.find(
    (stock) => stock.displaySymbol.toLowerCase() === query.toLowerCase()
  );

  if (!searchedStock) {
    return <div>There is no stock for the provided ticker: {query}</div>;
  }

  return (
    <article className="p-3 bg-white text-black rounded-3xl shadow-md flex flex-col justify-between md:flex-row gap-3">
      <div>
        <h3>{searchedStock.displaySymbol}</h3>
        <p className="text-2xl">{searchedStock.description}</p>
        <Suspense key={query} fallback={<CurrentPriceSkeleton />}>
          <CurrentPrice symbol={searchedStock.symbol} />
        </Suspense>
      </div>
      <Suspense fallback={<HLOCSkeleton />}>
        <HighLowOpenClose symbol={searchedStock.symbol} />
      </Suspense>
    </article>
  );
}

export default SeachResult;

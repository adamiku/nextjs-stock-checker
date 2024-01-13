import {
  CurrentPriceSkeleton,
  HLOCSkeleton
} from '@/app/features/ui/skeletons';
import { Suspense } from 'react';
import { StockModel } from '../../models';
import CurrentPrice from '../../quote/current-price/current-price';
import HighLowOpenClose from '../../quote/high-low-open-close-price/high-low-open-close-price';

type Props = {
  stock: StockModel;
};

async function SeachResult({ stock }: Props) {
  return (
    <article className="p-3 bg-white text-black rounded-3xl shadow-md flex flex-col justify-between md:flex-row gap-3">
      <div>
        <h3>{stock.displaySymbol}</h3>
        <p className="text-2xl">{stock.description}</p>
        <Suspense key={stock.symbol} fallback={<CurrentPriceSkeleton />}>
          <CurrentPrice symbol={stock.symbol} />
        </Suspense>
      </div>
      <Suspense fallback={<HLOCSkeleton />}>
        <HighLowOpenClose symbol={stock.symbol} />
      </Suspense>
    </article>
  );
}

export default SeachResult;

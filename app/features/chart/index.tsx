import { alphaApi } from '@/app/lib/api';
import { differenceInDays } from 'date-fns';
import { OHLCPriceModelByDate, OHLCPriceModelByDateResponse } from './models';
import PriceChart from './price-chart/price-chart';

type Props = {
  symbol: string;
};

async function Chart({ symbol }: Props) {
  const data = await alphaApi.get<OHLCPriceModelByDateResponse>(
    '/query',
    `function=TIME_SERIES_MONTHLY&symbol=${symbol}`
  );
  if (!data) return <div>There is no historical data for {symbol}</div>;
  const { labels, closingPrices } = getClosingPricesWithDates(
    data['Monthly Time Series']
  );

  return (
    <PriceChart symbol={symbol} closingPrices={closingPrices} labels={labels} />
  );
}

export default Chart;

function getClosingPricesWithDates(prices: OHLCPriceModelByDate) {
  const today = new Date();
  const result = { labels: [], closingPrices: [] } as {
    labels: string[];
    closingPrices: number[];
  };
  for (const [label, values] of Object.entries(prices)) {
    if (differenceInDays(today, new Date(label)) > 365) break;
    result.labels.push(label);
    result.closingPrices.push(Number(values['4. close']));
  }
  return result;
}

import { api } from '@/app/lib/api';
import { ApiRouter } from '@/app/lib/routes';
import { QuoteModel } from '../../models';

type Props = {
  symbol: string;
};

async function CurrentPrice({ symbol }: Props) {
  const response = await api.get<QuoteModel>(
    ApiRouter.QUOTE,
    `symbol=${symbol}`
  );
  if (!response) {
    return <span>Current price is not available</span>;
  }
  return (
    <span
      className={`${response.c > response.pc ? 'text-green-500' : 'text-red-500'}`}
    >
      {response.c}
    </span>
  );
}

export default CurrentPrice;

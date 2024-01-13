import { api } from '@/app/lib/api';
import { QuoteModel } from '../../models';

type Props = {
  symbol: string;
};

async function HighLowOpenClose({ symbol }: Props) {
  const response = await api.get<QuoteModel>('/quote', `symbol=${symbol}`);
  if (!response) {
    return <span>Price is not available</span>;
  }
  return (
    <div className="flex flex-col gap-1">
      <p className="flex justify-between gap-4">
        <span>Previous Close:</span>
        <span>{response.pc}</span>
      </p>
      <p className="flex justify-between">
        <span>Todays Open:</span>
        <span>{response.o}</span>
      </p>
      <p className="flex justify-between">
        <span>Todays High:</span>
        <span>{response.h}</span>
      </p>
      <p className="flex justify-between">
        <span>Todays Low:</span>
        <span>{response.l}</span>
      </p>
    </div>
  );
}

export default HighLowOpenClose;

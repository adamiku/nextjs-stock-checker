import { PropsWithChildren } from 'react';

function Stock({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-5">{children}</div>;
}

export default Stock;

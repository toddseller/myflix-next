import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading: boolean;
}

const LoadingButton = ({
                                loading,
                                disabled,
                                children,
                                ...props
                              }: LoadingButtonProps) => {
  return (
    <Button disabled={loading || disabled} {...props} className='primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full px-4 py-3'>
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}

export default LoadingButton;
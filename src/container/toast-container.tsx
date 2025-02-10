import { useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

type ToastState = {
  title?: string;
  status: 'info' | 'warning' | 'success' | 'error' | undefined;
  message: string;
};

export function useToastHook() {
  const [state, setState] = useState<ToastState>();
  const toast = useToast();

  useEffect(() => {
    if (state) {
      const { title, message, status } = state;

      toast({
        title: title || status,
        description: message,
        status: status,
        position: 'top',
        isClosable: true,
      });
    }
  }, [state, toast]);

  const openToast = (state: ToastState) => {
    setState(state);
  };

  return { state, openToast };
}

export const ToastContainer = createContainer(useToastHook);

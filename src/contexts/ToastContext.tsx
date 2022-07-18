import { createContext, ReactNode, useCallback, useState } from "react";

import {
  Provider as BaseToastProvider,
  ToastViewport,
} from "@radix-ui/react-toast";
import { styled } from "@/stitches.config";
import { Toast, ToastProps } from "../components/overlay/Toast";

const StyledToastViewport = styled(ToastViewport, {
  position: "fixed",
  bottom: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  padding: 25,
  gap: 10,
  width: 390,
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 2147483647,
  outline: "none",
});

interface ToastContextType {
  newToast({}: ToastProps): void;
}
export const ToastContext = createContext({} as ToastContextType);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toaster, setToaster] = useState<ToastProps[]>([]);

  const newToast = useCallback(
    ({ title, description, styleType, duration }: ToastProps) => {
      const randomId = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

      const newToast = {
        id: randomId,
        title,
        description,
        styleType,
        duration,
      };
      setToaster([...toaster, newToast]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setToaster]
  );

  return (
    <BaseToastProvider>
      <ToastContext.Provider value={{ newToast }}>
        {children}
      </ToastContext.Provider>
      {toaster?.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          styleType={toast.styleType}
          duration={toast.duration}
        />
      ))}
      <StyledToastViewport />
    </BaseToastProvider>
  );
};

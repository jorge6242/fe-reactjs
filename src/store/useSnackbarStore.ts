import create from 'zustand';

type SnackbarState = {
  open: boolean;
  message: string;
  severity: 'error' | 'info' | 'success' | 'warning';
  setOpen: (open: boolean) => void;
  setMessage: (message: string, severity: SnackbarState['severity']) => void;
  resetSnackbar: () => void;
};

const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: '',
  severity: 'info',
  setOpen: (open) => set({ open }),
  setMessage: (message, severity) => set({ message, severity, open: true }),
  resetSnackbar: () => set({ open: false, message: '', severity: 'info' })
}));

export default useSnackbarStore;

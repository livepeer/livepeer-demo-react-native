import create from 'zustand';

export const useAPIKeyStore = create<{
  key: string;
  save: (key: string) => void;
  clear: () => void;
}>(set => ({
  key: '',
  save: (key: string) => set(state => ({...state, key})),
  clear: () => set(state => ({...state, key: ''})),
}));

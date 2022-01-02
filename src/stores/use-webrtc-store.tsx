import { createContext, useContext } from 'react';
import { WebRtcRootStore } from './webrtc-root-store';
import { assert } from 'ts-essentials';


export const StoreContext = createContext<WebRtcRootStore | null>(null);

export const useWebRtcStore = () => {
  const context = useContext(StoreContext);
  assert(context);
  return context;
};

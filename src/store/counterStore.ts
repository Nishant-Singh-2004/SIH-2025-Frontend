import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Counter } from "@/types/counter";

interface State {
  counter: Counter;
}

interface Actions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<State & Actions>()(
  immer((set) => ({
    counter: { count: 0 },
    increment: () =>
      set((state) => {
        state.counter.count += 1;
      }),
    decrement: () =>
      set((state) => {
        state.counter.count -= 1;
      }),
    reset: () =>
      set((state) => {
        state.counter.count = 0;
      }),
  }))
);

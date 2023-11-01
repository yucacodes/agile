import {
  component$,
  useStore,
  useContextProvider,
  createContextId,
  Slot,
} from "@builder.io/qwik";
export interface State {
  user: any;
}

export const StateProvider = createContextId<State>("StateProvider");

export const Provider = component$(() => {
  const state = useStore<State>({
    user: null,
  });

  useContextProvider(StateProvider, state);

  return <Slot />;
});

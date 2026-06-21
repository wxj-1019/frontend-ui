---
name: react-state-management
description: Comprehensive React state management guide — Zustand, Redux Toolkit, Jotai, React Query, URL State. Decision criteria and patterns for each approach.
---

# React State Management

Guide to choosing and implementing state management in React.

## Decision Tree

```
Is it server state (API data)? → TanStack Query / SWR
Is it form state? → React Hook Form + Zod
Is it URL state (filters, page)? → useSearchParams / nuqs
Is it local UI state? → useState / useReducer
Is it global app state? → Zustand / Jotai
Is it complex derived state? → Zustand + selectors
```

## Zustand (Recommended for Global State)

```typescript
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Usage
function Counter() {
  const count = useStore((s) => s.count); // selective subscription
  const increment = useStore((s) => s.increment);
}
```

## TanStack Query (Server State)

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/api/todos').then(r => r.json()),
});

const mutation = useMutation({
  mutationFn: (todo) => fetch('/api/todos', { method: 'POST', body: JSON.stringify(todo) }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
});
```

## Jotai (Atomic State)

```typescript
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [doubled] = useAtom(doubledAtom);
}
```

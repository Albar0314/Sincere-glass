// src/lib/useHashState.ts
// Synchronizes a plain object state with URL hash fragment.
// Hash is never sent to the server, so this is zero crawl-budget risk:
// Google cannot see hash state and cannot index parametrized URLs.

"use client";

import { useEffect, useRef, useState } from "react";

type Serializable = Record<string, string | number | boolean>;

function encode(obj: Serializable): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) {
    params.set(k, String(v));
  }
  return params.toString();
}

function decode(hash: string): Record<string, string> {
  const h = hash.startsWith("#") ? hash.slice(1) : hash;
  const params = new URLSearchParams(h);
  const out: Record<string, string> = {};
  params.forEach((v, k) => {
    out[k] = v;
  });
  return out;
}

/**
 * useHashState: mirror a state object into location.hash.
 *
 * - Reads hash once on mount and merges parsed values into initialState via parseFn.
 * - Writes serialized state to hash on every change (history.replaceState — no
 *   history entry created, no router triggered).
 * - Canonical URL stays clean; search engines never see parametrized variants.
 */
export function useHashState<T extends Serializable>(
  initialState: T,
  parseFn: (raw: Record<string, string>, fallback: T) => T
): [T, (patch: Partial<T>) => void] {
  const [state, setState] = useState<T>(initialState);
  const hydrated = useRef(false);

  // Hydrate from hash on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = decode(window.location.hash);
    if (Object.keys(raw).length > 0) {
      setState(parseFn(raw, initialState));
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Write back to hash on change (after hydration)
  useEffect(() => {
    if (!hydrated.current || typeof window === "undefined") return;
    const encoded = encode(state);
    const next = encoded ? "#" + encoded : "";
    const current = window.location.hash || "";
    if (next !== current) {
      window.history.replaceState(null, "", window.location.pathname + next);
    }
  }, [state]);

  function update(patch: Partial<T>) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  return [state, update];
}

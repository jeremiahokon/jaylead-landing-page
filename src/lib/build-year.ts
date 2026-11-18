/**
 * The copyright year, fixed at build/revalidation time so the footer stays
 * static under Cache Components (a bare new Date() makes the page dynamic).
 */
import { cacheLife } from 'next/cache';

export async function buildYear(): Promise<number> {
  'use cache';
  cacheLife('weeks');

  return new Date().getFullYear();
}

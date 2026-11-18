import { cn } from '@/lib/utils';

/** The Jaylead lockup, the same artwork as the main site (public/brand). */
export function Logo({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <img
      src={
        tone === 'light'
          ? '/brand/jaylead-logo-light.svg'
          : '/brand/jaylead-logo.svg'
      }
      alt="Jaylead AgriEstate"
      width={166}
      height={50}
      className={cn('h-9 w-auto', className)}
    />
  );
}

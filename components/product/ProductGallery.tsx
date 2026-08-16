'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

/**
 * Thumbnails plus a magnifier on the main image. The zoom is done by scaling
 * the image and shifting its transform-origin to the pointer, which keeps it
 * to one composited layer instead of rendering a second full-size copy.
 */
export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const frameRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {images.length > 1 && (
        <ul className="flex gap-3 sm:flex-col">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-pressed={i === active}
                className={`relative size-20 overflow-hidden rounded-xl border-2 bg-neutral-50 transition-colors ${
                  i === active
                    ? 'border-brand-500'
                    : 'border-transparent hover:border-hairline'
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div
        ref={frameRef}
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={onMove}
        className="relative aspect-square flex-1 overflow-hidden rounded-card bg-neutral-50"
      >
        <Image
          key={images[active]}
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 92vw, 45vw"
          style={{ transformOrigin: origin }}
          className={`object-contain p-8 transition-transform duration-200 ${
            zooming ? 'scale-[1.8]' : 'scale-100'
          }`}
        />
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white opacity-0 transition-opacity duration-200 sm:opacity-100">
          Hover to zoom
        </span>
      </div>
    </div>
  );
}

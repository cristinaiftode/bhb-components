import React from 'react';

export interface LogoProps extends React.SVGAttributes<SVGSVGElement> {
  /** Width in pixels. Height auto-scales to preserve the 5:4 aspect ratio. */
  width?: number;
  /**
   * If true, renders only the "Fliege" (bow tie) glyph in currentColor on a transparent
   * background. If false (default), renders the full banderole (white rectangle + bow tie)
   * with the bow tie in currentColor.
   */
  glyphOnly?: boolean;
}

/**
 * BHB (BuchhaltungsButler) logo. Two-part mark:
 * - A white "banderole" rectangle (background)
 * - A dark "Fliege" (bow tie) centered on the banderole
 *
 * The bow tie uses `currentColor` so callers can recolor it via CSS.
 * Default size is 40 × 32 (matches the Sidebar header logo slot).
 */
export const Logo: React.FunctionComponent<LogoProps> = ({
  width = 40,
  glyphOnly = false,
  ...rest
}) => {
  const height = (width * 64) / 80;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="BuchhaltungsButler"
      {...rest}
    >
      {!glyphOnly && <rect width="80" height="64" fill="var(--white, #FFFFFF)" />}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.688 27.092L55.5688 21.152C56.356 20.7584 57 21.156 57 22.036V38.036C57 38.9168 56.356 39.3144 55.5688 38.9208L43.688 32.9808C42.9768 33.6304 42.0392 34.036 41 34.036C39.9608 34.036 39.0232 33.6304 38.312 32.9808L26.4312 38.9208C25.644 39.3144 25 38.9168 25 38.036V22.036C25 21.156 25.644 20.7584 26.4312 21.152L38.312 27.092C39.0232 26.4424 39.9608 26.036 41 26.036C42.0392 26.036 42.9768 26.4424 43.688 27.092ZM41.2001 39C42.9673 39 44.4001 40.4328 44.4001 42.2C44.4001 43.9672 42.9673 45.4 41.2001 45.4C39.4329 45.4 38.0001 43.9672 38.0001 42.2C38.0001 40.4328 39.4329 39 41.2001 39Z"
        fill="currentColor"
      />
    </svg>
  );
};

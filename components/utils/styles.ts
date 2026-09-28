import { css } from "styled-components";

// styled-components v6 stopped adding vendor prefixes automatically, and
// Safari still needs the -webkit- form of user-select.
export const noSelect = css`
  -webkit-user-select: none;
  user-select: none;
`;

// Stops links and images from being dragged as ghost images (WebKit only).
export const noDrag = css`
  -webkit-user-drag: none;
  ${noSelect}
`;

// Thin scrollbar in the site palette, for the page and scrollable fields.
export const themedScrollbar = css`
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary_mediumdark) var(--color-primary);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-primary);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-primary_mediumdark);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-primary_dark);
  }
`;

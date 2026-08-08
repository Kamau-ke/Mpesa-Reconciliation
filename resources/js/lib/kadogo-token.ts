// resources/js/lib/kadogo-tokens.ts
// Single source of truth for the Ink + Gold palette.
// Import this into every dashboard component — never hardcode hex values.

export const K = {
  // backgrounds
  bg:       '#F5F5F5',   // page
  top:      '#1C1C1E',   // top bar
  tab:      '#2C2C2E',   // tab nav
  hero:     '#2C2C2E',   // hero card
  card:     '#E8E8E8',   // stat cards, table bg, panels
  cardAlt:  '#D4D4D4',   // table headers, alt rows, panel headers
  cardDeep: '#DCDCDC',   // input bg

  // accent
  gold:     '#F2B84B',   // wordmark, total, active tab underline, buttons, avatar
  goldDim:  '#C8962A',   // hover state for gold elements

  // text
  ink:      '#1C1C1E',   // primary text
  muted:    '#888888',   // secondary labels, timestamps
  mutedDk:  '#666666',   // table column headers, field labels

  // status — never change these; duplicated txn row must stay unmistakably red
  paidBg:   '#2C2C2E',
  paidC:    '#F5F5F5',
  dupBg:    '#FEF2F2',
  dupPill:  '#FDEAEA',
  dupC:     '#791F1F',
  alertC:   '#C94F4F',
  alertTxt: '#A32D2D',

  // fonts
  display:  '"Baloo 2", ui-rounded, sans-serif',
  body:     '"Nunito", ui-sans-serif, sans-serif',
  mono:     '"IBM Plex Mono", ui-monospace, monospace',
} as const;
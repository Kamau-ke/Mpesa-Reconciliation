// resources/js/lib/kadogo-tokens.ts
// Single source of truth for the Ink + Gold palette.
// Import this into every dashboard component — never hardcode hex values.

export const K = {
  // backgrounds
  bg:       '#101010',   // page
  top:      '#101010',   // top bar
  tab:      '#1D1D1F',   // tab nav
  hero:     '#1D1D1F',   // hero card
  card:     '#1D1D1F',   // stat cards, table bg, panels
  cardAlt:  '#242426',   // table headers, alt rows, panel headers
  cardDeep: '#242426',   // input bg

  // accent
  gold:     '#43B47E',   // primary action, active tab underline, avatar
  goldDim:  '#319362',   // hover state

  // text
  ink:      '#F5F5F5',   // primary text
  muted:    '#A7A7AB',   // secondary labels, timestamps
  mutedDk:  '#C4C4C7',   // table column headers, field labels

  // status — never change these; duplicated txn row must stay unmistakably red
  paidBg:   '#103D2B',
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

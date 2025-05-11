export interface Theme {
  name: string;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    accent: string;
    border: string;
    ring: string;
    'input-bg': string;
    hover: string;
  }
}

export const themes: Theme[] = [
  {
    name: 'forest',
    colors: {
      primary: '#45723F',
      background: '#171717',
      card: '#1a2119',
      text: '#ADC686',
      accent: '#637561',
      border: 'rgba(173, 198, 134, 0.1)',
      ring: 'rgba(173, 198, 134, 0.3)',
      'input-bg': 'rgba(69, 114, 63, 0.15)',
      hover: 'rgba(69, 114, 63, 0.1)'
    }
  },
  {
    name: 'ocean',
    colors: {
      primary: '#2B4257',
      background: '#1a1a1a',
      card: '#1a2129',
      text: '#86B5DC',
      accent: '#617585',
      border: 'rgba(134, 181, 220, 0.1)',
      ring: 'rgba(134, 181, 220, 0.3)',
      'input-bg': 'rgba(43, 66, 87, 0.15)',
      hover: 'rgba(43, 66, 87, 0.1)'
    }
  },
  {
    name: 'sunset',
    colors: {
      primary: '#723F45',
      background: '#171717',
      card: '#211919',
      text: '#C68686',
      accent: '#756161',
      border: 'rgba(198, 134, 134, 0.1)',
      ring: 'rgba(198, 134, 134, 0.3)',
      'input-bg': 'rgba(114, 63, 69, 0.15)',
      hover: 'rgba(114, 63, 69, 0.1)'
    }
  },
  {
    name: 'purple',
    colors: {
      primary: '#573F72',
      background: '#171717',
      card: '#191a21',
      text: '#9786C6',
      accent: '#656175',
      border: 'rgba(151, 134, 198, 0.1)',
      ring: 'rgba(151, 134, 198, 0.3)',
      'input-bg': 'rgba(87, 63, 114, 0.15)',
      hover: 'rgba(87, 63, 114, 0.1)'
    }
  }
]; 
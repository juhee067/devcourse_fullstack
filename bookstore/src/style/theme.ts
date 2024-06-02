export type ThemeName = 'light' | 'dark';
export type ColorKey = 'primary' | 'background' | 'secondary' | 'third' | 'border' | 'text';

export type HeadingSize = 'large' | 'medium' | 'small';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonSchema = 'primary' | 'normal';

interface Theme {
  name: ThemeName;
  colors: Record<ColorKey, string>;
  heading: {
    [key in HeadingSize]: { fontsize: string };
  };
  button: {
    [key in ButtonSize]: { fontsize: string; padding: string };
  };
  buttonScheme: {
    [key in ButtonSchema]: { color: string; backgroundColor: string };
  };
  borderRadius: {
    default: string;
  };
}

export const light: Theme = {
  name: 'light',
  colors: {
    primary: 'brown',
    background: 'lightgray',
    secondary: 'green',
    third: 'yellow',
    border: 'grey',
    text: 'black',
  },
  heading: {
    large: {
      fontsize: '2rem',
    },
    medium: {
      fontsize: '1.5rem',
    },
    small: {
      fontsize: '1rem',
    },
  },
  button: {
    large: {
      fontsize: '1.5rem',
      padding: '1rem 2rem',
    },
    medium: {
      fontsize: '1rem',
      padding: '0.5rem 1rem',
    },
    small: {
      fontsize: '0.75rem',
      padding: '0.25rem 0.5rem',
    },
  },
  buttonScheme: {
    primary: {
      color: 'white',
      backgroundColor: 'midnightblue',
    },
    normal: {
      color: 'black',
      backgroundColor: 'lightgrey',
    },
  },
  borderRadius: {
    default: '4px',
  },
};

export const dark: Theme = {
  ...light,
  name: 'dark',
  colors: {
    primary: 'coral',
    background: 'midnightblue',
    secondary: 'green',
    third: 'yellow',
    border: 'grey',
    text: 'black',
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case 'light':
      return light;
    case 'dark':
      return dark;
    default:
      throw new Error(`Unknown theme: ${themeName}`);
  }
};

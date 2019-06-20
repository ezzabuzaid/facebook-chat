type DIR = 'up' | 'down';
type SIZE = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const MEDIA_BEAKPOINTS = {
  DOWN(size: Exclude<SIZE, 'xs'>) {
    return `(max-width: ${getSize(size)})`;
  },
  UP(size: SIZE) {
    return `(min-width: ${getSize(size)})`;
  }
};

function getSize(size: SIZE) {
  switch (size) {
    case 'xs':
      return '0px';
    case 'sm':
      return '576px';
    case 'md':
      return '768px';
    case 'lg':
      return '992px';
    case 'xl':
      return '1200px';
  }
}

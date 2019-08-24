type SIZE = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const UNIT = 'px';
export const MEDIA_BREAKPOINTS = {
  DOWN(size: Exclude<SIZE, 'xs'>) {
    return `(max-width: ${getSize(size)}${UNIT})`;
  },
  UP(size: SIZE) {
    return `(min-width: ${getSize(size)}${UNIT})`;
  }
};

function getSize(size: SIZE) {
  switch (size) {
    case 'xs':
      return 0;
    case 'sm':
      return 576;
    case 'md':
      return 768;
    case 'lg':
      return 992;
    case 'xl':
      return 1200;
  }
}

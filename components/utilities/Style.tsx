export const deviceStruct = (
  xs: string,
  sm: string,
  md: string,
  lg: string,
  xl: string
) => {
  return {
    xs: xs,
    sm: sm,
    md: md,
    lg: lg,
    xl: xl,
  };
};

export const deviceWrapper = (mobile: string, desktop: string) => {
  return deviceStruct(mobile, mobile, desktop, desktop, desktop);
};

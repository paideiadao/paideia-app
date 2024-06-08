export const deviceStruct = (
  xs: string | number,
  sm: string | number,
  md: string | number,
  lg: string | number,
  xl: string | number
) => {
  return {
    xs,
    sm,
    md,
    lg,
    xl,
  };
};

export const deviceWrapper = (mobile: string | number, desktop: string | number) => {
  return deviceStruct(mobile, mobile, desktop, desktop, desktop);
};

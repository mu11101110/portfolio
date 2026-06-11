export const formatAriaDescribedby = (
  id: string,
  description?: string,
  error?: boolean
): string => {
  const descId = `${id}-desc`;
  const errorId = `${id}-error`;

  if (description && error) {
    return `${descId} ${errorId}`;
  } else if (description) {
    return descId;
  } else if (error) {
    return errorId;
  } else {
    return "";
  }
};

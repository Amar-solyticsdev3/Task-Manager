export const validationEmail = (emailId) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(emailId);
};

export const addThousandSeparator = (num) => {
  if (num === null || num === undefined) return ' ';
  const [integratedPart, fractionPart] = num.toString().split('.');
  const formattedInteger = integratedPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return fractionPart
    ? `${formattedInteger}.${fractionPart}`
    : formattedInteger;
};

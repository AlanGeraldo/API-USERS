export const extracValidationData = (resultValidation) => {
  let errorMessages;
  let data;
  const hasError = !resultValidation.success;

  if (hasError) {
    errorMessages = JSON.parse(resultValidation.error.success);
  }

  if (!hasError) {
    data = resultValidation.data;
  }

  return {
    hasError,
    data,
    errorMessages,
  };
};

const validateInput = (input: string): boolean => {
  const sanitisedInput = input.trim();

  if (sanitisedInput.length < 3 || sanitisedInput.length > 50) {
    return false;
  }

  // Reject ONLY Number
  if (/^\d+$/.test(sanitisedInput)) {
    return false;
  }

  // Only letters and spaces allowed
  if (!/^[A-Za-z\s]/.test(sanitisedInput)) {
    return false;
  }

  // Need at least one vowel and one consonant
  if (!/[ueoai]/i.test(sanitisedInput)) {
    return false;
  }

  if (!/[bcdfghjklmnpqrstvwxyz]/i.test(sanitisedInput)) {
    return false;
  }

  if (/(.)\1{2,}/.test(sanitisedInput)) {
    return false;
  }

  if (/(\w{2,})\1/.test(sanitisedInput)) {
    return false;
  }

  return true;
};

export default validateInput;

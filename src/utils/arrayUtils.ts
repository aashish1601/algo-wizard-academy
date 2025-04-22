
/**
 * Generates a random array of numbers within a specified range
 * @param size Size of the array to generate
 * @param min Minimum value for numbers in the array
 * @param max Maximum value for numbers in the array
 * @returns An array of random integers
 */
export const generateRandomArray = (size: number, min: number, max: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
};

/**
 * Creates a delay using promises
 * @param ms Time to delay in milliseconds
 * @returns A promise that resolves after the specified time
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

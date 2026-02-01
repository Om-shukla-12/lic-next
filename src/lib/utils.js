import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Masks Aadhaar number to XXXX-XXXX-1234 format
 * @param {string|number} val - Aadhaar number
 * @returns {string} Masked Aadhaar
 */
export const maskAadhaar = (val) => {
  if (!val) return '';
  const s = val.toString();
  if (s.length < 4) return s;
  return 'XXXX-XXXX-' + s.slice(-4);
};

/**
 * Formats currency in INR
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

/**
 * Formats date to a readable format
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

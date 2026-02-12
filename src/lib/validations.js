import { z } from 'zod';

/**
 * Zod schemas for consistent form validation
 */

export const customerSchema = z.object({
    customer_name: z.string().min(1, 'Full name is required'),
    father_name: z.string().min(1, "Father's name is required"),
    mother_name: z.string().min(1, "Mother's name is required"),
    spouse_name: z.string().optional().or(z.literal('')),
    spouse_relation: z.string().optional().or(z.literal('')),
    age: z.number().optional().or(z.literal('')),
    dob: z.string().min(1, 'Date of birth is required'),
    address: z.string().min(1, 'Address is required'),
    village: z.string().min(1, 'Village is required'),
    pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
    mobile_number: z.string().regex(/^\d{10}$/, 'Contact must be 10 digits'),
    email: z.string().email('Invalid email format').optional().or(z.literal('')),
    aadhaar_number: z.string().regex(/^\d{12}$/, 'Aadhaar must be 12 digits'),
    pan_number: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format. Must be 10 characters (e.g., ABCDE1234F)'),
    gender: z.string().min(1, 'Gender is required'),
});

export const jobSchema = z.object({
    address: z.string().min(1, 'Work address is required'),
    annual_income: z.string().min(1, 'Annual income is required'),
});

export const medicalSchema = z.object({
    height: z.string().min(1, 'Height is required'),
    weight: z.string().min(1, 'Weight is required'),
});

// Nominee is now part of policy schema (nested)
export const nomineeSchema = z.object({
    nominee_name: z.string().min(1, 'Nominee name is required'),
    relation: z.string().min(1, 'Relationship is required'),
    age: z.string().min(1, 'Age is required'),
    pan_number: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, 'Invalid PAN format'),
});

export const policySchema = z.object({
    policy_type: z.string().min(1, 'Policy type is required'),
    name: z.string().min(1, 'Policy holder name is required'),
    policy_no: z.string().min(1, 'Policy number is required').refine(val => parseInt(val) > 0, 'Policy number must be greater than 0'),
    insurance_number: z.string().min(1, 'Insurance number is required'),
    insurance_rate: z.string().min(1, 'Insurance rate is required'),
    premium_year: z.string().min(1, 'Premium year is required'),
    maturity_years: z.string().min(1, 'Maturity years is required'),
    installment_type: z.string().min(1, 'Installment type is required'),
    installment_price: z.string().min(1, 'Installment price is required'),
    birth_place: z.string().min(1, 'Birth place is required'),
    // Nested nominee validation
    nominee: nomineeSchema,
});

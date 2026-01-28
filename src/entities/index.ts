/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: agents
 * Interface for Agents
 */
export interface Agents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  agentName?: string;
  /** @wixFieldType text */
  employeeId?: string;
  /** @wixFieldType text */
  contactNumber?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType date */
  dateOfJoining?: Date | string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePicture?: string;
  /** @wixFieldType text */
  assignedDistrictOfficerName?: string;
  /** @wixFieldType number */
  totalPoliciesSold?: number;
}


/**
 * Collection ID: customers
 * Interface for Customers
 */
export interface Customers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePicture?: string;
  /** @wixFieldType date */
  dateOfBirth?: Date | string;
  /** @wixFieldType text */
  gender?: string;
  /** @wixFieldType text */
  aadhaarNumber?: string;
  /** @wixFieldType text */
  contactNumber?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  address?: string;
}


/**
 * Collection ID: familymembers
 * Interface for FamilyMembers
 */
export interface FamilyMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  relationship?: string;
  /** @wixFieldType date */
  dateOfBirth?: Date | string;
  /** @wixFieldType text */
  gender?: string;
  /** @wixFieldType text */
  aadhaarNumber?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePicture?: string;
}


/**
 * Collection ID: licplans
 * Interface for LICPlans
 */
export interface LICPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  planName?: string;
  /** @wixFieldType text */
  planCode?: string;
  /** @wixFieldType text */
  planType?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  minEntryAge?: number;
  /** @wixFieldType number */
  maxEntryAge?: number;
  /** @wixFieldType number */
  minPolicyTerm?: number;
  /** @wixFieldType number */
  maxPolicyTerm?: number;
  /** @wixFieldType text */
  premiumPaymentModes?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: policies
 * Interface for Policies
 */
export interface Policies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  policyNumber?: string;
  /** @wixFieldType text */
  policyName?: string;
  /** @wixFieldType number */
  premiumAmount?: number;
  /** @wixFieldType date */
  dueDate?: Date | string;
  /** @wixFieldType text */
  renewalStatus?: string;
}

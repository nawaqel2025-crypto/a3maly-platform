// accounting/ar/customers/customerMaster.ts

export type CustomerStatus = "active" | "on_hold" | "blocked";

export interface CustomerMaster {
  id: string;                    // internal ID
  customerNumber: string;        // مثال: CUST-0001
  name: string;
  legalName?: string;
  taxNumber?: string;            // VAT / TIN
  registrationNumber?: string;

  // Address
  country: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode?: string;

  // Contacts
  contactName?: string;
  phone?: string;
  mobile?: string;
  email?: string;

  // AR settings
  paymentTermsId?: string;       // ربط بشروط السداد
  currency: string;              // مثال: SAR, USD
  creditLimitId?: string;        // ربط بسجل حدود الائتمان
  status: CustomerStatus;

  // Classification
  customerGroupId?: string;
  salesRegionId?: string;
  salesRepId?: string;

  createdAt: string;
  updatedAt: string;
}

export const customers: CustomerMaster[] = [
  {
    id: "cust-001",
    customerNumber: "CUST-0001",
    name: "شركة النواقل للتقنية",
    legalName: "شركة النواقل للتقنية المحدودة",
    taxNumber: "3100000000",
    country: "SA",
    city: "الرياض",
    addressLine1: "طريق الملك فهد",
    phone: "+966112222222",
    email: "info@nawaqel.com",
    paymentTermsId: "PT-30D",
    currency: "SAR",
    creditLimitId: "cl-001",
    status: "active",
    customerGroupId: "CORP",
    salesRegionId: "Riyadh",
    salesRepId: "SR-001",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

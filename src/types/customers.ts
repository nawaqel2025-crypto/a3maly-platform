export interface Customer {
  id: string;
  company_id: string;

  code: string;
  name: string;
  name_ar?: string;

  vat_number?: string;
  cr_number?: string;
  is_vat_registered: boolean;

  country?: string;
  city?: string;
  district?: string;
  street?: string;
  building_no?: string;
  postal_code?: string;
  additional_no?: string;

  phone?: string;
  mobile?: string;
  email?: string;

  iban?: string;
  credit_limit?: number;

  is_active: boolean;
  created_at?: string;
}

interface PaypalOrderStatusResp {
  id: string;
  intent: string;
  status: string;
  payment_source: PaymentSource;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  create_time: Date;
  update_time: Date;
  links: Link[];
}

interface Link {
  href: string;
  rel: string;
  method: string;
}

interface Payer {
  name: PayerName;
  email_address: string;
  payer_id: string;
  address: PayerAddress;
}

interface PayerAddress {
  country_code: string;
}

interface PayerName {
  given_name: string;
  surname: string;
}

interface PaymentSource {
  paypal: Paypal;
}

interface Paypal {
  email_address: string;
  account_id: string;
  account_status: string;
  name: PayerName;
  address: PayerAddress;
  app_switch_eligibility: boolean;
}

interface PurchaseUnit {
  reference_id: string;
  amount: Amount;
  payee: Payee;
  shipping: Shipping;
  payments: Payments;

  invoice_id: string;
}

interface Amount {
  currency_code: string;
  value: string;
}

interface Payee {
  email_address: string;
  merchant_id: string;
}

interface Payments {
  captures: Capture[];
}

interface Capture {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  seller_protection: SellerProtection;
  seller_receivable_breakdown: SellerReceivableBreakdown;
  links: Link[];
  create_time: Date;
  update_time: Date;
}

interface SellerProtection {
  status: string;
  dispute_categories: string[];
}

interface SellerReceivableBreakdown {
  gross_amount: Amount;
  paypal_fee: Amount;
  net_amount: Amount;
}

interface Shipping {
  name: ShippingName;
  address: ShippingAddress;
}

interface ShippingAddress {
  address_line_1: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

interface ShippingName {
  full_name: string;
}

export type { PaypalOrderStatusResp };

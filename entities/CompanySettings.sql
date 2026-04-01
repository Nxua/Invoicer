{
  "name": "CompanySettings",
  "type": "object",
  "properties": {
    "company_name": {
      "type": "string",
      "title": "Company Name"
    },
    "company_logo": {
      "type": "string",
      "title": "Company Logo URL"
    },
    "company_email": {
      "type": "string",
      "title": "Company Email"
    },
    "company_phone": {
      "type": "string",
      "title": "Company Phone"
    },
    "company_address": {
      "type": "string",
      "title": "Company Address"
    },
    "company_city": {
      "type": "string",
      "title": "City"
    },
    "company_country": {
      "type": "string",
      "title": "Country"
    },
    "company_registration": {
      "type": "string",
      "title": "Registration Number"
    },
    "company_vat_number": {
      "type": "string",
      "title": "VAT Number"
    },
    "default_vat_rate": {
      "type": "number",
      "title": "Default VAT Rate (%)",
      "default": 15
    },
    "default_payment_details": {
      "type": "string",
      "title": "Default Payment Details"
    },
    "disclaimer": {
      "type": "string",
      "title": "Invoice Disclaimer"
    }
  },
  "required": [
    "company_name"
  ]
}
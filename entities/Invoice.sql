{
  "name": "Invoice",
  "type": "object",
  "properties": {
    "invoice_number": {
      "type": "string",
      "title": "Invoice Number"
    },
    "status": {
      "type": "string",
      "title": "Status",
      "enum": [
        "draft",
        "sent",
        "paid",
        "overdue",
        "cancelled"
      ],
      "default": "draft"
    },
    "client_name": {
      "type": "string",
      "title": "Client First Name"
    },
    "client_surname": {
      "type": "string",
      "title": "Client Surname"
    },
    "client_email": {
      "type": "string",
      "title": "Client Email"
    },
    "client_address": {
      "type": "string",
      "title": "Client Address"
    },
    "issue_date": {
      "type": "string",
      "format": "date",
      "title": "Issue Date"
    },
    "due_date": {
      "type": "string",
      "format": "date",
      "title": "Due Date"
    },
    "line_items": {
      "type": "array",
      "title": "Line Items",
      "items": {
        "type": "object",
        "properties": {
          "description": {
            "type": "string",
            "title": "Description"
          },
          "quantity": {
            "type": "number",
            "title": "Quantity"
          },
          "unit_price": {
            "type": "number",
            "title": "Unit Price"
          },
          "amount": {
            "type": "number",
            "title": "Amount"
          }
        }
      }
    },
    "subtotal": {
      "type": "number",
      "title": "Subtotal"
    },
    "vat_rate": {
      "type": "number",
      "title": "VAT Rate (%)",
      "default": 15
    },
    "vat_amount": {
      "type": "number",
      "title": "VAT Amount"
    },
    "total_amount": {
      "type": "number",
      "title": "Total Amount Due"
    },
    "payment_details": {
      "type": "string",
      "title": "Payment Details"
    },
    "notes": {
      "type": "string",
      "title": "Notes"
    }
  },
  "required": [
    "invoice_number",
    "client_name",
    "client_surname",
    "client_email",
    "issue_date",
    "due_date",
    "line_items"
  ]
}
/**
 * Official company details — TRAVELSENSE PRIVATE LIMITED
 *
 * Source: Ministry of Corporate Affairs (MCA) Certificate of Incorporation
 * issued under SPICe+ Part B, Application Reference AB9922964.
 * Date of Incorporation: 24 December 2025.
 *
 * Use these constants everywhere we need legal / official company details
 * (letterhead, invoice, footer, contact pages, terms of service).
 * Do NOT inline duplicate values elsewhere — import from here.
 */

export const company = {
  legalName: "TravelSense Private Limited",
  shortName: "TravelSense",
  /** Use on signed-off documents (e.g. "For TravelSense Pvt Ltd"). */
  signOffName: "TravelSense Pvt Ltd",

  /** MCA Corporate Identity Number — assigned 24 Dec 2025. */
  cin: "U79110PN2025PTC249905",

  /** Permanent Account Number — issued by Income Tax Department. */
  pan: "AAMCT6212A",

  /** Tax Deduction and Collection Account Number. */
  tan: "PNET21850D",

  /** Date of incorporation (ISO format). */
  incorporatedOn: "2025-12-24",

  /** Registered (and only) office. */
  office: {
    line1: "Rangar Galli Book Code, 215",
    line2: "Sangamner",
    city: "Sangamner",
    district: "Ahmednagar",
    state: "Maharashtra",
    pin: "422605",
    country: "India",
    /** Single-line presentation. */
    fullAddress:
      "Rangar Galli Book Code, 215, Sangamner, Ahmednagar 422605, Maharashtra, India",
    /** Multi-line block (newline-separated) for letterheads / invoices. */
    block: [
      "Rangar Galli Book Code, 215",
      "Sangamner, Ahmednagar",
      "Maharashtra 422605, India",
    ],
  },

  /** Primary contact channels. */
  contact: {
    email: "travelsensepvtltd@gmail.com",
    phone: "+91 80874 53658",
    phoneRaw: "+918087453658",
    whatsapp: "+918087453658",
    website: "travelsense.co.in",
  },

  /** HSN / SAC for travel agency services — used on tax invoices. */
  sacCode: "998552",
  sacDescription: "Travel Agency Services",

  /** Banking details for client invoices (preserved from V9 records). */
  bank: {
    accountName: "TravelSense Private Limited",
    bankName: "HDFC Bank",
    accountNumber: "50200059511992",
    ifsc: "HDFC0001771",
    upi: "travelsense@hdfcbank",
  },

  /** Founder & primary signatory. */
  founder: {
    name: "Jayshree Lakhotiya",
    title: "Founder & Director",
  },
} as const

export type Company = typeof company

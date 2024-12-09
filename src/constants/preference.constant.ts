export enum reportModelEnum {
  univariates = "Univariate Analysis",
  tmas = "Transitional Matrix Analytical System (TMAS)",
}

export const uniVariateColumns = {
  loanid: {
    column_name: "loanid",
    header: "Loan Identifier",
  },
  derivedloanstatus: {
    column_name: "derivedloanstatus",
    header: "Loan Status",
  },
  nextderivedloanstatus: {
    column_name: "nextderivedloanstatus",
    header: "Loan Status",
  },
  loanstatus: {
    column_name: "loanstatus",
    header: "Loan Status",
  },
  days_diff: {
    column_name: "diff",
    header: "Days Past Due",
  },

  endbalance: {
    column_name: "endbalance",
    header: "End Balance",
  },
  term: {
    column_name: "term",
    header: "Term",
  },
  loanpurpose: {
    column_name: "loanpurpose",
    header: "Loan Purpose",
  },
  asofdate: {
    column_name: "asofdate",
    header: "As Of Date",
  },
  chargeoffamt: {
    column_name: "chargeoffamt",
    header: "Charged Off Amount",
  },
  beginbalance: {
    column_name: "beginbalance",
    header: "Begin Balance",
  },
};

export const tmasColumns = {
  loanid: {
    column_name: "loanid",
    header: "Loan Identifier",
  },
  act_period: {
    column_name: "act_period",
    header: "ACT Period",
  },
  orig_upb: {
    column_name: "orig_upb",
    header: "Original Unpaid Balance",
  },
  current_upb: {
    column_name: "current_upb",
    header: "Current Unpaid Balance",
  },
  rem_months: {
    column_name: "rem_months",
    header: "Remaining Months of Loan",
  },

  dlq_status: {
    column_name: "dlq_status",
    header: "Delinquency Status",
  },
  orig_date: {
    column_name: "orig_date",
    header: "Date of Origination",
  },
};

export const userOptions = {
  tmas: {
    buckets: {
      option_name: "Buckets",
      header: "No. of Buckets",
      option_type: "text",
    },
    ingrace: {
      option_name: "Grace Period",
      header: "Enable Grace Period",
      option_type: "radio",
    },
  },
};

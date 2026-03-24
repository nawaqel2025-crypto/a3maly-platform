-- ============================================================
--  SCHEMA FOR CHART OF ACCOUNTS MODULE
--  accounting/settings/chartOfAccounts/schema.sql
-- ============================================================

-- ===========================
-- 1) ACCOUNTS TABLE
-- ===========================
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,

  type VARCHAR(20) NOT NULL CHECK (type IN (
    'ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'
  )),

  nature VARCHAR(20) NOT NULL CHECK (nature IN ('DEBIT', 'CREDIT')),

  parent_id UUID NULL REFERENCES accounts(id) ON DELETE SET NULL,

  level INT NOT NULL DEFAULT 1,
  allow_posting BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_accounts_code ON accounts(code);
CREATE INDEX IF NOT EXISTS idx_accounts_parent ON accounts(parent_id);
CREATE INDEX IF NOT EXISTS idx_accounts_type ON accounts(type);


-- ===========================
-- 2) ACCOUNT GROUPS TABLE
-- ===========================
CREATE TABLE IF NOT EXISTS account_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name VARCHAR(255) NOT NULL,
  description TEXT NULL,

  parent_group_id UUID NULL REFERENCES account_groups(id) ON DELETE SET NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_account_groups_parent ON account_groups(parent_group_id);


-- ===========================
-- 3) ACCOUNT MAPPING TABLE
-- ===========================
CREATE TABLE IF NOT EXISTS account_mapping (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Sales
  sales_revenue_account UUID NULL REFERENCES accounts(id),
  sales_return_account UUID NULL REFERENCES accounts(id),

  -- Inventory
  inventory_account UUID NULL REFERENCES accounts(id),
  cogs_account UUID NULL REFERENCES accounts(id),

  -- Fixed Assets
  depreciation_expense_account UUID NULL REFERENCES accounts(id),
  accumulated_depreciation_account UUID NULL REFERENCES accounts(id),

  -- Payables
  ap_control_account UUID NULL REFERENCES accounts(id),

  -- Receivables
  ar_control_account UUID NULL REFERENCES accounts(id),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_mapping_sales_revenue ON account_mapping(sales_revenue_account);
CREATE INDEX IF NOT EXISTS idx_mapping_inventory ON account_mapping(inventory_account);
CREATE INDEX IF NOT EXISTS idx_mapping_cogs ON account_mapping(cogs_account);


-- ===========================
-- 4) TRIGGER: AUTO UPDATE updated_at
-- ===========================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER trg_accounts_updated
BEFORE UPDATE ON accounts
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_account_groups_updated
BEFORE UPDATE ON account_groups
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_account_mapping_updated
BEFORE UPDATE ON account_mapping
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

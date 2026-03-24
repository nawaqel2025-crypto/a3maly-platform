// accounting/settings/chartOfAccounts/accountRepository.ts

import { supabase } from '@/utils/supabaseClient';
import type { Account } from './accountMaster';
import { buildAccountTree } from './accountHierarchy';

const TABLE = 'accounts';

// ===============================
// GET ALL ACCOUNTS
// ===============================
export async function getAllAccounts(): Promise<Account[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('code', { ascending: true });

  if (error) throw error;

  return data.map(mapDbAccount);
}

// ===============================
// GET ACCOUNT BY ID
// ===============================
export async function getAccountById(id: string): Promise<Account | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }

  return mapDbAccount(data);
}

// ===============================
// CREATE ACCOUNT
// ===============================
export async function createAccount(
  payload: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Account> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      code: payload.code,
      name: payload.name,
      type: payload.type,
      nature: payload.nature,
      parent_id: payload.parentId ?? null,
      level: payload.level,
      allow_posting: payload.allowPosting,
      is_active: payload.isActive
    })
    .select()
    .single();

  if (error) throw error;

  return mapDbAccount(data);
}

// ===============================
// UPDATE ACCOUNT
// ===============================
export async function updateAccount(
  id: string,
  payload: Partial<Omit<Account, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Account> {
  const { data, error } = await supabase
    .from(TABLE)
    .update({
      ...(payload.code && { code: payload.code }),
      ...(payload.name && { name: payload.name }),
      ...(payload.type && { type: payload.type }),
      ...(payload.nature && { nature: payload.nature }),
      ...(payload.parentId !== undefined && { parent_id: payload.parentId }),
      ...(payload.level && { level: payload.level }),
      ...(payload.allowPosting !== undefined && { allow_posting: payload.allowPosting }),
      ...(payload.isActive !== undefined && { is_active: payload.isActive }),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return mapDbAccount(data);
}

// ===============================
// DELETE ACCOUNT
// ===============================
export async function deleteAccount(id: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ===============================
// GET ACCOUNT TREE
// ===============================
export async function getAccountTree() {
  const accounts = await getAllAccounts();
  return buildAccountTree(accounts);
}

// ===============================
// MAP DATABASE ROW TO MODEL
// ===============================
function mapDbAccount(row: any): Account {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    type: row.type,
    nature: row.nature,
    parentId: row.parent_id,
    level: row.level,
    allowPosting: row.allow_posting,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

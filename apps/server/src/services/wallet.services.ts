import { wallet } from "@cashory/db/schema/wallet";
import { db } from "@cashory/db";
import { eq, and } from "@cashory/db/drizzle";
import type { CreateWalletInput, UpdateWalletInput } from "@cashory/schema";

export const listWallets = async (userId: string) => {
  return await db.select().from(wallet).where(eq(wallet.userId, userId));
};

export const getWalletById = async (id: string, userId: string) => {
  const [result] = await db
    .select()
    .from(wallet)
    .where(and(eq(wallet.id, id), eq(wallet.userId, userId)));
  return result;
};

export const getDefaultWallet = async (userId: string) => {
  const [result] = await db
    .select()
    .from(wallet)
    .where(and(eq(wallet.userId, userId), eq(wallet.isDefault, true)));
  return result;
};

export const createWallet = async (userId: string, data: CreateWalletInput) => {
  if (data.isDefault) {
    await db
      .update(wallet)
      .set({ isDefault: false })
      .where(eq(wallet.userId, userId));
  }

  const [result] = await db
    .insert(wallet)
    .values({ ...data, userId })
    .returning();

  return result;
};

export const updateWallet = async (
  id: string,
  userId: string,
  data: UpdateWalletInput,
) => {
  if (data.isDefault) {
    await db
      .update(wallet)
      .set({ isDefault: false })
      .where(eq(wallet.userId, userId));
  }

  const [result] = await db
    .update(wallet)
    .set(data)
    .where(and(eq(wallet.id, id), eq(wallet.userId, userId)))
    .returning();

  return result;
};

export const deleteWallet = async (id: string, userId: string) => {
  const [result] = await db
    .delete(wallet)
    .where(and(eq(wallet.id, id), eq(wallet.userId, userId)))
    .returning();

  return result;
};

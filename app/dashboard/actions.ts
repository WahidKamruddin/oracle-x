"use server"

import { revalidatePath } from "next/cache"
import { getUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function toggleFavorite(coinId: string): Promise<{ favorited: boolean }> {
  const user = await getUser()
  if (!user) return { favorited: false }

  try {
    await prisma.favorite.delete({
      where: { userId_coinId: { userId: user.id, coinId } },
    })
    revalidatePath("/dashboard/favorites")
    return { favorited: false }
  } catch {
    await prisma.favorite.create({
      data: { userId: user.id, coinId },
    })
    revalidatePath("/dashboard/favorites")
    return { favorited: true }
  }
}

export async function getFavoriteIds(): Promise<string[]> {
  const user = await getUser()
  if (!user) return []

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    select: { coinId: true },
  })

  return favorites.map((f) => f.coinId)
}

import { PrismaClient } from "@prisma/client";
import { friendsData } from "./friendData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedFriends() {
  await Promise.all(
    friendsData.map(async (friend) => {
      return prisma.user.create({
        data: {
          email: friend.email,
          emailVerified: new Date(),
          name: friend.name,
          passwordHash: await hash("password", 10),
          image: friend.image,
          friend: {
            create: {
              dateOfBirth: new Date(friend.dateOfBirth),
              gender: friend.gender,
              name: friend.name,
              created: new Date(friend.created),
              updated: new Date(friend.lastActive),
              bio: friend.bio,
              city: friend.city,
              country: friend.country,
              image: friend.image,
              photos: {
                create: [
                  {
                    url: friend.image,
                  },
                ],
              },
            },
          },
        },
      });
    })
  );
}

async function main() {
  await seedFriends();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
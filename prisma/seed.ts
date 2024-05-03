import { PrismaClient } from "@prisma/client";
import { documentsInitialData, groupsInitialData } from "./data";

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (const group of groupsInitialData) {
      await prisma.group.create({
        data: group,
      });
    }
    for (const doc of documentsInitialData) {
      await prisma.document.create({
        data: doc,
      });
    }

    console.log("Seed data has been inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here

  // const allUsers = await prisma.users.findMany()
  // console.log(allUsers)

  const allFolders = await prisma.folder.findMany({
    include: { 
      files: true
    }
  })
  console.log(allFolders);


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
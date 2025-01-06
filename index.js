const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  // await prisma.users.deleteMany({});
  // console.log('All users deleted');

  // await prisma.folder.deleteMany({});
  // console.log('All folders deleted');

  // const allUsers = await prisma.users.findMany();
  // console.log(allUsers);

  // const allFolders = await prisma.folder.findMany({
  //   include: {
  //     files: true
  //   }
  // });
  // console.log(allFolders);


  // allFolders.forEach((folder) => {
  //   console.log(`Folder: ${folder.name}, Created At: ${folder.createdAt}`);

  //   if (folder.files.length > 0) {
  //     folder.files.forEach((file) => {
  //       console.log(`  File Name: ${file.fileName}, Created At: ${file.createdAt}`);
  //     });
  //   } else {
  //     console.log('  No files found for this folder');
  //   }
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

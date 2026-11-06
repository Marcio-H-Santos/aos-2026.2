const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.profile.create({
    data: {
      name: "Márcio Henrique dos Santos",
      email: "marcio.00000860052@unicap.br",
      bio: "Desenvolvedor Mobile e Software Engineer",
      academicExperiences: {
        create: [
          { institution: "UNICAP", degree: "Sistemas para Internet", startDate: new Date("2025-02-01") }
        ]
      },
      professionalExperiences: {
        create: [
          { company: "Tech Solutions", role: "Dev Mobile Jr", startDate: new Date("2025-06-01") }
        ]
      },
      projects: {
        create: [
          { title: "CapituLando", repositoryUrl: "https://github.com/JvCruzM/CapituLando-Backend" }
        ]
      }
    }
  });

  await prisma.profile.create({
    data: {
      name: "João Vitor",
      email: "joao@email.com",
      bio: "Desenvolvedor Backend",
      academicExperiences: {
        create: [
          { institution: "UNICAP", degree: "Ciência da Computação", startDate: new Date("2024-02-01") }
        ]
      },
      projects: {
        create: [
          { title: "API Currículo", repositoryUrl: "https://github.com/usuario/api-curriculo" }
        ]
      }
    }
  });

  console.log("Seed concluída com sucesso! 2 currículos criados no NeonDB.");
}

main()
  .catch
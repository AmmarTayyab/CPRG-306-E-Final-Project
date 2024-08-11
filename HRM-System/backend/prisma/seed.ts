import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const departments = [
    { name: 'Human Resources' },
    { name: 'Engineering' },
    { name: 'Marketing' },
    { name: 'Sales' },
  ];

  const jobPositions = [
    {
      name: 'Software Engineer',
    },
    { name: 'HR Manager' },
    {
      name: 'Marketing Specialist',
    },
    { name: 'Sales Executive' },
  ];

  // Create Departments
  const createdDepartments = await Promise.all(
    departments.map((department) =>
      prisma.department.create({
        data: department,
      }),
    ),
  );

  console.log('Departments seeded successfully.');

  // Create Job Positions and Assign to Departments
  const createdJobPositions = await Promise.all(
    jobPositions.map((jobPosition) => {
      const department =
        createdDepartments[
          Math.floor(Math.random() * createdDepartments.length)
        ];
      return prisma.jobPosition.create({
        data: {
          ...jobPosition,
          departments: {
            connect: { id: department.id },
          },
        },
      });
    }),
  );

  console.log('Job Positions seeded successfully.');

  // Create Users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      status: 'Active',
      role: 'USER',
    };

    users.push(user);
  }

  const createdUsers = await Promise.all(
    users.map((user) => prisma.user.create({ data: user })),
  );

  console.log('Users seeded successfully.');

  // Create Contact Details, Assign Job Positions, and Assign to Users/Employees
  for (const user of createdUsers) {
    const contactDetail = await prisma.contactDetail.create({
      data: {
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
      },
    });

    const jobPosition =
      createdJobPositions[
        Math.floor(Math.random() * createdJobPositions.length)
      ];

    // Fetch the department associated with the selected job position
    const department = await prisma.department.findFirst({
      where: { jobPositions: { some: { id: jobPosition.id } } },
    });

    await prisma.employee.create({
      data: {
        user: { connect: { id: user.id } },
        salary: faker.number.int({ min: 30000, max: 100000 }),
        department: { connect: { id: department?.id } }, // Connect to the department associated with the job position
        contactDetail: { connect: { id: contactDetail.id } },
        jobPosition: { connect: { id: jobPosition.id } },
      },
    });
  }

  console.log(
    'Employees, Contact Details, and Job Positions seeded successfully.',
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

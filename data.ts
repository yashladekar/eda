import * as fs from "fs";
import * as path from "path";
import { faker } from "@faker-js/faker";

interface Task {
    empId: string;
    employeeName: string;
    type: "FullTime" | "PartTime" | "Contract";
    status: "Active" | "Inactive";
    location: string;
    territory: string;
    grade: string;
    account: string;
    sections: string;
    seating: string;
    projectManager: string;
    reportingManager: string;
    changedBy: string;
    profileTitle: string;
    designation: string;
    category: "Engineering" | "Management" | "Quality Assurance" | "Operations" | "Product";
}

const tasks: Task[] = Array.from({ length: 12000 }, () => ({
    empId: `${faker.number.int({ min: 1000, max: 9999 })}`,
    employeeName: faker.person.fullName(),
    type: faker.helpers.arrayElement(["FullTime", "PartTime", "Contract"] as const),
    status: faker.helpers.arrayElement(["Active", "Inactive"] as const),
    location: faker.location.city(),
    territory: faker.location.state(),
    grade: faker.helpers.arrayElement([
        "L1.1",
        "L1.2",
        "L1.3",
        "L1.4",
        "L1.5",
        "L1.6"
    ]),
    account: `Account${faker.number.int({ min: 1, max: 10 })}`,
    sections: `Section${faker.number.int({ min: 1, max: 10 })}`,
    seating: `Seat${faker.number.int({ min: 1, max: 100 })}`,
    projectManager: faker.person.fullName(),
    reportingManager: faker.person.fullName(),
    changedBy: "Admin",
    profileTitle: faker.person.jobTitle(),
    designation: faker.person.jobType(),
    category: faker.helpers.arrayElement([
        "Engineering",
        "Management",
        "Quality Assurance",
        "Operations",
        "Product"
    ] as const),
}));

// Convert tasks array to CSV format
const headers = [
    "empId",
    "employeeName",
    "type",
    "status",
    "location",
    "territory",
    "grade",
    "account",
    "sections",
    "seating",
    "projectManager",
    "reportingManager",
    "changedBy",
    "profileTitle",
    "designation",
    "category",
];
const rows = tasks.map(task => [
    task.empId,
    task.employeeName,
    task.type,
    task.status,
    task.location,
    task.territory,
    task.grade,
    task.account,
    task.sections,
    task.seating,
    task.projectManager,
    task.reportingManager,
    task.changedBy,
    task.profileTitle,
    task.designation,
    task.category,
]);

const csvContent = [
    headers.join(","), // Add headers
    ...rows.map(row => row.join(",")), // Add rows
].join("\n");

// Write the CSV content to a file
const filePath = path.join(__dirname, "tasks.csv");
fs.writeFileSync(filePath, csvContent);

console.log("Tasks data generated and saved to tasks.csv.");

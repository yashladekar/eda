"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var faker_1 = require("@faker-js/faker");
var tasks = Array.from({ length: 12000 }, function () { return ({
    empId: "".concat(faker_1.faker.number.int({ min: 1000, max: 9999 })),
    employeeName: faker_1.faker.person.fullName(),
    type: faker_1.faker.helpers.arrayElement(["FullTime", "PartTime", "Contract"]),
    status: faker_1.faker.helpers.arrayElement(["Active", "Inactive"]),
    location: faker_1.faker.location.city(),
    territory: faker_1.faker.location.state(),
    grade: faker_1.faker.helpers.arrayElement([
        "L1.1",
        "L1.2",
        "L1.3",
        "L1.4",
        "L1.5",
        "L1.6"
    ]),
    account: "Account".concat(faker_1.faker.number.int({ min: 1, max: 10 })),
    sections: "Section".concat(faker_1.faker.number.int({ min: 1, max: 10 })),
    seating: "Seat".concat(faker_1.faker.number.int({ min: 1, max: 100 })),
    projectManager: faker_1.faker.person.fullName(),
    reportingManager: faker_1.faker.person.fullName(),
    changedBy: "Admin",
    profileTitle: faker_1.faker.person.jobTitle(),
    designation: faker_1.faker.person.jobType(),
    category: faker_1.faker.helpers.arrayElement([
        "Engineering",
        "Management",
        "Quality Assurance",
        "Operations",
        "Product"
    ]),
}); });
// Convert tasks array to CSV format
var headers = [
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
var rows = tasks.map(function (task) { return [
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
]; });
var csvContent = __spreadArray([
    headers.join(",")
], rows.map(function (row) { return row.join(","); }), true).join("\n");
// Write the CSV content to a file
var filePath = path.join(__dirname, "tasks.csv");
fs.writeFileSync(filePath, csvContent);
console.log("Tasks data generated and saved to tasks.csv.");

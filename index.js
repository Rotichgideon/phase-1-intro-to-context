// Your code here

function createEmployeeRecord ([firstName, familyName, title, payPerHour]) {
    return {
        "firstName": firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payPerHour,
        "timeInEvents": [],
        "timeOutEvents": [],
    }
}

function createEmployeeRecords (employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent (employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time, 10);

    employeeRecord.timeInEvents.push ({
        type: "TimeIn",
        date,
        hour,
    });

    return employeeRecord;
}

function createTimeOutEvent (employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time, 10);

    employeeRecord.timeOutEvents.push ({
        type: "TimeOut",
        date,
        hour,
    });

    return employeeRecord;
}

function hoursWorkedOnDate (employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find((e) => e.date === date);
    const timeOut = employeeRecord.timeOutEvents.find((e) => e.date === date);

    if (timeIn && timeOut) {
        const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
        return hoursWorked;
    }

    return 0;
}

function wagesEarnedOnDate (employeeData, date) {
    const hoursWorked = hoursWorkedOnDate(employeeData, date);
    const wagesEarned = hoursWorked * employeeData.payPerHour;

    return wagesEarned;
}

function allWagesFor (employeeData) {
    const datesWorked = employeeData.timeInEvents.map((e) => e.date);
    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeData, date)
    }, 0)

    return totalWages
}

function calculatePayroll (employees) {
    return employees.reduce((totalPayroll, employeeData) => {
        return totalPayroll + allWagesFor(employeeData)
    }, 0)
}
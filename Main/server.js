//Import and require mysql2- package
const mysql = require('mysql2');
const inquirer = require('inquirer');

//connect to database
const db= mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);
  
  //view all departments
  async function viewDepartments() {
    try {
        const query = 'SELECT * FROM department';
        const [departments] = await db.promise().query(query);
        console.table(departments);
    } catch (err) {
        console.error(err);
    }
}

// main inquirer prompt
async function mainPrompt() {
  try {
      const answer = await inquirer.prompt({
          name: 'action',
          type: 'list',
          message: 'What would you like to do?',
          choices: [
              'View All Departments',
              'Add Department',
              'View All Roles',
              'Add Role',
              'View All Employees',
              'Add Employee',
              'Update Employee',
              'Exit'
          ]
      });

      switch (answer.action) {
          case 'View All Departments':
              await viewDepartments();
              break;
          case 'Add Department':
              await addDepartment();
              break;
          case 'View All Roles':
              await viewRoles();
              break;
          case 'Add Role':
            await addRole();
            break;
          case 'View All Employees':
            await viewEmployees();
            break; 
          case 'Add Employee':
            await addEmployee();
            break;
          case 'Update Employee':
            await updateEmployee();
            break;          
          case 'Exit':
              db.end();
              return;
      }
      // Call main prompt again for continuous interaction
      await mainPrompt();
  } catch (err) {
      console.error(err);
  }
}
mainPrompt().catch((err) => console.error(err));

// view all departments
async function viewDepartments() {
  const query = 'SELECT * FROM department';
  const [departments] = await db.promise().query(query);
  console.table(departments);
}

async function addDepartment() {
  const { deptName } = await inquirer.prompt([
      {
          name: 'deptName',
          type: 'input',
          message: 'Enter the name of the department:'
      }
  ]);

  const query = 'INSERT INTO department (dept_name) VALUES (?)';
  await db.promise().query(query, [deptName]);
  console.log(`Added ${deptName} to departments`);
}

async function viewRoles() {
  const query = `
      SELECT roles.id, roles.title, department.dept_name AS department, roles.salary 
      FROM roles 
      INNER JOIN department ON roles.department_id = department.id`;
  const [roles] = await db.promise().query(query);
  console.table(roles);
}

async function addRole() {
  const departments = await getDepartments(); // Assume getDepartments fetches department data
  const roleDetails = await inquirer.prompt([
      {
          name: 'title',
          type: 'input',
          message: 'Enter the role title:'
      },
      {
          name: 'salary',
          type: 'input',
          message: 'Enter the salary for this role:'
      },
      {
          name: 'departmentId',
          type: 'list',
          choices: departments.map(dept => ({ name: dept.dept_name, value: dept.id })),
          message: 'Select the department:'
      }
  ]);

  const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
  await db.promise().query(query, [roleDetails.title, roleDetails.salary, roleDetails.departmentId]);
  console.log(`Added ${roleDetails.title} to roles`);
}

async function viewEmployees() {
  const query = `
      SELECT 
          e.id, 
          e.first_name, 
          e.last_name, 
          roles.title, 
          department.dept_name AS department, 
          roles.salary, 
          CONCAT(m.first_name, ' ', m.last_name) AS manager 
      FROM employee e
      LEFT JOIN employee m ON e.manager_id = m.id
      INNER JOIN roles ON e.role_id = roles.id
      INNER JOIN department ON roles.department_id = department.id`;
  const [employees] = await db.promise().query(query);
  console.table(employees);
}
async function addEmployee() {
  const roles = await getRoles(); // Assume getRoles fetches role data
  const managers = await getManagers(); // Assume getManagers fetches manager data
  const employeeDetails = await inquirer.prompt([
      {
          name: 'firstName',
          type: 'input',
          message: 'Enter the employee`s first name:'
      },
      {
          name: 'lastName',
          type: 'input',
          message: 'Enter the employee`s last name:'
      },
      {
          name: 'roleId',
          type: 'list',
          choices: roles.map(role => ({ name: role.title, value: role.id })),
          message: 'Select the role:'
      },
      {
          name: 'managerId',
          type: 'list',
          choices: managers.map(manager => ({ name: manager.name, value: manager.id })),
          message: 'Select the manager:'
      }
  ]);

  const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  await db.promise().query(query, [employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId]);
  console.log(`Added ${employeeDetails.firstName} ${employeeDetails.lastName} to employees`);
}

async function updateEmployee() {
  const employees = await getEmployees(); // Assume getEmployees fetches employee data
  const roles = await getRoles(); // Assume getRoles fetches role data
  const answers = await inquirer.prompt([
      {
          name: 'employeeId',
          type: 'list',
          choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
          message: 'Which employee’s role do you want to update?'
      },
      {
          name: 'roleId',
          type: 'list',
          choices: roles.map(role => ({ name: role.title, value: role.id })),
          message: 'What is the new role?'
      }
  ]);

  const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
  await db.promise().query(query, [answers.roleId, answers.employeeId]);
  console.log(`Updated employee's role`);
}

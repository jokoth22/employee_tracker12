# Employee Tracker

## Description
Employee Tracker is a command-line application for managing a company's employee database. It allows users to view, add, and update information about employees, roles, and departments using Node.js, Inquirer, and MySQL.

## Installation

To set up the Employee Tracker application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install necessary dependencies by running:
   ```
   npm install
   ```
4. Ensure that MySQL is installed on your machine. If not, install it from [MySQL's official website](https://www.mysql.com/).

## Usage

To use the Employee Tracker, follow these instructions:

1. Start the MySQL command-line tool and login:
   ```
   mysql -u root -p
   ```
2. Create and set up the database using the provided `schema.sql` file:
   ```
   SOURCE db/schema.sql;
   ```
   Optionally, use `seeds.sql` to populate the database with sample data.
      ```
   SOURCE db/seeds.sql;
   ```

3. Exit the MySQL command line tool:
   ```
   exit
   ```
4. Start the application by running:
   ```
   node start
   ```
5. Use the command-line prompts to manage the employee database.

## Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles

## Demo
https://drive.google.com/file/d/1UoxNffl6KKp_gbjvmxmPyV93zRKAlSze/view 

## Contributing

If you wish to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your branch.
4. Create a Pull Request for review and potential merge to the main project.

## License

This project is licensed under the MIT - see the [MIT License](https://opensource.org/licenses/MIT) for details

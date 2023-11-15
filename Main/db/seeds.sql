USE employee_db;

INSERT INTO  department (dept_name)
VALUES  ("History"),
        ("Mathematics"),
        ("English"),
        ("Science"),
        ("Health/Physical Education");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Professor", 23254.32,1),
        ("Dean", 324254.75,2),
        ("Supervisor", 23254.32,3),
        ("Lab Assistant", 23254.32,4),
        ("Coordinator", 23254.32,5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Joyce', 'Okoth',1,1),
        ('Jasmary', 'Milagros',2,2),
        ('Jorge', 'Jordan',3,3),
        ('Josephine', 'Abdullah', 4,4),
        ('Julius', 'Cesar',5,5);

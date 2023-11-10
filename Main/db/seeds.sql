INSERT INTO  department (id, dept_name)
VALUES  (10, "History"),
        (20,"Mathematics"),
        (30,"English"),
        (40, "Science")
        (50, "Health/Physical Education");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (1022, Professor, 23254.32, 10)
        (2056, Dean, 324254.75, 20)
        (3022, Supervisor, 23254.32, 30)
        (4073, Lab Assistant, 23254.32, 40)
        (5935, Coordinator, 23254.32, 50);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1022345, Joyce, Okoth, Professor, 1022, 2056056)
        (2056056, Jasmary, Milagros, Dean, 2056, 22)
        (3022987, Jorge, Jordan, Supervisor, 3022, 2056056)
        (4073344, Josephine, Abdullah, Lab Assistant, 4073, 3022987)
        (5935875, Julius, Cesar, Coordinator, 4073, 3022987);

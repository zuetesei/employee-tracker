CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
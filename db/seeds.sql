INSERT INTO department (name)
VALUES
    ("Sales"),
    ('"Legal"'),
    ("Marketing"),
    ("Finance"),
    ("Operations"),
    ("Communications"),
    ("Human Resources"),
    ("Management");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Senior Sales Associate", 48000, 1),
    ("Business Operations Attorney", 75000, 2),
    ("Marketing Strategist", 55000, 3), 
    ("Certified Public Accountant", 58000, 4), 
    ("Operations Manager", 56000, 5), 
    ("Social Media Outreach Manager", 55000, 6),
    ("HR Manager", 55000, 7), 
    ("Chief Operations Officer", 80000, 8); 


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Yerba", "Mate", 1, NULL),
    ("Ginger", "Chai", 4, 1);
    ("Sunsine", "Matters", 4, 1);
    ("Apple", "Hill", 4, 1);
    ("Mary", "Louise", 4, 1);
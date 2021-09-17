--- create seed for departments --- 
INSERT INTO departments (name)
VALUES  ("Research and Development"), 
        ("Legal"), 
        ("Operations"), 
        ("Finance"), 
        ("Marketing") 

--- create seed for roles --- 
INSERT INTO roles (title, department_id, salary)
VALUES ("researcher", 1, 80000), 
       ("associate", 1, 50000),
       ("Senior Vice President", 1, 150000)
       ("general counsel", 2, 150000),
       ("associate", 2, 50000),
       ("associate", 3, 50000),
       ("program lead", 3, 120000),
       ("Chief Administrative Officer", 3, 160000)
       ("Chief Financial Officer", 4, 160000),
       ("analyst", 4, 100000),
       ("designer", 5, 65000),
       ("Chief Marketing Officer", 5, 160000)

--- create seed for employees --- 
INSERT INTO emnployees (first_name, last_name, roles_id, department, manager_id)
VALUES  ("Jessica","Gisondo", 1, "Research and Development", 2), 
        ("Alanna","Gisondo", 2, "Legal", 2), 
        ("Lian","Han", 3, "Finance", 2), 
        ("Kristy","Wu", 4, "Operations", 2), 
        ("Sean","Macwilliams", 5, "Marketing", 2), 
        ("Sara","Kaminksy", 6, "Research and Development", 2), 
        ("Smita","Satiani", 7, "Legal", 2), 
        ("Aneesh","Chaganty", 8, "Finance", 2), 
        ("Dellea","Chew", 9, "Marketing", 2), 
        ("Aneesh","Chaganty", 10, "Research and Development", 2), 
        ("Aneesh","Chaganty", 11, "Operations", 2), 
        ("Aneesh","Chaganty", 12, "Operations", 2), 





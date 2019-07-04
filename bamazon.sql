DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,  
  product_sales INT (10) NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES ("Prince Originals", "Music/Vinyl", 34.98, 10, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
     VALUES ("Modest Mouse, Moon & Antarctica", "Music/Vinyl", 34.99, 10, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
     VALUES ("The Very Best of Suzi Quatro", "Music/Vinyl", 34.99 , 1, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
     VALUES ("Kings of Leon, Aha Shake Heartbreak", "Music/Vinyl", 36.99, 5, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
     VALUES ("The Killers: Career Box", "Music/Vinyl", 184.99, 1, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
     VALUES ("Weezer: Teal Album", "Music/Vinyl", 21.99, 8, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
     VALUES ("Weezer: Black Album", "Music/Vinyl", 21.99, 10, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
     VALUES ("The Beatles: The White Album", "Music/Vinyl", 99.99, 4, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
     VALUES ("The Beatles: 1962-1966", "Music/Vinyl", 35.99, 2, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
    VALUES ("The Beatles: Let it Be", "Music/Vinyl", 24.99, 2, 1);

-- CREATE TABLE departments (
--   department_id INT NOT NULL AUTO_INCREMENT,
--   department_name VARCHAR(100) NULL,
--   over_head_costs DECIMAL(10,2) NOT NULL,
--   PRIMARY KEY (department_id)
-- );

-- INSERT INTO departments (department_name, over_head_costs)
-- VALUES ("Dept Name", 00.00);




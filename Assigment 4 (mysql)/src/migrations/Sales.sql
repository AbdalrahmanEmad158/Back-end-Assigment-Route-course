  CREATE TABLE IF NOT EXISTS Sales (
            Sale_id SERIAL PRIMARY KEY,
            Product_id INTEGER,
            Quantity_sold INTEGER,
            SaleDate DATE,
            CONSTRAINT fk_sale_product
                FOREIGN KEY (Product_id)
                REFERENCES Products(ProductID)
        );


        ALTER TABLE Sales
ALTER COLUMN SaleDate
SET DEFAULT CURRENT_DATE;

  CREATE TABLE IF NOT EXISTS Products (
            ProductID SERIAL PRIMARY KEY,
            ProductName TEXT,
            Price DECIMAL(10,2),
            StockQuantity INTEGER,
            SupplierID INTEGER,
            CONSTRAINT fk_product_supplier
                FOREIGN KEY (SupplierID)
                REFERENCES Suppliers(Supplier_id)
        );

        /*
        part 3 number 5
        */ 

          ALTER TABLE Products
            ADD COLUMN IF NOT EXISTS Category TEXT default 'null'

             ALTER TABLE Products
            DROP COLUMN IF EXISTS Category


               ALTER TABLE Products
            ALTER COLUMN productname SET NOT NULL
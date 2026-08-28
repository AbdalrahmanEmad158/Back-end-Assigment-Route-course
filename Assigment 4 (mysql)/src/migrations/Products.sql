
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
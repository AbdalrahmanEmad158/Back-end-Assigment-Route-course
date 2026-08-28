 CREATE TABLE IF NOT EXISTS Suppliers (
            Supplier_id SERIAL PRIMARY KEY,
            supplier_name TEXT,
            contact_number TEXT)

   /*
        part 3 number 5
        */ 


               ALTER TABLE Suppliers
            ALTER COLUMN Contact_number TYPE VARCHAR(200)

               /*
       عملتها 200
       بدلا من 15 زي المطلوب 
       لاني كنت حاطط بيانات قبل كدا تعدي ال 15 حرف
        */ 
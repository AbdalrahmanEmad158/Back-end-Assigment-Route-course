CREATE USER store_manager
WITH PASSWORD 'StoreManager@123';

GRANT SELECT, INSERT, UPDATE
ON ALL TABLES IN SCHEMA public
TO store_manager;





REVOKE UPDATE
ON ALL TABLES IN SCHEMA public
FROM store_manager;








GRANT DELETE
ON TABLE Sales
TO store_manager;
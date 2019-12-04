CREATE TABLE facturas (id SERIAL PRIMARY KEY, numero int NOT NULL, proveedor int REFERENCES proveedores(id) NOT NULL, currency_id int REFERENCES currencies(id) NOT NULL,
monto numeric NOT NULL, detalle VARCHAR(100), fecha bigint NOT NULL, vencimiento bigint NOT NULL, status_id int REFERENCES status_facturas(id) NOT NULL,
empresa int REFERENCES empresas(id) NOT NULL, unique(numero, proveedor));
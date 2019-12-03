CREATE TABLE facturas (id SERIAL PRIMARY KEY, numero int NOT NULL, proveedor int REFERENCES proveedores(id), currency VARCHAR(4), monto numeric, detalle VARCHAR(100), fecha date, vencimiento date, status varchar(50)  default 'por pagar', empresa int REFERENCES empresas(
id), unique(numero, proveedor));
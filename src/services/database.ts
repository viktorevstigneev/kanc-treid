import { getDb } from "../data/initDb";
import {
  Product,
  Warehouse,
  Supplier,
  Invoice,
  BankAccount,
  Employee,
} from "../types";

// ========== ТОВАРЫ ==========
export const getAllProducts = (): Product[] => {
  const db = getDb();
  const result = db.exec(
    `SELECT id, name, unit, grade, price, manufacturer, manufacturer_address FROM products`,
  );

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    id: row[0] as number,
    name: row[1] as string,
    unit: row[2] as string,
    grade: row[3] as string,
    price: row[4] as number,
    manufacturer: row[5] as string,
    manufacturerAddress: row[6] as string,
  }));
};

export const addProduct = (product: Omit<Product, "id">) => {
  const db = getDb();
  db.run(
    `
    INSERT INTO products (name, unit, grade, price, manufacturer, manufacturer_address)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [
      product.name,
      product.unit,
      product.grade,
      product.price,
      product.manufacturer,
      product.manufacturerAddress,
    ],
  );
};

export const updateProduct = (id: number, product: Partial<Product>) => {
  const db = getDb();
  const sets: string[] = [];
  const values: any[] = [];

  if (product.name !== undefined) {
    sets.push("name = ?");
    values.push(product.name);
  }
  if (product.unit !== undefined) {
    sets.push("unit = ?");
    values.push(product.unit);
  }
  if (product.grade !== undefined) {
    sets.push("grade = ?");
    values.push(product.grade);
  }
  if (product.price !== undefined) {
    sets.push("price = ?");
    values.push(product.price);
  }
  if (product.manufacturer !== undefined) {
    sets.push("manufacturer = ?");
    values.push(product.manufacturer);
  }
  if (product.manufacturerAddress !== undefined) {
    sets.push("manufacturer_address = ?");
    values.push(product.manufacturerAddress);
  }

  values.push(id);
  db.run(`UPDATE products SET ${sets.join(", ")} WHERE id = ?`, values);
};

export const deleteProduct = (id: number) => {
  const db = getDb();
  db.run(`DELETE FROM products WHERE id = ?`, [id]);
};

// ========== СКЛАДЫ ==========
export const getAllWarehouses = (): Warehouse[] => {
  const db = getDb();
  const result = db.exec(
    `SELECT id, address, product_name, quantity, price FROM warehouses`,
  );

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    id: row[0] as string,
    address: row[1] as string,
    productName: row[2] as string,
    quantity: row[3] as number,
    price: row[4] as number,
  }));
};

export const updateWarehouseStock = (
  warehouseId: string,
  productName: string,
  quantity: number,
) => {
  const db = getDb();
  db.run(
    `UPDATE warehouses SET quantity = ? WHERE id = ? AND product_name = ?`,
    [quantity, warehouseId, productName],
  );
};

// ========== ПОСТАВЩИКИ ==========
export const getAllSuppliers = (): Supplier[] => {
  const db = getDb();
  const result = db.exec(
    `SELECT id, name, legal_address, account_number, product_name, product_price FROM suppliers`,
  );

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    id: row[0] as string,
    name: row[1] as string,
    legalAddress: row[2] as string,
    accountNumber: row[3] as string,
    productName: row[4] as string,
    productPrice: row[5] as number,
  }));
};

export const addSupplier = (supplier: Supplier) => {
  const db = getDb();
  db.run(
    `
    INSERT INTO suppliers (id, name, legal_address, account_number, product_name, product_price)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [
      supplier.id,
      supplier.name,
      supplier.legalAddress,
      supplier.accountNumber,
      supplier.productName,
      supplier.productPrice,
    ],
  );
};

// ========== НАКЛАДНЫЕ ==========
export const getAllInvoices = (): Invoice[] => {
  const db = getDb();
  const result = db.exec(
    `SELECT number, product_name, unit, quantity, price, total FROM invoices`,
  );

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    number: row[0] as string,
    productName: row[1] as string,
    unit: row[2] as string,
    quantity: row[3] as number,
    price: row[4] as number,
    total: row[5] as number,
  }));
};

export const addInvoice = (invoice: Invoice) => {
  const db = getDb();
  db.run(
    `
    INSERT INTO invoices (number, product_name, unit, quantity, price, total)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [
      invoice.number,
      invoice.productName,
      invoice.unit,
      invoice.quantity,
      invoice.price,
      invoice.total,
    ],
  );
};

// ========== БАНКОВСКИЕ СЧЕТА ==========
export const getAllBankAccounts = (): BankAccount[] => {
  const db = getDb();
  const result = db.exec(
    `SELECT number, bank_name, owner_name, status, open_date, has_credit, credit_amount FROM bank_accounts`,
  );

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    number: row[0] as string,
    bankName: row[1] as string,
    ownerName: row[2] as string,
    status: row[3] as string,
    openDate: row[4] as string,
    hasCredit: row[5] as string,
    creditAmount: row[6] as number,
  }));
};

// ========== СОТРУДНИКИ ==========
export const getAllEmployees = (): Employee[] => {
  const db = getDb();
  const result = db.exec(
    `SELECT full_name, company_name, position, education, salary, hire_date FROM employees`,
  );

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    fullName: row[0] as string,
    companyName: row[1] as string,
    position: row[2] as string,
    education: row[3] as string,
    salary: row[4] as number,
    hireDate: row[5] as string,
  }));
};

// ========== ЗАПРОСЫ ПО ВАРИАНТУ 30 ==========

// Запрос 13: сотрудники, принятые на работу в определенную дату
export const query13 = (date: string): Employee[] => {
  const db = getDb();
  const result = db.exec(`
    SELECT full_name, position, hire_date 
    FROM employees 
    WHERE hire_date = '${date}'
  `);

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    fullName: row[0] as string,
    companyName: "",
    position: row[1] as string,
    education: "",
    salary: 0,
    hireDate: row[2] as string,
  }));
};

// Запрос 16: товар и количество по накладной и сумме
export const query16 = (invoiceNumber: string, total: number): Invoice[] => {
  const db = getDb();
  const result = db.exec(`
    SELECT number, product_name, quantity, total 
    FROM invoices 
    WHERE number = '${invoiceNumber}' AND total = ${total}
  `);

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    number: row[0] as string,
    productName: row[1] as string,
    unit: "",
    quantity: row[2] as number,
    price: 0,
    total: row[3] as number,
  }));
};

// Запрос 19: банк по владельцу и номеру счета
export const query19 = (
  ownerName: string,
  accountNumber: string,
): BankAccount[] => {
  const db = getDb();
  const result = db.exec(`
    SELECT bank_name, number, owner_name 
    FROM bank_accounts 
    WHERE owner_name = '${ownerName}' AND number = '${accountNumber}'
  `);

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    number: row[1] as string,
    bankName: row[0] as string,
    ownerName: row[2] as string,
    status: "",
    openDate: "",
    hasCredit: "",
    creditAmount: 0,
  }));
};

// Запрос 33: склады с товаром определенного изготовителя
export const query33 = (
  productName: string,
  manufacturer: string,
): Warehouse[] => {
  const db = getDb();
  const result = db.exec(`
    SELECT w.id, w.address, w.product_name, w.quantity 
    FROM warehouses w
    JOIN products p ON w.product_name = p.name
    WHERE w.product_name = '${productName}' AND p.manufacturer = '${manufacturer}'
  `);

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    id: row[0] as string,
    address: row[1] as string,
    productName: row[2] as string,
    quantity: row[3] as number,
    price: 0,
  }));
};

// Запрос 37: поставщики с кредитом выше заданной суммы
export const query37 = (
  minCredit: number,
): { id: string; name: string; creditAmount: number }[] => {
  const db = getDb();
  const result = db.exec(`
    SELECT DISTINCT s.id, s.name, b.credit_amount
    FROM suppliers s
    JOIN bank_accounts b ON s.account_number = b.number
    WHERE b.has_credit = 'Да' AND b.credit_amount > ${minCredit}
  `);

  if (result.length === 0) return [];

  const rows = result[0].values;
  return rows.map((row: any) => ({
    id: row[0] as string,
    name: row[1] as string,
    creditAmount: row[2] as number,
  }));
};

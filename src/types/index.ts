export interface Product {
  id: number;
  name: string;
  unit: string;
  grade: string;
  price: number;
  manufacturer: string;
  manufacturerAddress: string;
}

export interface Warehouse {
  id: string;
  address: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Supplier {
  id: string;
  name: string;
  legalAddress: string;
  accountNumber: string;
  productName: string;
  productPrice: number;
}

export interface Invoice {
  number: string;
  productName: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
}

export interface BankAccount {
  number: string;
  bankName: string;
  ownerName: string;
  status: string;
  openDate: string;
  hasCredit: string;
  creditAmount: number;
}

export interface Employee {
  fullName: string;
  companyName: string;
  position: string;
  education: string;
  salary: number;
  hireDate: string;
}

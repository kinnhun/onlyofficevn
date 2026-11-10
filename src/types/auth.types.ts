export type UserRole = "admin" | "dealer" | "customer";

export type UserSession = {
  role: UserRole;
  dealerId?: string;
  dealerName?: string;
  customerId?: string;
  customerName?: string;
};

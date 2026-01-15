// src/lib/data/mock.js
// Données fictives pour le dashboard

export const stats = {
  revenue: 45231.89,
  users: 2350,
  orders: 1247,
  conversionRate: 3.2,
  previousRevenue: 40150.00,
  previousUsers: 2100,
  previousOrders: 1180,
  previousConversionRate: 2.8
};

export const transactions = [
  { 
    id: 1, 
    customer: "Jean Dupont", 
    email: "jean@email.com", 
    amount: 125.00, 
    status: "completed", 
    date: "2025-01-15" 
  },
  { 
    id: 2, 
    customer: "Marie Lambert", 
    email: "marie@email.com", 
    amount: 89.50, 
    status: "pending", 
    date: "2025-01-14" 
  },
  { 
    id: 3, 
    customer: "Pierre Martin", 
    email: "pierre@email.com", 
    amount: 234.00, 
    status: "completed", 
    date: "2025-01-14" 
  },
  { 
    id: 4, 
    customer: "Sophie Bernard", 
    email: "sophie@email.com", 
    amount: 56.00, 
    status: "failed", 
    date: "2025-01-13" 
  },
  { 
    id: 5, 
    customer: "Lucas Petit", 
    email: "lucas@email.com", 
    amount: 178.90, 
    status: "completed", 
    date: "2025-01-13" 
  }
];

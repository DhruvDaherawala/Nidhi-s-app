'use client';

import { useState, useEffect } from 'react';

interface Order {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Orders</h1>

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/30">
            <tr>
              <th className="p-4 font-bold text-muted-foreground">Order ID</th>
              <th className="p-4 font-bold text-muted-foreground">Customer</th>
              <th className="p-4 font-bold text-muted-foreground">Total</th>
              <th className="p-4 font-bold text-muted-foreground">Status</th>
              <th className="p-4 font-bold text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
               <tr><td colSpan={5} className="p-8 text-center">Loading...</td></tr>
            ) : orders.length === 0 ? (
               <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No orders found.</td></tr>
            ) : (
                orders.map((order) => (
                    <tr key={order._id} className="border-t border-border hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-mono text-sm">#{order._id.slice(-6)}</td>
                        <td className="p-4 font-medium">{order.customerName}</td>
                        <td className="p-4 font-bold text-primary">${order.totalAmount}</td>
                        <td className="p-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                             order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                             order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                             'bg-yellow-100 text-yellow-700'
                           }`}>
                             {order.status}
                           </span>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

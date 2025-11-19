// src/app/orders/page.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const orders = [
    {
      id: "1",
      type: "Buy",
      code: "GBB",
      amount: "US$1,000",
      status: "Pending",
      date: "20 May 2024",
    },
    {
      id: "2",
      type: "Buy",
      code: "SCR",
      amount: "US$5,000",
      status: "Completed",
      date: "21 Nov 2023",
    },
    // Add more real orders later
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-8">Orders</h1>

      {orders.length === 0 ? (
        // Empty state (optional – nice touch)
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No orders yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {order.type} Order — {order.code}
                  </CardTitle>
                  <Badge
                    variant={order.status === "Completed" ? "default" : "secondary"}
                    className={
                      order.status === "Completed"
                        ? "bg-green-600 text-white"
                        : "bg-amber-500/20 text-amber-700"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-semibold text-foreground">{order.amount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Order ID</p>
                    <p className="font-mono text-xs text-primary">#{order.id.padStart(6, "0")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
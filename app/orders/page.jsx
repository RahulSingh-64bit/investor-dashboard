"use client";

import { useState } from "react";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrderDetailsModal from "@/components/orders/OrderDetailsModal";
import CancelOrderDialog from "@/components/orders/CancelOrderDialog";
import { toast } from "sonner";
import SubscriptionTable from "@/components/orders/SubscriptionTable";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("subscription");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const handleCancelConfirm = () => {
    toast.success("Order cancelled successfully");
    setOrderToCancel(null);
  };

  return (
    <>
      <div className="w-full space-y-8 p-6">
        <OrdersHeader />

        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />

        <SubscriptionTable
          setSelectedOrder={setSelectedOrder}
          onCancelOrder={(payload) => setOrderToCancel(payload)}
        />

        <CancelOrderDialog
          order={orderToCancel?.order}
          onClose={() => setOrderToCancel(null)}
          onConfirm={() => orderToCancel?.cancelHandler?.()}
        />
      </div>
    </>
  );
}

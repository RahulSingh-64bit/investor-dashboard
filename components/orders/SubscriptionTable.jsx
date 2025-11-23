import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderRow from "./OrderRow";
import { toast } from "sonner";

export default function SubscriptionTable({ setSelectedOrder, onCancelOrder }) {
  const [subscriptionOrders, setSubscriptionOrders] = useState([
    {
      id: "1",
      creationDate: "1 Jul 2024, 15:09:14",
      status: "Confirmed",
      investorWallet: "0xc68cFcE839...63b",
      tokenPrice: "US$10.00",
      tokenPriceTime: "1 Jul 2024, 15:09:14",
      docuSignEnvelope: "-",
      txHash: "-",
      tokensAtCreation: "GBB 123",
      exchangeRateAtCreation: "US$1 = USDC 1.0001058388",
      netInvestmentAtCreation: "USDC 1,230.13601756724",
      feeAtCreation: "USDC 0",
      amountToPay: "USDC 1,230.13601756724",
      tokensAtConfirmation: "GBB 123",
      exchangeRateAtConfirmation: "US$1 = USDC 1.0001058388",
      netInvestmentAtConfirmation: "USDC 1,230.13601756724",
      feeAtConfirmation: "USDC 0",
      confirmedPayment: "USDC 1,230.13601756724",
    },
    {
      id: "2",
      creationDate: "1 Jul 2024, 15:08:51",
      status: "Pending",
      amountToPay: "USDC 600.00",
      tokensOrdered: "GBB 60",
      paymentReference: "73132979fca",
    },
    {
      id: "3",
      creationDate: "1 Jul 2024, 15:08:18",
      status: "Pending",
      amountToPay: "USDC 1,000.00",
      tokensOrdered: "GBB 60",
      paymentReference: "deb01e2dce",
    },
  ]);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleCancel = (orderToCancel) => {
    setSubscriptionOrders((prev) =>
      prev.map((o) =>
        o.id === orderToCancel.id
          ? { ...o, status: "Cancelled by investor" }
          : o
      )
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Actions</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount To Pay</TableHead>
            <TableHead>Tokens Ordered</TableHead>
            <TableHead>Confirmed Payment</TableHead>
            <TableHead>Tokens Confirmed</TableHead>
            <TableHead>Token Price</TableHead>
            <TableHead>Token Price Time</TableHead>
            <TableHead>Payment Reference</TableHead>
            <TableHead>TxHash</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptionOrders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onView={() => setSelectedOrder(order)}
              onCancel={() =>
                onCancelOrder({
                  order,
                  cancelHandler: () => handleCancel(order),
                })
              }
              copyToClipboard={copyToClipboard}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

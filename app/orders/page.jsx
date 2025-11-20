// app/orders/page.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, X, Copy, ShoppingBag, AlertCircle, Plus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("subscription");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const subscriptionOrders = [
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
  ];

  const redemptionOrders = [];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <div className="w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-2">Manage your subscription and redemption orders</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <TabsList className="grid w-full sm:w-auto grid-cols-2">
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Subscription orders</span>
                <span className="sm:hidden">Subscription</span>
              </TabsTrigger>
              <TabsTrigger value="redemption" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Redemption orders</span>
                <span className="sm:hidden">Redemption</span>
              </TabsTrigger>
            </TabsList>

            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create order
            </Button>
          </div>

          <TabsContent value="subscription" className="mt-0">
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
                    <TableHead>Payment Reference</TableHead>
                    <TableHead>TxHash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptionOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{order.creationDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            order.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {order.status || "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{order.amountToPay}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
                            {order.tokensOrdered?.[0] || "G"}
                          </div>
                          <span className="font-medium">{order.tokensOrdered || order.tokensAtCreation}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(order.tokensOrdered || order.tokensAtCreation)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.confirmedPayment || "-"}</TableCell>
                      <TableCell className="text-muted-foreground">{order.tokensConfirmed || "-"}</TableCell>
                      <TableCell>{order.tokenPrice || "-"}</TableCell>
                      <TableCell className="font-mono text-xs">{order.paymentReference || "-"}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">{order.txHash || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="redemption" className="mt-0">
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
                    <TableHead>Payment Reference</TableHead>
                    <TableHead>TxHash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redemptionOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-32 text-center text-muted-foreground">
                        No redemption orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    redemptionOrders.map((order) => (
                      <TableRow key={order.id}>
                        {/* same structure */}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ORDER DETAILS MODAL — ONLY ADDED THIS */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 lg:p-8 rounded-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">Order details</DialogTitle>
              <span className="text-sm text-muted-foreground">
                {selectedOrder?.creationDate}
              </span>
            </div>
          </DialogHeader>

          {selectedOrder && (
            <div className="mt-6 space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    {selectedOrder.status || "Confirmed"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Investor wallet</span>
                  <code className="font-mono text-sm bg-muted px-3 py-1 rounded">
                    {selectedOrder.investorWallet || "0xc68cFcE839...63b"}
                  </code>
                  <Button size="icon" variant="ghost" onClick={() => copyToClipboard(selectedOrder.investorWallet)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-5">
                  <div><span className="text-muted-foreground">Token price</span><p className="font-medium">{selectedOrder.tokenPrice || "-"}</p></div>
                  <div><span className="text-muted-foreground">Token price time</span><p className="font-medium">{selectedOrder.tokenPriceTime || "-"}</p></div>
                  <div><span className="text-muted-foreground">DocuSign envelope</span><p className="font-medium">{selectedOrder.docuSignEnvelope || "-"}</p></div>
                  <div><span className="text-muted-foreground">TxHash</span><p className="font-medium">{selectedOrder.txHash || "-"}</p></div>
                  <div><span className="text-muted-foreground">Number of tokens at order creation</span><p className="font-medium">{selectedOrder.tokensAtCreation || selectedOrder.tokensOrdered}</p></div>
                  <div><span className="text-muted-foreground">Exchange rate at order creation</span><p className="font-medium">{selectedOrder.exchangeRateAtCreation || "-"}</p></div>
                  <div><span className="text-muted-foreground">Net investment at order creation</span><p className="font-medium">{selectedOrder.netInvestmentAtCreation || "-"}</p></div>
                  <div><span className="text-muted-foreground">Fee at order creation</span><p className="font-medium">{selectedOrder.feeAtCreation || "USDC 0"}</p></div>
                  <div><span className="text-muted-foreground">Amount to pay</span><p className="font-medium">{selectedOrder.amountToPay}</p></div>
                </div>

                <div className="space-y-5">
                  <div><span className="text-muted-foreground">Number of tokens at confirmation</span><p className="font-medium">{selectedOrder.tokensAtConfirmation || selectedOrder.tokensOrdered}</p></div>
                  <div><span className="text-muted-foreground">Exchange rate at confirmation</span><p className="font-medium">{selectedOrder.exchangeRateAtConfirmation || "-"}</p></div>
                  <div><span className="text-muted-foreground">Net investment at confirmation</span><p className="font-medium">{selectedOrder.netInvestmentAtConfirmation || "-"}</p></div>
                  <div><span className="text-muted-foreground">Fee at confirmation</span><p className="font-medium">{selectedOrder.feeAtConfirmation || "USDC 0"}</p></div>
                  <div><span className="text-muted-foreground">Confirmed payment</span><p className="font-medium">{selectedOrder.confirmedPayment || "-"}</p></div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
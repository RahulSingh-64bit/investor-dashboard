import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy } from "lucide-react";
import { toast } from "sonner";

const copyToClipboard = (text) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
};

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 lg:p-8 rounded-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Order details</DialogTitle>
            <span className="text-sm text-muted-foreground">{order.creationDate}</span>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge className="bg-green-100 text-green-700">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                {order.status || "Confirmed"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Investor wallet</span>
              <code className="font-mono text-sm bg-muted px-3 py-1 rounded">
                {order.investorWallet || "0xc68cFcE839...63b"}
              </code>
              <Button size="icon" variant="ghost" onClick={() => copyToClipboard(order.investorWallet)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-5">
              <div><span className="text-muted-foreground">Token price</span><p className="font-medium">{order.tokenPrice || "-"}</p></div>
              <div><span className="text-muted-foreground">Token price time</span><p className="font-medium">{order.tokenPriceTime || "-"}</p></div>
              <div><span className="text-muted-foreground">DocuSign envelope</span><p className="font-medium">{order.docuSignEnvelope || "-"}</p></div>
              <div><span className="text-muted-foreground">TxHash</span><p className="font-medium">{order.txHash || "-"}</p></div>
              <div><span className="text-muted-foreground">Number of tokens at order creation</span><p className="font-medium">{order.tokensAtCreation || order.tokensOrdered}</p></div>
              <div><span className="text-muted-foreground">Exchange rate at order creation</span><p className="font-medium">{order.exchangeRateAtCreation || "-"}</p></div>
              <div><span className="text-muted-foreground">Net investment at order creation</span><p className="font-medium">{order.netInvestmentAtCreation || "-"}</p></div>
              <div><span className="text-muted-foreground">Fee at order creation</span><p className="font-medium">{order.feeAtCreation || "USDC 0"}</p></div>
              <div><span className="text-muted-foreground">Amount to pay</span><p className="font-medium">{order.amountToPay}</p></div>
            </div>

            <div className="space-y-5">
              <div><span className="text-muted-foreground">Number of tokens at confirmation</span><p className="font-medium">{order.tokensAtConfirmation || order.tokensOrdered}</p></div>
              <div><span className="text-muted-foreground">Exchange rate at confirmation</span><p className="font-medium">{order.exchangeRateAtConfirmation || "-"}</p></div>
              <div><span className="text-muted-foreground">Net investment at confirmation</span><p className="font-medium">{order.netInvestmentAtConfirmation || "-"}</p></div>
              <div><span className="text-muted-foreground">Fee at confirmation</span><p className="font-medium">{order.feeAtConfirmation || "USDC 0"}</p></div>
              <div><span className="text-muted-foreground">Confirmed payment</span><p className="font-medium">{order.confirmedPayment || "-"}</p></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
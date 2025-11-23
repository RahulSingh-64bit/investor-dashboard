import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, X, Copy } from "lucide-react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function OrderRow({ order, onView, onCancel, copyToClipboard }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onView}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {order.status === "Pending" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </TableCell>

      <TableCell className="text-sm">{order.creationDate}</TableCell>

      <TableCell>
        {order.status === "Confirmed" && (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        )}
        {order.status === "Pending" && (
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )}
        {order.status === "Cancelled by investor" && (
          <Badge variant="destructive" className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled by investor
          </Badge>
        )}
      </TableCell>

      <TableCell className="font-medium">{order.amountToPay}</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
            {order.tokensOrdered?.[0] || "G"}
          </div>
          <span className="font-medium">
            {order.tokensOrdered || order.tokensAtCreation}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() =>
              copyToClipboard(order.tokensOrdered || order.tokensAtCreation)
            }
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground">
        {order.confirmedPayment || "-"}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {order.tokensConfirmed || "-"}
      </TableCell>
      <TableCell>{order.tokenPrice || "-"}</TableCell>
      <TableCell className="text-muted-foreground">
        {order.tokenPriceTime || "-"}
      </TableCell>
      <TableCell className="font-mono text-xs">
        {order.paymentReference || "-"}
      </TableCell>
      <TableCell className="text-muted-foreground font-mono text-xs">
        {order.txHash || "-"}
      </TableCell>
    </TableRow>
  );
}

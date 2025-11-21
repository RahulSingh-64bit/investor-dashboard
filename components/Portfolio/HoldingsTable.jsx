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
import { Eye, Copy, Check, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";

import HoldingDetailsDialog from "./HoldingDetailsDialog";
import CreateOrderDialog from "./CreateOrderDialog";

export default function HoldingsTable({ holdings = [] }) {
  const [copiedId, setCopiedId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [orderHolding, setOrderHolding] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenDetails = (holding) => {
    setSelectedHolding(holding);
    setDetailsOpen(true);
  };

  const handleOpenOrder = (holding) => {
    setOrderHolding(holding);
    setOrderOpen(true);
  };

  if (holdings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No holdings yet. Start investing!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Actions</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Valuation Per Token</TableHead>
              <TableHead>Valuation</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead className="text-center">Block | Unblock</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {holdings.map((holding) => (
              <TableRow key={holding.id} className="h-16">
                {/* Actions */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => handleOpenDetails(holding)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="h-9 px-3 text-xs font-medium"
                      onClick={() => handleOpenOrder(holding)}
                    >
                      Invest
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 text-xs"
                      /* onClick={() => handleOpenOrder(holding)} */
                    >
                      Redeem
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 text-xs"
                      /* onClick={() => handleOpenOrder(holding)} */
                    >
                      Transfer
                    </Button>
                  </div>
                </TableCell>

                {/* Balance */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge className="font-mono text-xs font-bold">
                      {holding.code}
                    </Badge>
                    <span className="font-semibold tabular-nums">
                      {holding.balance}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        handleCopy(
                          `${holding.code} ${holding.balance}`,
                          `bal-${holding.id}`
                        )
                      }
                    >
                      {copiedId === `bal-${holding.id}` ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>

                {/* Valuation Per Token */}
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="tabular-nums">
                      {holding.valuationPerToken}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        handleCopy(
                          holding.valuationPerToken,
                          `vpt-${holding.id}`
                        )
                      }
                    >
                      {copiedId === `vpt-${holding.id}` ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>

                {/* Total Valuation */}
                <TableCell className="font-semibold text-primary">
                  <div className="flex items-center gap-2">
                    <span className="tabular-nums">{holding.valuation}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        handleCopy(holding.valuation, `val-${holding.id}`)
                      }
                    >
                      {copiedId === `val-${holding.id}` ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>

                {/* Type */}
                <TableCell>
                  <Badge variant="outline" className="font-medium">
                    {holding.type || "DEBT"}
                  </Badge>
                </TableCell>

                {/* Wallet Address */}
                <TableCell>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-primary">{holding.wallet}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        handleCopy(holding.wallet, `wallet-${holding.id}`)
                      }
                    >
                      {copiedId === `wallet-${holding.id}` ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>

                {/* Block / Unblock */}
                <TableCell>
                  <div className="flex justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-destructive" />
                      </div>
                      <span className="font-bold text-destructive tabular-nums">
                        {holding.blocked || 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <Unlock className="h-4 w-4 text-success" />
                      </div>
                      <span className="font-bold text-success tabular-nums">
                        {holding.unblocked || 100}
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      {selectedHolding && (
        <HoldingDetailsDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          holding={selectedHolding}
        />
      )}

      {orderHolding && (
        <CreateOrderDialog
          open={orderOpen}
          onOpenChange={setOrderOpen}
          holding={orderHolding}
        />
      )}
    </>
  );
}

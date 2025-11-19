// src/components/Portfolio/HoldingsTable.jsx
"use client"; // Required because of useState + toast

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HoldingDetailsDialog from "./HoldingDetailsDialog";



export default function HoldingsTable({ holdings }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const [detailsOpen, setDetailsOpen] = useState(false);        // ← ADD
  const [selectedHolding, setSelectedHolding] = useState(null); // ← ADD

  const handleOpenDetails = (holding) => {
    setSelectedHolding(holding);
    setDetailsOpen(true);
  };
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Actions</TableHead>
            <TableHead className="min-w-[120px]">Balance</TableHead>
            <TableHead className="min-w-[180px]">Valuation Per Token</TableHead>
            <TableHead className="min-w-[150px]">Valuation</TableHead>
            <TableHead className="min-w-[100px]">Type</TableHead>
            <TableHead className="min-w-[200px]">Wallet</TableHead>
            <TableHead className="min-w-[180px]">Block | Unblock</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {holdings.map((holding) => (
            <TableRow key={holding.id}>
              {/* Actions */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 " onClick={() => handleOpenDetails(holding)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="h-8">
                    Invest
                  </Button>
                </div>
              </TableCell>

              {selectedHolding && (
        <HoldingDetailsDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          holding={selectedHolding}
        />
      )}

              {/* Balance */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {holding.code}
                  </Badge>
                  <span className="font-medium">
                    {holding.balance}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCopy(`${holding.code} ${holding.balance}`, `balance-${holding.id}`)}
                  >
                    {copiedId === `balance-${holding.id}` ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </TableCell>

              {/* Valuation Per Token */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{holding.valuationPerToken}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCopy(holding.valuationPerToken, `valtoken-${holding.id}`)}
                  >
                    {copiedId === `valtoken-${holding.id}` ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </TableCell>

              {/* Valuation */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{holding.valuation}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCopy(holding.valuation, `val-${holding.id}`)}
                  >
                    {copiedId === `val-${holding.id}` ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </TableCell>

              {/* Type */}
              <TableCell>
                <Badge variant="outline">{holding.type}</Badge>
              </TableCell>

              {/* Wallet */}
              <TableCell>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-sm text-primary">{holding.wallet}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCopy(holding.wallet, `wallet-${holding.id}`)}
                  >
                    {copiedId === `wallet-${holding.id}` ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </TableCell>

              {/* Blocked / Unblocked */}
              <TableCell>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-5 h-5 rounded bg-destructive/10">
                      <span className="text-xs">Locked</span>
                    </div>
                    <span className="font-medium">{holding.blocked}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-5 h-5 rounded bg-green-500/10">
                      <span className="text-xs">Unlocked</span>
                    </div>
                    <span className="font-medium text-green-600">{holding.unblocked}</span>
                  </div>
                </div>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
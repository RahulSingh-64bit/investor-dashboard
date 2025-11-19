// src/components/Portfolio/TransactionsTable.jsx
"use client"; // Needed only if you ever add state/toast later (safe to keep)

import { Button } from "@/components/ui/button";
import { FileText, SlidersHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TransactionsTable({ transactions = [] }) {
  const isEmpty = transactions.length === 0;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {isEmpty ? (
        /* Empty State – looks gorgeous */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <FileText className="w-20 h-20 text-muted-foreground/30" strokeWidth={0.8} />
          <div className="max-w-md space-y-2">
            <p className="text-lg font-semibold text-foreground">
              No transactions yet
            </p>
            <p className="text-sm text-muted-foreground">
              You can find the record of each blockchain transaction here once they are initiated.
            </p>
          </div>
        </div>
      ) : (
        /* Real Table */
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Block/Unblock</TableHead>
                <TableHead>Tx Hash</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <span className={`font-medium ${
                      tx.status === "Success" ? "text-green-600" :
                      tx.status === "Pending" ? "text-amber-600" :
                      "text-muted-foreground"
                    }`}>
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {tx.from}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {tx.to}
                  </TableCell>
                  <TableCell className="font-medium">{tx.balance}</TableCell>
                  <TableCell>{tx.blockUnblock || "—"}</TableCell>
                  <TableCell className="font-mono text-xs">
                    <span className="text-primary">{tx.txHash}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <span className="text-lg">...</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
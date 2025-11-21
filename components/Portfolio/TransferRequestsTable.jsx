"use client";

import { useState } from "react";
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

export default function TransferRequestsTable({
  sentRequests = [],
  receivedRequests = [],
}) {
  const [activeSubTab, setActiveSubTab] = useState("sent");

  const currentRequests =
    activeSubTab === "sent" ? sentRequests : receivedRequests;
  const isEmpty = currentRequests.length === 0;

  return (
    <div className="space-y-6">
      {/* Sub-tabs: Sent / Received */}
      <div className="flex items-center gap-8 border-b border-border">
        <button
          onClick={() => setActiveSubTab("sent")}
          className={`relative pb-3 text-sm font-medium transition-colors whitespace-nowrap ${
            activeSubTab === "sent"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sent ({sentRequests.length})
          {activeSubTab === "sent" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab("received")}
          className={`relative pb-3 text-sm font-medium transition-colors whitespace-nowrap ${
            activeSubTab === "received"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Received ({receivedRequests.length})
          {activeSubTab === "received" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {isEmpty ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <FileText
            className="w-20 h-20 text-muted-foreground/30"
            strokeWidth={0.8}
          />
          <div className="max-w-sm space-y-3">
            <p className="text-lg font-semibold text-foreground">
              No transfer requests yet
            </p>
            <p className="text-sm text-muted-foreground">
              Click below to create a transfer request for this token
            </p>
          </div>
          <Button size="lg">Transfer tokens</Button>
        </div>
      ) : (
        /* Real Table */
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[130px]">Actions</TableHead>
                  <TableHead className="min-w-[110px]">Status</TableHead>
                  <TableHead className="min-w-[100px]">Type</TableHead>
                  <TableHead className="min-w-[140px]">Created At</TableHead>
                  <TableHead className="min-w-[140px]">Last Updated</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.actions}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          request.status === "Pending"
                            ? "text-amber-600"
                            : request.status === "Completed"
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell className="text-sm">
                      {request.createdAt}
                    </TableCell>
                    <TableCell className="text-sm">
                      {request.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span className="text-lg leading-none">...</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const redemptionOrders = [];

export default function RedemptionTable() {
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
            <TableHead>Payment Reference</TableHead>
            <TableHead>TxHash</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {redemptionOrders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={10}
                className="h-32 text-center text-muted-foreground"
              >
                No redemption orders found
              </TableCell>
            </TableRow>
          ) : (
            redemptionOrders.map((order) => (
              <TableRow key={order.id}></TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

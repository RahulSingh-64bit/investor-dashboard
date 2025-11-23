import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingBag } from "lucide-react";
import SubscriptionTable from "./SubscriptionTable";
import RedemptionTable from "./RedemptionTable";

export default function OrdersTabs({
  activeTab,
  setActiveTab,
  setSelectedOrder,
  setOrderToCancel,
}) {
  return (
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
        <SubscriptionTable
          setSelectedOrder={setSelectedOrder}
          setOrderToCancel={setOrderToCancel}
        />
      </TabsContent>

      <TabsContent value="redemption" className="mt-0">
        <RedemptionTable />
      </TabsContent>
    </Tabs>
  );
}
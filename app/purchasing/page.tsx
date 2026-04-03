import PurchaseOrderForm from "@/modules/purchasing/components/PurchaseOrderForm";
import PurchaseOrderList from "@/modules/purchasing/components/PurchaseOrderList";

export default function PurchasingPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">المشتريات</h1>
      <PurchaseOrderForm />
      <PurchaseOrderList />
    </div>
  );
}

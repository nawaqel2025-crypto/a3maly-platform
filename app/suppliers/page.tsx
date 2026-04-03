import SupplierList from "@/modules/suppliers/components/SupplierList";
import SupplierForm from "@/modules/suppliers/components/SupplierForm";

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">الموردين</h1>
      <SupplierForm />
      <SupplierList />
    </div>
  );
}
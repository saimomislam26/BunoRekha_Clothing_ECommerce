
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Package } from "lucide-react";
import ProductListTable from "./components/product-list-table";
import AddProductForm from "./components/add-product-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function AdminProductsPage() {
  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground flex items-center">
          <Package className="mr-3 h-8 w-8 text-primary" />
          Manage Products
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new product to your catalog.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
          <CardDescription>
            View, edit, or delete products from your catalog. (Table uses placeholder data)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductListTable />
        </CardContent>
      </Card>
    </div>
  );
}

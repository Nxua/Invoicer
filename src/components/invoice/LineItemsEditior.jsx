import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

export default function LineItemsEditor({ items, onChange }) {
  const addItem = () => {
    onChange([...items, { description: "", quantity: 1, unit_price: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const updated = items.map((item, i) => {
      if (i !== index) return item;
      const newItem = { ...item, [field]: value };
      if (field === "quantity" || field === "unit_price") {
        newItem.amount = (parseFloat(newItem.quantity) || 0) * (parseFloat(newItem.unit_price) || 0);
      }
      return newItem;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div className="col-span-5">Description</div>
        <div className="col-span-2">Qty</div>
        <div className="col-span-2">Unit Price</div>
        <div className="col-span-2">Amount</div>
        <div className="col-span-1"></div>
      </div>

      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 sm:p-0 rounded-lg sm:rounded-none bg-muted/50 sm:bg-transparent">
          <div className="sm:col-span-5">
            <label className="text-xs text-muted-foreground sm:hidden mb-1 block">Description</label>
            <Input
              placeholder="Item description"
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              className="bg-card"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-muted-foreground sm:hidden mb-1 block">Quantity</label>
            <Input
              type="number"
              min="0"
              step="1"
              placeholder="1"
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value) || 0)}
              className="bg-card"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-muted-foreground sm:hidden mb-1 block">Unit Price</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={item.unit_price}
              onChange={(e) => updateItem(index, "unit_price", parseFloat(e.target.value) || 0)}
              className="bg-card"
            />
          </div>
          <div className="sm:col-span-2 flex items-center">
            <label className="text-xs text-muted-foreground sm:hidden mb-1 block mr-2">Amount</label>
            <span className="text-sm font-medium tabular-nums">
              {(item.amount || 0).toFixed(2)}
            </span>
          </div>
          <div className="sm:col-span-1 flex items-center justify-end sm:justify-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={addItem} className="mt-2 gap-2">
        <Plus className="w-4 h-4" />
        Add Line Item
      </Button>
    </div>
  );
}
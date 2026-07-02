"use client";

import { useEffect, useState } from "react";

interface ProductionLine {
  id: number;
  line_name: string;
  category: string;
  cut_capacity: number;
  sew_capacity: number;
  finish_capacity: number;
  pack_capacity: number;
}

interface PlannerFormProps {
  onSubmit: (data: {
    productionLineId: number;
    styleName: string;
    quantity: number;
    productionStart: string;
    shipmentDate: string;
  }) => void;
}

export default function PlannerForm({ onSubmit }: PlannerFormProps) {
  const [productionLines, setProductionLines] = useState<ProductionLine[]>([]);

  const [selectedLineId, setSelectedLineId] = useState("");

  async function loadProductionLines() {
    try {
      const response = await fetch("/api/production-lines");

      const data = await response.json();

      setProductionLines(data);

      if (data.length > 0) {
        setSelectedLineId(data[0].id.toString());
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadProductionLines();
  }, []);

  const selectedLine = productionLines.find(
    (line) => line.id.toString() === selectedLineId,
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedLine) return;

    const form = new FormData(e.currentTarget);

    onSubmit({
      productionLineId: selectedLine.id,

      styleName: form.get("styleName") as string,

      quantity: Number(form.get("quantity")),

      productionStart: form.get("productionStart") as string,

      shipmentDate: form.get("shipmentDate") as string,
    });
  }

  return (
    <form className="plannerForm" onSubmit={handleSubmit}>
      <h2>Create Capacity Plan</h2>

      <div className="plannerGrid">
        <div>
          <h3>Production Details</h3>

          <label>Production Line</label>

          <select
            value={selectedLineId}
            onChange={(e) => setSelectedLineId(e.target.value)}
          >
            {productionLines.map((line) => (
              <option key={line.id} value={line.id}>
                {line.line_name}
              </option>
            ))}
          </select>

          <label>Category</label>

          <input value={selectedLine?.category || ""} readOnly />

          <label>Cut Capacity</label>

          <input value={selectedLine?.cut_capacity || ""} readOnly />

          <label>Sew Capacity</label>

          <input value={selectedLine?.sew_capacity || ""} readOnly />

          <label>Finish Capacity</label>

          <input value={selectedLine?.finish_capacity || ""} readOnly />

          <label>Pack Capacity</label>

          <input value={selectedLine?.pack_capacity || ""} readOnly />
        </div>

        <div>
          <h3>Order Details</h3>

          <label>Style Name</label>

          <input name="styleName" placeholder="Nike Tee" required />

          <label>Quantity</label>

          <input name="quantity" type="number" placeholder="12000" required />

          <label>Production Start</label>

          <input type="date" name="productionStart" required />

          <label>Shipment Date</label>

          <input type="date" name="shipmentDate" required />
        </div>
      </div>

      <button className="submitButton">Check Capacity</button>
    </form>
  );
}

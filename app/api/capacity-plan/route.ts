import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Fetch selected production line
    const { data: line, error: lineError } = await supabase
      .from("production_lines")
      .select("*")
      .eq("id", body.productionLineId)
      .single();

    if (lineError || !line) {
      return NextResponse.json(
        {
          error: "Production line not found",
        },
        {
          status: 404,
        },
      );
    }

    // ---------------------------------------------------
    // Find Bottleneck Department
    // ---------------------------------------------------

    const capacities = [
      line.cut_capacity,
      line.sew_capacity,
      line.finish_capacity,
      line.pack_capacity,
    ];

    const departments = ["Cut", "Sew", "Finish", "Pack"];

    const effectiveCapacity = Math.min(...capacities);

    const bottleneck = departments[capacities.indexOf(effectiveCapacity)];

    // ---------------------------------------------------
    // Calculate Required Days
    // ---------------------------------------------------

    const requiredDays = Math.ceil(body.quantity / effectiveCapacity);

    // ---------------------------------------------------
    // Calculate Completion Date
    // ---------------------------------------------------

    const completionDate = new Date(body.productionStart);

    completionDate.setDate(completionDate.getDate() + requiredDays);

    // ---------------------------------------------------
    // Shipment Date
    // ---------------------------------------------------

    const shipmentDate = new Date(body.shipmentDate);

    // ---------------------------------------------------
    // Determine Status
    // ---------------------------------------------------

    const status = completionDate <= shipmentDate ? "AVAILABLE" : "FULL";

    // ---------------------------------------------------
    // Spillover Calculation
    // ---------------------------------------------------

    const spilloverDays =
      status === "FULL"
        ? Math.ceil(
            (completionDate.getTime() - shipmentDate.getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : 0;

    // ---------------------------------------------------
    // Recommendation
    // ---------------------------------------------------

    const recommendation =
      status === "AVAILABLE"
        ? "This order can be accommodated within the selected production line and completed before the shipment date."
        : "This order will spill over beyond the shipment date. Consider selecting another production line or changing the production schedule.";

    // ---------------------------------------------------
    // Save Production Plan
    // ---------------------------------------------------

    const { error: insertError } = await supabase
      .from("production_plans")
      .insert({
        production_line_id: body.productionLineId,

        style_name: body.styleName,

        quantity: body.quantity,

        production_start: body.productionStart,

        shipment_date: body.shipmentDate,

        required_days: requiredDays,

        completion_date: completionDate.toISOString().split("T")[0],

        bottleneck,

        status,
      });

    if (insertError) {
      return NextResponse.json(
        {
          error: insertError.message,
        },
        {
          status: 500,
        },
      );
    }

    // ---------------------------------------------------
    // Return Response
    // ---------------------------------------------------

    return NextResponse.json({
      productionLine: line.line_name,

      category: line.category,

      cut: line.cut_capacity,

      sew: line.sew_capacity,

      finish: line.finish_capacity,

      pack: line.pack_capacity,

      quantity: body.quantity,

      capacity: effectiveCapacity,

      bottleneck,

      days: requiredDays,

      completion: completionDate.toLocaleDateString(),

      shipment: shipmentDate.toLocaleDateString(),

      status,

      spilloverDays,

      recommendation,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

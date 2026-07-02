interface Result {
  productionLine: string;
  category: string;
  quantity: number;
  capacity: number;
  bottleneck: string;
  days: number;
  completion: string;
  shipment: string;
  status: string;
  cut: number;
  sew: number;
  finish: number;
  pack: number;
}

type Props = {
  result: Result | null;
};

export default function ResultCard({ result }: Props) {
  if (!result) return null;

  return (
    <section className="resultCard">
      <h2>Capacity Planning Result</h2>

      <div
        className={result.status === "AVAILABLE" ? "statusGreen" : "statusRed"}
      >
        {result.status}
      </div>

      <div className="resultGrid">
        <div className="resultBox">
          <small>Production Line</small>
          <h3>{result.productionLine}</h3>
        </div>

        <div className="resultBox">
          <small>Category</small>
          <h3>{result.category}</h3>
        </div>

        <div className="resultBox">
          <small>Effective Capacity</small>
          <h3>{result.capacity}</h3>
          <p>pcs/day</p>
        </div>

        <div className="resultBox">
          <small>Quantity</small>
          <h3>{result.quantity}</h3>
        </div>

        <div className="resultBox">
          <small>Required Days</small>
          <h3>{result.days}</h3>
        </div>

        <div className="resultBox">
          <small>Completion Date</small>
          <h3>{result.completion}</h3>
        </div>

        <div className="resultBox">
          <small>Shipment Date</small>
          <h3>{result.shipment}</h3>
        </div>

        <div className="resultBox">
          <small>Bottleneck</small>
          <h3>{result.bottleneck}</h3>
        </div>
      </div>

      <h3 style={{ marginTop: "35px" }}>Department Capacity</h3>

      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Capacity (pcs/day)</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Cut</td>
            <td>{result.cut}</td>
          </tr>

          <tr>
            <td>Sew</td>
            <td>{result.sew}</td>
          </tr>

          <tr>
            <td>Finish</td>
            <td>{result.finish}</td>
          </tr>

          <tr>
            <td>Pack</td>
            <td>{result.pack}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

type Result = {
  status: string;
  productionLine: string;
  quantity: number;
  completion: string;
  shipment: string;
  spilloverDays: number;
  recommendation: string;
};

type Props = {
  open: boolean;
  result: Result | null;
  onClose: () => void;
};

export default function SuccessPopup({ open, result, onClose }: Props) {
  if (!open || !result) return null;

  const available = result.status === "AVAILABLE";

  return (
    <div className="popupOverlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>
          ✖
        </button>

        <div className={available ? "popupIconSuccess" : "popupIconError"}>
          {available ? "✅" : "⚠️"}
        </div>

        <h2
          style={{
            color: available ? "#16a34a" : "#dc2626",
            marginBottom: "10px",
          }}
        >
          {available ? "Order Accepted" : "Capacity Alert"}
        </h2>

        <p>{result.recommendation}</p>

        <table
          style={{
            marginTop: "20px",
          }}
        >
          <tbody>
            <tr>
              <td>
                <b>Production Line</b>
              </td>

              <td>{result.productionLine}</td>
            </tr>

            <tr>
              <td>
                <b>Quantity</b>
              </td>

              <td>{result.quantity}</td>
            </tr>

            <tr>
              <td>
                <b>Completion</b>
              </td>

              <td>{result.completion}</td>
            </tr>

            <tr>
              <td>
                <b>Shipment</b>
              </td>

              <td>{result.shipment}</td>
            </tr>

            {!available && (
              <tr>
                <td>
                  <b>Delay</b>
                </td>

                <td>{result.spilloverDays} Days</td>
              </tr>
            )}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            background: available ? "#ecfdf5" : "#fef2f2",
            borderRadius: "10px",
          }}
        >
          <strong>Recommendation</strong>

          <p>{result.recommendation}</p>
        </div>

        <button className="continueButton" onClick={onClose}>
          View Result →
        </button>
      </div>
    </div>
  );
}

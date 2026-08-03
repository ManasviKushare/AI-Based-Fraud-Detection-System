export async function showFraudNotification(
  prediction,
  merchant,
  risk
) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission === "granted") {
    new Notification(
      prediction === "Fraud"
        ? "🚨 Fraud Detected"
        : "✅ Genuine Transaction",
      {
        body:
          `Merchant: ${merchant}\n` +
          `Risk Score: ${risk}%`,
        icon: "/favicon.ico",
      }
    );
  }
}
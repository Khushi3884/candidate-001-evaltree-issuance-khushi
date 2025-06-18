// Simulated User ID
const userId = "user123";

// Select all buy buttons
document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", async () => {
    alert("Simulating Stripe Checkout...");

    // 1. Enroll user
    await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, platform: "Alatree" }),
    }).then(res => console.log("Enrolled:", res.status));

    // 2. Simulate collectible purchase
    await fetch("/api/createCollectible", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: `collectible-${Date.now()}`,
        edition: "Only 50 Available"
      }),
    }).then(res => console.log("Collectible Created:", res.status));

    // 3. Award raffle ticket
    await fetch("/api/raffle-award", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }).then(res => console.log("Raffle Ticket Awarded:", res.status));

    // 4. Fetch raffle status
    await fetch(`/api/raffle-status?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Raffle Ticket Count:", data.ticketCount);
        alert(`You now have ${data.ticketCount || 'a new'} raffle ticket!`);
      })
      .catch(err => {
        console.log("Raffle status failed (mock):", err);
      });
  });
});

// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

document.getElementById("register").addEventListener("click", async () => {
  try {
    const publicKey = {
      challenge: new Uint8Array(32), // normally from server
      rp: { name: "Passkey PWA Demo" },
      user: {
        id: new Uint8Array(16),
        name: "user@example.com",
        displayName: "Demo User"
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      authenticatorSelection: { userVerification: "preferred" }
    };

    const credential = await navigator.credentials.create({ publicKey });
    console.log("Registered credential:", credential);
    alert("Passkey registered!");
  } catch (err) {
    console.error(err);
    alert("Registration failed: " + err);
  }
});

document.getElementById("login").addEventListener("click", async () => {
  try {
    const publicKey = {
      challenge: new Uint8Array(32), // normally from server
      allowCredentials: [],
      userVerification: "preferred"
    };

    const assertion = await navigator.credentials.get({ publicKey });
    console.log("Authentication assertion:", assertion);
    alert("Logged in with passkey!");
  } catch (err) {
    console.error(err);
    alert("Login failed: " + err);
  }
});

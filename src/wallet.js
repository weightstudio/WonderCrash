(function () {
  const walletKey = "weightplayWallet";

  function read() {
    try {
      const wallet = JSON.parse(localStorage.getItem(walletKey) || "{}");
      return { diamonds: Math.max(0, Number(wallet.diamonds) || 0) };
    } catch {
      return { diamonds: 0 };
    }
  }

  function save(wallet) {
    localStorage.setItem(walletKey, JSON.stringify({ diamonds: Math.max(0, Number(wallet.diamonds) || 0) }));
  }

  function addDiamonds(amount) {
    const wallet = read();
    wallet.diamonds += Math.max(0, Number(amount) || 0);
    save(wallet);
    return wallet;
  }

  function spendDiamonds(amount) {
    const cost = Math.max(0, Number(amount) || 0);
    const wallet = read();
    if (wallet.diamonds < cost) return false;
    wallet.diamonds -= cost;
    save(wallet);
    return true;
  }

  window.WeightPlayWallet = {
    key: walletKey,
    read,
    save,
    addDiamonds,
    spendDiamonds,
  };
})();

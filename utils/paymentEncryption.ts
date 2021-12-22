const encryption = (payment_method: any) => {
  if (payment_method) {
    const keyList = Object.keys(payment_method);
    const encryptionPaymentMethod: any = Object.values(payment_method).reduce(
      (acc: any, cur: any, idx) => ({
        ...acc,
        [keyList[idx]]: {
          cardname: cur.cardname,
          year: cur.year,
          lastdigits: keyList[idx],
        },
      }),
      {}
    );
    return { encryptionPaymentMethod };
  } else {
    const encryptionPaymentMethod = null;
    return { encryptionPaymentMethod };
  }
};

export default encryption;

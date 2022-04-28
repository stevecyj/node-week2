function handleLocal(v) {
  const d = new Date(v || Date.now());
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset()).toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
  });
  return d.toISOString();
}

module.exports = handleLocal;

const getDevices = (devices = []) => {
  const fetchDevices: [] = [];

  devices.forEach(({ devicesESP = [] }) => {
    devicesESP.forEach((esp) => {
      fetchDevices.push(esp);
    });
  });

  return fetchDevices;
};

export default getDevices;

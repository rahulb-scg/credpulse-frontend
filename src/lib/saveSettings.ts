async function saveBasic(filePath: File, portfolio: string) {
  const data = new FormData();
  data.set("OrgName", "genese");
  data.set("OrgDomain", "genese");
  data.set("WorkDir", filePath);
  data.set("PortfolioName", portfolio);

  const params = new URLSearchParams({ type: "basic" });

  const res = await fetch(`/api/upload?${params}`, {
    method: "post",
    body: data,
  });

  const message = await res.json();

  return { ok: res.ok, message: message };
}

async function saveSources(
  dbHost: string,
  username: string,
  password: string,
  frequency: number,
  model: string,
  macro: File,
) {
  const data = new FormData();
  data.set("OrgName", "genese");
  data.set("OrgDomain", "genese");
  data.set("Model", model);
  data.set("Username", username);
  data.set("Password", password);
  data.set("MacroScenario", macro);
  data.set("DatabaseHostName", dbHost);
  data.set("Frequency", frequency.toString());

  const params = new URLSearchParams({ type: "sources" });

  const res = await fetch(`/api/upload?${params}`, {
    method: "post",
    body: data,
  });

  return { ok: res.ok, message: await res.json() };
}

export { saveBasic, saveSources };

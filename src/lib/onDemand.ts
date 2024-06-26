export default async function runOnDemand(
  macros: File,
  portfolio: File,
  asOfDate: string,
  selectedModel: string,
) {
  const data = new FormData();
  data.set("OrgName", "genese");
  data.set("OrgDomain", "genese");
  data.set("model", selectedModel);
  data.set("as_of_date", asOfDate);
  data.set("MacroScenario", macros);
  data.set("PortfolioTape", portfolio);

  const params = new URLSearchParams({ type: "on-demand" });

  const res = await fetch(`/api/upload?${params}`, {
    method: "post",
    body: data,
  });

  return { ok: res.ok, message: await res.json() };
}

"use client";

import { useState } from "react";
import InputSources from "./inputSources";
import BasicInformation from "./basicInfo";
import DashboardContainer from "@/components/layout/dashboard-container";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const [selected, setSelected] = useState<"BasicInformation" | "InputSources">(
    "BasicInformation",
  );

  return (
    <DashboardContainer
      title="Setting"
      description="Mange your information"
      breadCrumbs={[{ title: "Settings", link: "dashboard/settings" }]}
    >
      <Separator />
      <div className="flex h-full w-full flex-row">
        <nav className="flex w-1/5 flex-col space-y-4">
          <p
            className={
              (selected == "BasicInformation"
                ? "bg-primary text-white"
                : "hover:bg-slate-500") +
              " w-3/4 rounded-lg px-4 hover:cursor-pointer hover:text-white"
            }
            onClick={() => setSelected("BasicInformation")}
          >
            Basic Information
          </p>
          <p
            className={
              (selected == "InputSources"
                ? "bg-primary text-white"
                : "hover:bg-slate-500") +
              " w-3/4 rounded-lg px-4 hover:cursor-pointer hover:text-white"
            }
            onClick={() => setSelected("InputSources")}
          >
            Input Sources
          </p>
        </nav>
        <div className="flex flex-1 flex-col">
          {selected == "BasicInformation" ? (
            <BasicInformation />
          ) : (
            <InputSources />
          )}
        </div>
      </div>
    </DashboardContainer>
  );
}

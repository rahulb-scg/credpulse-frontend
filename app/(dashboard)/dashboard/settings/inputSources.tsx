import Dropdown from "@/components/Dropdown";
import FileInput from "@/components/FileInput";
import InputField from "@/components/InputField";
import { saveSources } from "@/lib/saveSettings";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import useNotification from "antd/es/notification/useNotification";

export default function InputSources() {
  const [dbHost, setDbHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [frequency, setFrequency] = useState(1);
  const [macroFile, setMacroFile] = useState<File | undefined>(undefined);

  // const [notification, contextHolder] = useNotification();

  const models = ["Model_1", "Model_2", "Model_3"];
  const [selectedModel, setSelectedModel] = useState(models[1]);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // form validation
    if (!macroFile) return;

    const { ok, message } = await saveSources(
      dbHost,
      username,
      password,
      frequency,
      selectedModel,
      macroFile,
    );

    // notification.open({
    //   type: ok ? "success" : "error",
    //   placement: "top",
    //   message: message,
    // });
  };

  return (
    <div className="space-y-4">
      {/* {contextHolder} */}
      <div>
        <p className="font-bold">Portfolio Tape</p>
        <div className="grid grid-cols-2 gap-2 align-baseline">
          <InputField
            type="text"
            value={dbHost}
            placeholder="DB Hostname"
            onChange={(e) => setDbHost(e.target.value)}
          />
          <div></div>
          <InputField
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="font-bold">Macro Scenarios</p>
        <FileInput
          placeholder="Local File Path"
          file={macroFile}
          setFile={setMacroFile}
        />
      </div>
      <div>
        <p className="font-bold">Frequency</p>
        <InputField
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(parseInt(e.target.value))}
        />
      </div>
      <div className="w-1/3">
        <p className="font-bold">Model</p>
        <Dropdown
          name="model"
          options={models}
          selected={selectedModel}
          setSelected={setSelectedModel}
        />
      </div>
      <div>
        <div className="flex flex-row items-center space-x-2">
          <input type="checkbox" />
          <p>Send email notification</p>
          <Button
            name="Add Email"
            className="w-1/5 border-2 border-primary"
            onClick={() => alert("Add Email clicked")}
          >
            Add Email
          </Button>
        </div>
        <div className="flex flex-row space-x-2">
          <input type="checkbox" />
          <p>Generate PDF</p>
        </div>
      </div>
      <div>
        <Button
          className="hover:bg-darkblue w-1/5 bg-primary text-white"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

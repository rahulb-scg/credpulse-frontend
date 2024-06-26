import { useState } from "react";
import { saveBasic } from "@/lib/saveSettings";
import FileInput from "@/components/FileInput";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
// import useNotification from "antd/es/notification/useNotification";

export default function BasicInformation() {
  const [filePath, setFilePath] = useState<File>();
  const [portfolio, setPortfolio] = useState("");
  // const [notification, contextHolder] = useNotification();

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // form validation
    if (!filePath || !portfolio) return;

    const { ok, message } = await saveBasic(filePath, portfolio);

    // notification.open({
    //   type: ok ? "success" : "error",
    //   placement: "top",
    //   message: message,
    // });
  };

  return (
    <>
      {/* {contextHolder} */}
      <div>
        <p className="font-bold">Change working directory</p>
        <FileInput
          placeholder="Local File Path"
          file={filePath}
          setFile={setFilePath}
        />
      </div>
      <div>
        <p className="font-bold">Portfolio Name</p>
        <InputField
          type="text"
          value={portfolio}
          placeholder="Name"
          onChange={(e) => setPortfolio(e.target.value)}
        />
      </div>

      <Button
        className="hover:bg-darkblue w-24 bg-primary text-white"
        onClick={handleSave}
      >
        Save
      </Button>
    </>
  );
}

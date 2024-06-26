import { ReactNode, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type DataTabsItemType = {
  title: string;
  key: string;
  component: ReactNode;
  isVisible?: boolean;
};

export interface DataTabsProps {
  tabs: DataTabsItemType[];
  className?: string;
}

export const DataTabs = ({ tabs, className }: DataTabsProps) => {
  const filterTabs = useMemo(
    () => tabs?.filter((tab) => tab?.isVisible !== false),
    [tabs],
  );
  return (
    <Tabs defaultValue={filterTabs[0]?.key} className={className}>
      <TabsList>
        {filterTabs?.map((tab) => {
          return (
            <TabsTrigger key={tab?.key} value={tab?.key}>
              {tab?.title}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {filterTabs?.map((tab) => {
        return (
          <TabsContent key={tab?.key} value={tab?.key}>
            {tab?.component}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

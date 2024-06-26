import { FC, ReactNode } from "react";

type WidgetProps = {
  children?: ReactNode;
  className?: string;
  title?: string | ReactNode;
  controls?: ReactNode;
  contentClassName?: string;
};

const Widget: FC<WidgetProps> = ({
  children,
  className,
  controls,
  title,
  contentClassName,
}) => {
  return (
    <div className={`flex flex-1 border border-black/20 bg-white ${className}`}>
      <div className={`flex w-full flex-1 flex-col ${contentClassName}`}>
        {(title || controls) && (
          <div
            className={`px-widgetx pt-widgety mb-4 flex items-center gap-4 ${
              !children && "pb-2"
            }`}
          >
            <h2 className="flex-1 text-2xl">{title}</h2>
            {controls}
          </div>
        )}
        {children && (
          <div className="px-widgetx pb-widgety h-full w-full">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Widget;

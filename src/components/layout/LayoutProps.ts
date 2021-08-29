import { ReactElement } from "react";

export type LayoutProps = {
  bg_color: string;
  closeButton: { show: boolean; background: string };
  Content: ReactElement;
};

import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return <>{children}</>;
}


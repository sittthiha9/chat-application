import React from "react";

type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const ItemsList = ({ children, title, action }: Props) => {
  return (
    <div className="h-full w-full lg:flex-none lg:w-96 p-2 border-r-[1px] border-gray-300">
      <h1 className="px-2 mt-2 text-2xl font-semibold">{title}</h1>
      {action ? action : null}
      {children}
    </div>
  );
};

export default ItemsList;

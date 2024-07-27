import { MouseEvent, MouseEventHandler } from "react";

import { useOpen } from "@hooks/useOpen";

import { CategoryDrawer } from "@features/Drawers";
import Components from "./components";

type Props = {
  data: Store.Category | Omit<Store.Category, Store.OmittedDateFields>;
  style?: React.CSSProperties;
  noClick?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | ((e: unknown) => void);
};

export function Category({ noClick, data, style, selected, onClick }: Props) {
  const [isOpened, onOpen, onClose] = useOpen();

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (noClick) return;

    if (onClick || typeof onClick === "function") {
      return onClick(e);
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Category.Card
        color={data.color}
        selected={selected}
        type={data.type}
        onClick={onClickHandler}
        style={style}
        deleted={data.deleted}
      >
        <Category.Icon deleted={data.deleted} icon={data.icon} />
        <Category.Info name={data.name} />
      </Category.Card>
      <CategoryDrawer
        is={isOpened}
        onClose={onClose}
        data={data as Store.Category}
      />
    </>
  );
}

Category.Icon = Components.CategoryIcon;
Category.Info = Components.CategoryInfo;
Category.Card = Components.CategoryCard;

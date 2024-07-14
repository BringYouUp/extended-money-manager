import { Flex } from "@components";
import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}
export function FormItems({ style, className, children, ...rest }: Props) {
  return (
    <Flex w100 column gap={20} style={style} className={className} {...rest}>
      {children}
    </Flex>
  );
}

import { Flex, Label, Text, Unwrap } from "@ui";
import { cn } from "@utils/styles";

import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor?: string | undefined;
  error?: string | undefined;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  visible?: boolean;
  RightLabelComponent?: ReactNode;
}
export function FormItem({
  error,
  htmlFor,
  label,
  style,
  className,
  children,
  visible = true,
  RightLabelComponent,
  ...rest
}: Props) {
  return (
    <Flex
      w100
      column
      gap={6}
      style={style}
      className={cn(className, {
        none: !visible,
      })}
      {...rest}
    >
      <Flex w100 justifyBetween alignCenter>
        <Label htmlFor={htmlFor}>{label}</Label>
        {RightLabelComponent && RightLabelComponent}
      </Flex>
      {children}
      <Unwrap visible={Boolean(error)} negativeOffset="6px">
        <Text size={11} color="var(--text-color-error)">
          {error}
        </Text>
      </Unwrap>
    </Flex>
  );
}

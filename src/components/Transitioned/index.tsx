import { TransitionedComponentStates } from "@models";
import { cn } from "@utils";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";

export type TransitionedPropsClasses = {
  default: string;
  enter: string;
  exit: string;
};

export type TransitionedProps = {
  is: boolean;
  classes: TransitionedPropsClasses;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

export const Transitioned: React.FC<TransitionedProps> = ({
  is,
  style,
  classes,
  className = "",
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TransitionedComponentStates>("default");

  const onTransitionHandle = () => {
    switch (state) {
      case "enter":
        ref.current && ref.current.style.removeProperty("visibility");
        setState("entered");
        break;
      case "exit":
        ref.current && ref.current.setAttribute("class", classes.default);
        setState("default");

        // typeof onExit === "function" && onExit();
        break;
    }
  };

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("transitionend", onTransitionHandle);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("transitionend", onTransitionHandle);
      }
    };
  }, [state]);

  useLayoutEffect(() => {
    switch (state) {
      case "enter":
        if (ref.current && !ref.current.classList.contains(classes.enter)) {
          ref.current.style.visibility = "visible";
          setTimeout(() => {
            ref.current && ref.current.classList.add(classes.enter);
          }, 100);
        }
        break;
      case "exit":
        if (ref.current && !ref.current.classList.contains(classes.exit)) {
          setTimeout(() => {
            ref.current && ref.current.classList.add(classes.exit);
          }, 0);
        }
        break;
    }
  }, [state]);

  useLayoutEffect(() => {
    if (is && state === "default") {
      setState("enter");
    }

    if (!is && state === "entered") {
      setState("exit");
    }
  }, [is, state]);

  return (
    (is || state !== "default") && (
      <div
        style={
          {
            visibility: "hidden",
            ...style,
          } as React.CSSProperties
        }
        ref={ref}
        className={cn(className, {
          [classes.default]: state !== "default",
        })}
      >
        {children}
      </div>
    )
  );
};

import { cn } from "@utils";
import styles from "./index.module.css";
import { Flex, Spinner } from "@components";

export const SuspenseLoader = () => {
  return (
    <div className={cn(styles.suspense)}>
      <Flex full center>
        <Spinner color="var(--text-color-white-90)" size={48} />
      </Flex>
    </div>
  );
};

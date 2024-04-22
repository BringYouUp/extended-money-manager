import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Offset,
  Scrollable,
  Text,
} from "@components";
import { PATHS } from "@consts";
import { useAppSelector, useOpen } from "@hooks";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SIDEBAR_PATHS_TITLES_MAP = {
  [PATHS.ROOT]: "home",
  [PATHS.ACCOUNTS]: "accounts",
  [PATHS.CATEGORIES]: "categories",
  [PATHS.TRANSACTIONS]: "transactions",
  [PATHS.SETTINGS]: "settings",
};

const SIDEBAR_PATHS_ICONS_MAP = {
  [PATHS.ROOT]: "home",
  [PATHS.ACCOUNTS]: "bank-card",
  [PATHS.CATEGORIES]: "category",
  [PATHS.TRANSACTIONS]: "list",
  [PATHS.SETTINGS]: "settings",
};

const SIDEBAR_PATHS = [
  PATHS.ROOT,
  PATHS.ACCOUNTS,
  PATHS.CATEGORIES,
  PATHS.TRANSACTIONS,
  // PATHS.SETTINGS,
];

export const Sidebar: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const [isOpened, onOpen, onClose] = useOpen();

  useEffect(() => {
    return () => {
      if (isOpened) {
        onClose();
      }
    };
  }, [location.pathname]);

  return (
    <>
      <Container h100>
        <Scrollable full hidden>
          <Scrollable overlay>
            <Offset padding={[24]}>
              <Flex column gap={24}>
                <Button onClick={onOpen} theme="transparent" rounded>
                  <Icon size={24} name="browse" />
                </Button>
                {SIDEBAR_PATHS.map((path) => {
                  return (
                    <NavLink key={path} to={path}>
                      <Button
                        active={location.pathname === path}
                        theme="transparent"
                        rounded
                      >
                        <Icon size={24} name={SIDEBAR_PATHS_ICONS_MAP[path]} />
                      </Button>
                    </NavLink>
                  );
                })}
              </Flex>
            </Offset>
          </Scrollable>
        </Scrollable>
      </Container>
      <Drawer side="left" isOpened={Boolean(isOpened)} onClose={onClose}>
        <Container h100 background="var(--soft-background-color)" width="300px">
          <Offset h100 padding={[24, 16]}>
            <Flex column gap={24}>
              <Flex alignCenter gap={8}>
                <Icon size={24} name="user" />
                <Text ellipsed as="h4" size={16}>
                  Hi, {user.displayName}
                </Text>
              </Flex>
              {SIDEBAR_PATHS.map((path) => {
                return (
                  <NavLink to={path}>
                    <Button
                      centered={false}
                      style={{ width: "100%" }}
                      active={location.pathname === path}
                      theme="transparent"
                    >
                      <Icon size={24} name={SIDEBAR_PATHS_ICONS_MAP[path]} />
                      <Text uppercase>{SIDEBAR_PATHS_TITLES_MAP[path]}</Text>
                    </Button>
                  </NavLink>
                );
              })}
            </Flex>
          </Offset>
        </Container>
      </Drawer>
    </>
  );
};

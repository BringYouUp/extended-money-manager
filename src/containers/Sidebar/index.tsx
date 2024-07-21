import { userLogOut } from "@async-actions";
import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Offset,
  Scrollable,
} from "@components";
import { PATHS } from "@consts";
import { useAppDispatch, useAppSelector, useOpen } from "@hooks";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Components from "./components";

const SIDEBAR_PATHS_TITLES_MAP = {
  [PATHS.ROOT]: "home",
  [PATHS.ACCOUNTS]: "accounts",
  [PATHS.CATEGORIES]: "categories",
  [PATHS.TRANSACTIONS]: "transactions",
  [PATHS.SETTINGS]: "settings",
  [`${PATHS.AUTH}${PATHS.LOGIN}`]: "logout",
};

const SIDEBAR_PATHS_ICONS_MAP = {
  [PATHS.ROOT]: "home",
  [PATHS.ACCOUNTS]: "bank-card",
  [PATHS.CATEGORIES]: "category",
  [PATHS.TRANSACTIONS]: "list",
  [PATHS.SETTINGS]: "settings",
  [`${PATHS.AUTH}${PATHS.LOGIN}`]: "logout",
};

const SIDEBAR_PATHS = [
  PATHS.ROOT,
  PATHS.ACCOUNTS,
  PATHS.CATEGORIES,
  PATHS.TRANSACTIONS,
  // PATHS.SETTINGS,
];

export function Sidebar() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const [isOpened, onOpen, onClose] = useOpen();

  const onLogout = () => dispatch(userLogOut());

  useEffect(() => {
    return () => {
      if (isOpened) {
        onClose();
      }
    };
  }, [isOpened, location.pathname]);

  return (
    <>
      <Container h100>
        <Scrollable full hidden>
          <Scrollable full overlay>
            <Offset h100 padding={[24]}>
              <Flex h100 column gap={24}>
                <Button onClick={onOpen} theme="transparent" rounded>
                  <Icon size={24} name="browse" />
                </Button>
                {SIDEBAR_PATHS.map((path) => (
                  <Sidebar.Link key={path} path={path}>
                    <Sidebar.Button
                      rounded={true}
                      active={location.pathname === path}
                    >
                      <Sidebar.Icon name={SIDEBAR_PATHS_ICONS_MAP[path]} />
                    </Sidebar.Button>
                  </Sidebar.Link>
                ))}
                <Sidebar.Button
                  onClick={onLogout}
                  rounded={true}
                  style={{ marginTop: "auto" }}
                >
                  <Sidebar.Icon
                    name={
                      SIDEBAR_PATHS_ICONS_MAP[`${PATHS.AUTH}${PATHS.LOGIN}`]
                    }
                  />
                </Sidebar.Button>
              </Flex>
            </Offset>
          </Scrollable>
        </Scrollable>
      </Container>
      <Drawer side="left" isOpened={Boolean(isOpened)} onClose={onClose}>
        <Drawer.Container>
          <Scrollable full hidden>
            <Scrollable full overlay>
              <Drawer.Content>
                <Flex h100 column gap={24}>
                  <Flex alignCenter gap={8}>
                    <Icon size={24} name="user" />
                    <Drawer.Title uppercase={false}>
                      Hi, {user.displayName}
                    </Drawer.Title>
                  </Flex>
                  {SIDEBAR_PATHS.map((path) => (
                    <Sidebar.Link key={path} path={path}>
                      <Sidebar.Button active={location.pathname === path}>
                        <Sidebar.Icon name={SIDEBAR_PATHS_ICONS_MAP[path]} />
                        <Sidebar.Label>
                          {SIDEBAR_PATHS_TITLES_MAP[path]}
                        </Sidebar.Label>
                      </Sidebar.Button>
                    </Sidebar.Link>
                  ))}

                  <Sidebar.Button
                    onClick={onLogout}
                    style={{ marginTop: "auto" }}
                  >
                    <Sidebar.Icon
                      name={
                        SIDEBAR_PATHS_ICONS_MAP[`${PATHS.AUTH}${PATHS.LOGIN}`]
                      }
                    />
                    <Sidebar.Label>
                      {SIDEBAR_PATHS_TITLES_MAP[`${PATHS.AUTH}${PATHS.LOGIN}`]}
                    </Sidebar.Label>
                  </Sidebar.Button>
                </Flex>
              </Drawer.Content>
            </Scrollable>
          </Scrollable>
        </Drawer.Container>
      </Drawer>
    </>
  );
}

Sidebar.Link = Components.Link;
Sidebar.Button = Components.Button;
Sidebar.Label = Components.Label;
Sidebar.Icon = Components.Icon;

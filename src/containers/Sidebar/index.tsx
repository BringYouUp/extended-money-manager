import { userLogOut } from "@async-actions";
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
import { useAppDispatch, useAppSelector, useOpen } from "@hooks";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

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

export const Sidebar: React.FC = () => {
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
                <Button
                  style={{ marginTop: "auto" }}
                  theme="transparent"
                  rounded
                  onClick={onLogout}
                >
                  <Icon
                    size={24}
                    name={
                      SIDEBAR_PATHS_ICONS_MAP[`${PATHS.AUTH}${PATHS.LOGIN}`]
                    }
                  />
                </Button>
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
                  {SIDEBAR_PATHS.map((path) => {
                    return (
                      <NavLink key={path} to={path}>
                        <Button
                          centered={false}
                          style={{ width: "100%" }}
                          active={location.pathname === path}
                          theme="transparent"
                        >
                          <Icon
                            size={24}
                            name={SIDEBAR_PATHS_ICONS_MAP[path]}
                          />
                          <Text uppercase>
                            {SIDEBAR_PATHS_TITLES_MAP[path]}
                          </Text>
                        </Button>
                      </NavLink>
                    );
                  })}
                  <Button
                    centered={false}
                    style={{ width: "100%", marginTop: "auto" }}
                    theme="transparent"
                    onClick={onLogout}
                  >
                    <Icon
                      size={24}
                      name={
                        SIDEBAR_PATHS_ICONS_MAP[`${PATHS.AUTH}${PATHS.LOGIN}`]
                      }
                    />
                    <Text uppercase>
                      {SIDEBAR_PATHS_TITLES_MAP[`${PATHS.AUTH}${PATHS.LOGIN}`]}
                    </Text>
                  </Button>
                </Flex>
              </Drawer.Content>
            </Scrollable>
          </Scrollable>
        </Drawer.Container>
      </Drawer>
    </>
  );
};

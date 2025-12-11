"use client";

import { userLogOut } from "@async-actions/user";
import { PATHS } from "@consts/paths";
import { Drawer } from "@entities/Drawer";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useLocation } from "@hooks/useLocation";
import { useOpen } from "@hooks/useOpen";
import { Container, Flex, Offset, Scrollable } from "@ui";
import { useEffect } from "react";
import Components from "./components";

const SIDEBAR_PATHS_TITLES_MAP = {
	[PATHS.ROOT]: "home",
	[PATHS.ACCOUNTS]: "accounts",
	[PATHS.CATEGORIES]: "categories",
	[PATHS.TRANSACTIONS]: "transactions",
	[PATHS.PROFILE]: "profile",
	[PATHS.SETTINGS]: "settings",
	[`${PATHS.AUTH}${PATHS.LOGIN}`]: "logout",
};

const SIDEBAR_PATHS_ICONS_MAP = {
	[PATHS.PROFILE]: "user",
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
	PATHS.PROFILE,
	// PATHS.SETTINGS,
];

export function Sidebar() {
	const dispatch = useAppDispatch();

	// const user = useAppSelector((state) => state.user.user);
	const location = useLocation();
	const [isOpened, onOpen, onClose] = useOpen();

	const onLogout = () => dispatch(userLogOut());

	useEffect(() => {
		return () => {
			if (isOpened) {
				onClose();
			}
		};
	}, [isOpened, onClose, location]);

	return (
		<>
			<Container h100>
				<Scrollable full hidden>
					<Scrollable full overlay>
						<Offset h100 padding={[24, 16]}>
							<Flex h100 column gap={24}>
								<Sidebar.Button onClick={onOpen} rounded={true}>
									<Sidebar.Icon name="browse" />
								</Sidebar.Button>

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
									<Sidebar.Button
										style={{ width: "24px" }}
										onClick={onClose}
										rounded={true}
									>
										<Sidebar.Icon name="browse" />
									</Sidebar.Button>

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

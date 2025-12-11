"use client";

import { Section } from "@entities/Section";
import { ChangePasswordForm } from "@features/Forms";

const Component: React.FC = () => {
	return (
		<>
			<Section.Container>
				<Section.Top>
					<Section.Title>
						<Section.Icon name="user" />
						Profile
					</Section.Title>
				</Section.Top>
			</Section.Container>
			<Section.Container>
				<Section.Top>
					<Section.Title>
						<Section.Icon name="lock" />
						Change password
					</Section.Title>
				</Section.Top>

				<Section.Content>
					<ChangePasswordForm />
				</Section.Content>
			</Section.Container>
		</>
	);
};

export default Component;

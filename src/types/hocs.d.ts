declare namespace Hocs {
	namespace WithClosingConfirmation {
		type Props = {
			onClose: (
				isSkipComfirmationModal: boolean,
				onAfterClose: () => void,
			) => void;
		};
	}
}

import { Modal } from "@entities/Modal";
import { useOpen } from "@hooks/useOpen";
import { Button } from "@ui";

export function withClosingComfirmation<
  T extends {
    onClose: () => void;
  }
>({
  title,
  subtitle,
  acceptButtonText = "Yes",
  rejectButtonText = "No",
}: {
  title: string;
  subtitle?: string;
  acceptButtonText?: string;
  rejectButtonText?: string;
}) {
  return (Child: React.ComponentType<T>) => {
    function WithClosingComfirmation(props: T) {
      const [isOpenedConfirmModal, onOpenConfirmModal, onCloseConfirmModal] =
        useOpen();

      const onConfirmClose = () => {
        if (isOpenedConfirmModal) {
          onCloseConfirmModal();
        }

        props.onClose();
      };

      const onClose = (
        isSkipComfirmModal: boolean = false,
        onAfterClose: () => void
      ) => {
        if (isSkipComfirmModal) {
          props.onClose();
          typeof onAfterClose === "function" && onAfterClose();
        } else {
          onOpenConfirmModal();
        }
      };

      return (
        <>
          <Child {...props} onClose={onClose} />
          <Modal isOpened={isOpenedConfirmModal} onClose={onCloseConfirmModal}>
            <Modal.Wrapper>
              <Modal.Container>
                <Modal.Top>
                  <Modal.Title>{title}</Modal.Title>
                  {subtitle ? (
                    <Modal.Subtitle>{subtitle}</Modal.Subtitle>
                  ) : null}
                </Modal.Top>
                <Modal.Actions>
                  <Button onClick={onConfirmClose} theme="outline">
                    {acceptButtonText}
                  </Button>
                  <Button onClick={onCloseConfirmModal} theme="primary">
                    {rejectButtonText}
                  </Button>
                </Modal.Actions>
              </Modal.Container>
            </Modal.Wrapper>
          </Modal>
        </>
      );
    }

    return WithClosingComfirmation;
  };
}

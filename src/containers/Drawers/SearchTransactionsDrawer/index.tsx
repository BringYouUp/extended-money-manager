import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Modal,
  ModalWrapper,
  Offset,
  Scrollable,
  Text,
} from "@components";
import { useOpen } from "@hooks";
// import { StoreTransactionsTransaction } from "@models";
import { useRef } from "react";

type Props = {
  is: boolean;
  onClose: () => void;
};

export const SearchTransactionsDrawer: React.FC<Props> = ({
  is,
  onClose,
}: Props) => {
  // const dispatch = useAppDispatch();
  // const { createToast } = useToast();
  // const { isLoading, startLoading, endLoading } = useLoading();
  const isFormChanged = useRef<boolean>(false);

  const [
    isOpenedConfirmDeleteModal,
    // onOpenConfirmDeleteModal,
    onCloseConfirmDeleteModal,
  ] = useOpen();

  const onCloseHandler = () => {
    onClose();
    isFormChanged.current = false;
  };

  const onDeleteTransaction = () => {
    if (isOpenedConfirmDeleteModal) {
      onCloseConfirmDeleteModal();
    }
  };

  const [isOpenedConfirmModal, onOpenConfirmModal, onCloseConfirmModal] =
    useOpen();

  const onTryToClose = (forceClose: boolean = false) => {
    if (!forceClose) {
      if (isFormChanged.current) {
        return onOpenConfirmModal();
      } else {
        onCloseHandler();
      }
    } else {
      onCloseHandler();
    }
  };

  const onConfirmClose = () => {
    if (isOpenedConfirmModal) {
      onCloseConfirmModal();
    }

    onCloseHandler();
  };

  return (
    <>
      <Drawer
        side="right"
        isOpened={Boolean(is)}
        onClose={() => onTryToClose(false)}
      >
        <Container h100 background="var(--soft-background-color)" width="300px">
          <Offset full padding={[24, 16]}>
            <Flex full column gap={24}>
              <Flex justifyBetween alignCenter>
                <Text as="h3" uppercase>
                  Search transactions
                </Text>
                <Button
                  theme="transparent"
                  rounded
                  onClick={() => onTryToClose(false)}
                >
                  <Icon name="close" />
                </Button>
              </Flex>

              <Scrollable full overlay>
                <Flex column gap={8} full justifyBetween></Flex>
              </Scrollable>
            </Flex>
          </Offset>
        </Container>
      </Drawer>
      <Modal
        isOpened={isOpenedConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
      >
        <ModalWrapper>
          <Flex column gap={24}>
            <Flex column gap={12}>
              <Text as="h3" uppercase>
                Confirm
              </Text>
              <Text>Do you really want to delete transaction?</Text>
            </Flex>
            <Flex gap={16}>
              <Button onClick={onDeleteTransaction} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmDeleteModal} theme="primary">
                No
              </Button>
            </Flex>
          </Flex>
        </ModalWrapper>
      </Modal>
      <Modal isOpened={isOpenedConfirmModal} onClose={onCloseConfirmModal}>
        <ModalWrapper>
          <Flex column gap={24}>
            <Flex column gap={12}>
              <Text as="h3" uppercase>
                Confirm
              </Text>
              <Text>Do you really want to close drawer</Text>
            </Flex>
            <Flex gap={16}>
              <Button onClick={onConfirmClose} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmModal} theme="primary">
                No
              </Button>
            </Flex>
          </Flex>
        </ModalWrapper>
      </Modal>
    </>
  );
};

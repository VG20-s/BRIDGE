import React, { forwardRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
const AlertDelete = forwardRef(({ isopen, delCom, id, setisopen }, ref) => {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={ref}
      onClose={() => setisopen(true)}
      isOpen={isopen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>댓글 삭제</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>진짜 댓글을 삭제하시겠습니까?</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={ref} onClick={() => setisopen(false)}>
            No
          </Button>
          <Button
            color="red"
            onClick={() => {
              delCom(id);
              setisopen(false);
            }}
            ml={3}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default AlertDelete;

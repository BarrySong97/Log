import { SolarCloudUploadBroken } from "@/assets/icon";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Form, Upload } from "antd";
import React, { FC } from "react";
export interface EditTag {
  isOpen: boolean;
  onOpenChange: (b: boolean) => void;
}
const EditTag: FC<EditTag> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">创建Tags</ModalHeader>
            <ModalBody>
              <Form>
                <Form.Item name="title" noStyle>
                  <Input
                    radius="sm"
                    size="sm"
                    className="mb-4"
                    label="Tag名称"
                  />
                </Form.Item>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                取消
              </Button>
              <Button color="primary" onPress={onClose}>
                创建
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditTag;

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
import { Form, Upload, message } from "antd";
import React, { FC, useState } from "react";
import { createTag } from "../../../service/tag";
export interface EditTag {
  isOpen: boolean;
  onOpenChange: (b: boolean) => void;
}
const EditTag: FC<EditTag> = ({ isOpen, onOpenChange }) => {
  // const [form] = Form.useForm<{ title: string }>();
  const [title, settitle] = useState<string>();
  const [loading, setLoading] = useState(false);
  const onCreate = async (onClose: () => void) => {
    if (!title) {
      return;
    }
    try {
      setLoading(true);
      await createTag(title);
      message.success("创建成功");
      onClose();
    } catch (error: any) {
      message.error(`创建失败, ${error.messag}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">创建Tags</ModalHeader>
            <ModalBody>
              <Input
                radius="sm"
                size="sm"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                className="mb-4"
                label="Tag名称"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                取消
              </Button>
              <Button
                isLoading={loading}
                color="primary"
                onPress={() => {
                  onCreate(onClose);
                }}
              >
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

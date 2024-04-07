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
export interface EditProjectProps {
  isOpen: boolean;
  onOpenChange: (b: boolean) => void;
}
const EditProject: FC<EditProjectProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              创建Project
            </ModalHeader>
            <ModalBody>
              <Form>
                <Form.Item name="id" noStyle>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader !flex !justify-center !mb-4"
                    showUploadList={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      className="flex justify-center flex-col items-center"
                      type="button"
                    >
                      <SolarCloudUploadBroken className="text-xl" />
                      <div className="mt-1">上传Icon</div>
                    </button>
                  </Upload>
                </Form.Item>
                <Form.Item name="title" noStyle>
                  <Input
                    radius="sm"
                    size="sm"
                    className="mb-4"
                    label="项目名称"
                  />
                </Form.Item>
                <Form.Item name="desc" noStyle>
                  <Input className="mb-4" radius="sm" size="sm" label="描述" />
                </Form.Item>
                <Form.Item name="link" noStyle>
                  <Input radius="sm" size="sm" label="链接" />
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

export default EditProject;

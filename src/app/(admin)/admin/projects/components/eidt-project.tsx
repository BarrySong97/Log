import { Project } from "@/app/api/model";
import { SolarCloudUploadBroken } from "@/assets/icon";
import { upload } from "@vercel/blob/client";
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
import ImageUplod from "@/components/image-upload";
export interface EditProjectProps {
  isOpen: boolean;
  onOpenChange: (b: boolean) => void;
  data?: Project;
}
const EditProject: FC<EditProjectProps> = ({ isOpen, onOpenChange, data }) => {
  const [form] =
    Form.useForm<Omit<Project, "id" | "createdAt" | "updatedAt">>();
  const title = Form.useWatch("title", form);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {!data ? "创建" : "编辑"}Project
            </ModalHeader>
            <ModalBody>
              <Form form={form}>
                <Form.Item name="icon" noStyle>
                  <ImageUplod filename={title} />
                </Form.Item>
                <Form.Item name="title" noStyle>
                  <Input
                    isRequired
                    radius="sm"
                    size="sm"
                    className="mb-4"
                    label="项目名称"
                  />
                </Form.Item>
                <Form.Item name="desc" noStyle>
                  <Input
                    isRequired
                    className="mb-4"
                    radius="sm"
                    size="sm"
                    label="描述"
                  />
                </Form.Item>
                <Form.Item name="link" noStyle>
                  <Input isRequired radius="sm" size="sm" label="链接" />
                </Form.Item>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                取消
              </Button>
              <Button color="primary" onPress={onClose}>
                {!data ? "创建" : "更新"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditProject;

import { Project } from "@/app/api/model";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Form, message } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import ImageUplod from "@/components/image-upload";
import { createProject, updateProject } from "../../service/project";
import { useQueryClient } from "react-query";
export interface EditProjectProps {
  isOpen: boolean;
  onOpenChange: (b: boolean) => void;
  data?: Project;
}
const EditProject: FC<EditProjectProps> = ({ isOpen, onOpenChange, data }) => {
  const [form] =
    Form.useForm<Omit<Project, "id" | "createdAt" | "updatedAt">>();
  const [loading, setLoading] = useState(false);
  const title = Form.useWatch("title", form);
  const icon = Form.useWatch("icon", form);
  const preIconImage = useRef<string>();
  const queryClient = useQueryClient();
  const onCreate = async (onClose: () => void) => {
    if (!title) {
      return;
    }
    try {
      const values = form.getFieldsValue();
      setLoading(true);
      const res = await createProject(values);
      message.success("创建成功");
      queryClient.setQueryData<Project[]>(
        "projects",
        (data: Project[] | undefined) => {
          return [res, ...(data ?? [])];
        }
      );
      onClose();
      form.resetFields();
    } catch (error: any) {
      message.error(`创建失败, ${error.messag}`);
    } finally {
      setLoading(false);
    }
  };
  const onEdit = async (onClose: () => void) => {
    if (!data?.id) {
      return;
    }
    try {
      const values = form.getFieldsValue();
      setLoading(true);
      const res = await updateProject(values, data.id);
      message.success("编辑成功");
      queryClient.setQueryData("projects", (_data: any) => {
        const index = _data?.findIndex(
          (project: Project) => project.id === data?.id
        );
        if (index !== undefined) {
          _data[index] = res;
        }

        return [..._data];
      });
      onClose();
      form.resetFields();
    } catch (error: any) {
      message.error(`编辑失败, ${error.messag}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);
  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, data]);
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
                  <ImageUplod
                    text="上传Icon"
                    imageType="icon"
                    filename={title}
                  />
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
              <Button
                isLoading={loading}
                color="primary"
                onPress={() => {
                  if (data) {
                    onEdit(onClose);
                  } else {
                    onCreate(onClose);
                  }
                }}
              >
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

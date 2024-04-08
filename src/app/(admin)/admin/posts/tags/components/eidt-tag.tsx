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
import { message } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { createTag, updateTag } from "../../../service/tag";
import { Tag } from "@/app/api/model";
export interface EditTag {
  isOpen: boolean;
  onOpenChange: (b: boolean) => void;
  data?: Tag;
}
const EditTag: FC<EditTag> = ({ isOpen, onOpenChange, data }) => {
  // const [form] = Form.useForm<{ title: string }>();
  const [title, setTitle] = useState<string>();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const onCreate = async (onClose: () => void) => {
    if (!title) {
      return;
    }
    try {
      setLoading(true);
      const res = await createTag(title);
      message.success("创建成功");
      queryClient.setQueryData<Tag[]>("tags", (data: Tag[] | undefined) => {
        return [res, ...(data ?? [])];
      });
      onClose();
      setTitle("");
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
    if (!title) {
      return;
    }
    try {
      setLoading(true);
      const res = await updateTag(data.id, title);
      message.success("编辑成功");
      queryClient.setQueryData("tags", (_data: any) => {
        const index = _data?.findIndex((tag: Tag) => tag.id === data?.id);
        if (index !== undefined) {
          _data[index] = res;
        }
        return [...(_data ?? [])];
      });
      onClose();
    } catch (error: any) {
      message.error(`编辑失败, ${error.messag}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTitle(data?.title ?? "");
  }, [data]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {data ? "编辑" : "创建"}Tag
            </ModalHeader>
            <ModalBody>
              <Input
                radius="sm"
                size="sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  if (data) {
                    onEdit(onClose);
                  } else {
                    onCreate(onClose);
                  }
                }}
              >
                {data ? "编辑" : "创建"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditTag;

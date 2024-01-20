import { Customer } from "@/types";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const customerSchema = z.object({
  name: z.string().nonempty({ message: "氏名は必須です" }),
  phone: z.string().nonempty({ message: "電話番号は必須です" }),
  email: z
    .string()
    .email({ message: "有効なEメールアドレスを入力してください" })
    .nonempty({ message: "Eメールは必須です" }),
  address: z.string().nonempty({ message: "住所は必須です" }),
});

/** 作成処理。 */
// TODO 今後利用する
export const CustomerFormModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit: SubmitHandler<Customer> = async (data) => {
    console.log(data);

    const res = await fetch("https://657c595b853beeefdb99424c.mockapi.io/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        registration_date: new Date(),
      }),
    });

    if (!res.ok) {
      console.error(res.statusText);
      alert("登録できませんでした。");
      return;
    }

    reset();
    onClose();
    mutate("/customers");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新規顧客追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <Input {...register("name")} placeholder="氏名" />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <Input {...register("phone")} placeholder="電話番号" />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}

            <Input {...register("email")} placeholder="Eメール" />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <Input {...register("address")} placeholder="住所" />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}

            <Button type="submit" colorScheme="blue">
              送信
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          {/* <Button mr={3} onClick={onClose}>
            閉じる
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

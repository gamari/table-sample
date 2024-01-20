"use client";

import React from "react";
import useSWR from "swr";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Customer } from "@/types";
import { fetcher } from "@/libs/fetcher";
import dayjs from "dayjs";

export const CustomerTable = () => {
  const { data: customers, error } = useSWR("/customers", fetcher);

  if (error) return <div>データの取得に失敗しました。</div>;
  if (!customers) return <div>ローディング中...</div>;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>氏名</Th>
          <Th>連絡先</Th>
          <Th>住所</Th>
          <Th>登録日</Th>
        </Tr>
      </Thead>
      <Tbody>
        {customers?.map((customer: Customer) => (
          <Tr key={customer.id}>
            <Td>{customer.id}</Td>
            <Td>{customer.name}</Td>
            <Td>{customer.phone}</Td>
            <Td>{customer.address}</Td>
            <Td>{dayjs(customer.registration_date).format("YYYY年MM月DD日")}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

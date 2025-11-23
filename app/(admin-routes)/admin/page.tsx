"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useCallback } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";

import { IUpdateTrail } from "@/types/Trail";
import { useTrail } from "@/hooks/useTrail";
import { EllipsisIcon, SquarePenIcon, TrashIcon } from "lucide-react";

const columns = [
  {
    key: "id",
    label: "id",
  },
  {
    key: "subtitle",
    label: "Nome",
  },
  {
    key: "actions",
    label: "Ações",
  },
];

export default function Admin() {
  const { trails, deleteTrailMutation } = useTrail();

  const deleteTrail = async (id: string) => {
    try {
      await deleteTrailMutation(id)
    } catch (error: any) {
      console.log(error.message)
    }
  };

  const renderCell = useCallback(
    (trail: IUpdateTrail, columnKey: React.Key) => {
      const cellValue = trail[columnKey as keyof IUpdateTrail];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <EllipsisIcon size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key={`edit_${trail.id}`}>
                    <Link
                      href={`/admin/trilhas/atualizar/${trail.id}`}
                      className="flex gap-1 items-center justify-center text-black"
                    >
                      <span>Editar</span>
                      <SquarePenIcon />
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    key={`delete_${trail.id}`}
                    onClick={() => deleteTrail(String(trail.id))}
                  >
                    <div className="flex gap-1 items-center justify-center text-medium">
                      <span>Deletar</span>
                      <TrashIcon />
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <main className="container mx-auto max-w-5xl flex flex-col items-center justify-center gap-4 px-6 py-8 md:py-10">
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="text-medium bg-capi_purple text-white"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Nenhuma trilha cadastrada."}
          items={trails || []}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}

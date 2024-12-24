import { DataTable } from "@/components/DataTable"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ICategoryRequest } from "@/interfaces/request/category"
import { ICategoryResponse } from "@/interfaces/response/category"
import { getAllCategory } from "@/services/CategoryService"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { useState } from "react"

function Category() {
  const [id, setId] = useState<number | undefined>();
  const [deleteId, setDeleteId] = useState<number | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [showId, setShowId] = useState<number | undefined>();
  const [showOpen, setShowOpen] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const datatableCols: ColumnDef<ICategoryResponse>[] = [
    {
      header: 'Category',
      accessorKey: 'name'
    },
    {
      header: 'Parent Category',
      accessorKey: 'parentName'
    },
    {
      header: 'HSN No',
      accessorKey: 'hsn'
    },
    {
      header: 'GST (in %)',
      accessorKey: 'gst'
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const rowOrignal = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { setShowId(rowOrignal.id); setShowOpen(true); }}><Eye /> View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setId(rowOrignal.id); setOpen(true); }}><Edit /> Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setDeleteId(rowOrignal.id); setOpenConfirm(true); }}><Trash /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const payload: ICategoryRequest = {
    isPaginate: true,
    top: 10,
    pageNumber: 1,
    orderBy: {
      fieldName: 'Id',
      sort: 'Desc'
    },
    search: '',
    endDate: null,
    startDate: null,
    isActive: null,
    categoryType: null
  }


  return (
    <>
      <div>
        <DataTable columns={datatableCols} callback={getAllCategory} paginationRequest={payload} />
      </div>
    </>
  )
}

export default Category
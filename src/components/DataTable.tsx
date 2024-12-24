import { IPaginationRequest } from "@/interfaces/request/pagination"
import { ReactNode, useEffect, useRef, useState } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Loader } from "lucide-react"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ITableResponse } from "@/interfaces/response/response"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    callback: Function,
    paginationRequest: IPaginationRequest,
    perPageDropdown?: number[],
    headerButtons?: ReactNode,
    props?: Object
}



export function DataTable<TData, TValue>({
    columns,
    callback,
    paginationRequest,
    perPageDropdown = [5, 10, 20, 30, 50],
    headerButtons = <div></div>,
    props,
}: DataTableProps<TData, TValue>) {
    const [tableData, setTableData] = useState<ITableResponse<TData[]>>();
    const [pagination, setPagination] = useState<IPaginationRequest>(paginationRequest);
    const [searchParam, setSearchParam] = useState<string>('');

    const controllerRef = useRef<AbortController>();
    const signal = controllerRef.current?.signal;

    const { data, isLoading } = useQuery<ITableResponse<TData[]>, Error>({
        queryKey: ["datatable", pagination],
        queryFn: async () => {
            const result = await callback({ request: pagination, signal: signal, ...props });
            console.log(result); // Log the response from the callback
            return result;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onsuccess: (data: ITableResponse<TData[]>) => {
            setTableData(data);
        },
        onError: () => {
            console.log('Error occurred'); // Log error to check what's going wrong
            setTableData({ count: 0, iterableData: [] }); // Set empty data on error
        },
    } as UseQueryOptions<ITableResponse<TData[]>, Error, ITableResponse<TData[]>, QueryKey>);

    const table = useReactTable({
        data: tableData?.iterableData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const previousPage = () => {
        setPagination((prev) => ({
            ...prev,
            pageNumber: Math.max(prev.pageNumber - 1, 0)
        }))
    }

    const nextPage = () => {
        setPagination((prev) => ({
            ...prev,
            pageNumber: Math.min(prev.pageNumber + 1, Math.ceil(data?.count! / prev.top))
        }))
    }

    const handlePerPage = (perPage: string) => {
        setPagination((prev) => ({
            ...prev,
            pageNumber: 1,
            top: parseInt(perPage)
        }));
    }

    useEffect(() => {
        // Create a new AbortController on pagination or search change
        controllerRef.current = new AbortController();
        const handler = setTimeout(() => {
            setPagination((prev) => ({
                ...prev,
                pageNumber: 1,
                search: searchParam,
            }));
        }, 700);

        return () => {
            clearTimeout(handler);
            if (controllerRef.current) {
                controllerRef.current.abort(); // Cancel the previous request
            }
        };
    }, [searchParam]); // Trigger effect when searchParam changes

    useEffect(() => {
        // Create a new AbortController when the component is mounted
        controllerRef.current = new AbortController();
        return () => {
            controllerRef.current?.abort(); // Cancel request when component is unmounted
        };
    }, []); // Empty dependency array to only run on mount/unmount


    useEffect(() => {
        data ? setTableData(data) : setTableData({ count: 0, iterableData: [] });
    }, [data])

    return (
        <div >
            <div className="flex justify-between items-center mb-2">
                <Select onValueChange={(e: string) => handlePerPage(e)}>
                    <SelectTrigger className="w-[125px]">
                        <SelectValue placeholder={`${pagination.top} per page`} />
                    </SelectTrigger>
                    <SelectContent>
                        {perPageDropdown.map((item) => (
                            <SelectItem key={item} value={item.toString()}>
                                {item} per page
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex justify-center flex-row items-center gap-2">
                    <Input className="max-w-2xl" placeholder="Search..." onChange={(e) => setSearchParam(e.target.value)} />
                    {headerButtons}
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    {isLoading ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-14 text-center">
                                    <Loader />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>

                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-14 text-center">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    )}
                </Table>
            </div>
            <div className="flex items-center justify-between py-4">
                <p className="text-[14px]">Showing {((pagination.pageNumber - 1) * pagination.top) + 1} to {data?.iterableData.length! < 10 ? (((pagination.pageNumber - 1) * pagination.top) + data?.iterableData.length!) : (pagination.pageNumber * pagination.top)} of {data?.count} entries</p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => previousPage()}
                        disabled={!(pagination.pageNumber > 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => nextPage()}
                        disabled={pagination.pageNumber! >= (data?.count! / pagination.top!)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div >
    )
}

import { Skeleton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function TableLoading() {

    const columns: GridColDef[] = [
        { field: 'a', renderHeader: () => <LoadingSkeleton />, width: 300, renderCell: () => <LoadingSkeleton /> },
        { field: 'b', renderHeader: () => <LoadingSkeleton />, width: 300, renderCell: () => <LoadingSkeleton /> },
        { field: 'c', renderHeader: () => <LoadingSkeleton />, width: 300, renderCell: () => <LoadingSkeleton /> },
        { field: 'd', renderHeader: () => <LoadingSkeleton />, width: 300, renderCell: () => <LoadingSkeleton /> },
    ];

    const LoadingSkeleton = () => (
        <Skeleton variant="rounded" sx={{ width: 280 }} />
    );

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={[
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 },
                        { id: 6 },
                        { id: 7 },
                        { id: 8 }
                    ]}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </>
    );
}
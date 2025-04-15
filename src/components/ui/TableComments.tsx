import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IComments } from '@/types/IComments';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

export default function TableComments({ data }: {
    data: IComments[];
}) {
    const columns = [
        { field: 'id', header: 'ID', width: '5%' },
        { field: 'name', header: 'Name', width: '20%' },
        { field: 'email', header: 'Email', width: '20%' },
        { field: 'body', header: 'Body', width: '55%' },
    ];

    const [dataComment, setDataComment] = useState<IComments[]>(data);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        filters: {
            global: { value: '', matchMode: FilterMatchMode.CONTAINS },
        },
    });

    useEffect(() => {
        let isMounted = true;

        const loadLazyData = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `https://jsonplaceholder.typicode.com/comments`
                );
                if (!res.ok) {
                    throw new Error('Failed to fetch comments');
                }
                let comments: IComments[] = await res.json();

                const globalFilter = lazyState.filters.global.value?.trim();
                if (globalFilter) {
                    const lowerFilter = globalFilter.toLowerCase();
                    comments = comments.filter((comment) => {
                        const matches =
                            (comment.id?.toString().toLowerCase().includes(lowerFilter) ?? false) ||
                            (comment.name?.toLowerCase().includes(lowerFilter) ?? false) ||
                            (comment.email?.toLowerCase().includes(lowerFilter) ?? false) ||
                            (comment.body?.toLowerCase().includes(lowerFilter) ?? false);
                        return matches;
                    });
                }

                if (totalRecords === 0) {
                    const totalRes = await fetch('https://jsonplaceholder.typicode.com/comments');
                    const totalData: IComments[] = await totalRes.json();
                    if (isMounted) {
                        setTotalRecords(totalData.length);
                    }
                }

                if (isMounted) {
                    setDataComment(comments);
                }
            } catch (error) {
                console.error('Error loading comments:', error);
                if (isMounted) {
                    setDataComment([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadLazyData();

        return () => {
            isMounted = false;
        };
    }, [lazyState.first, lazyState.rows, lazyState.filters.global.value, totalRecords]);

    const onPage = (event: any) => {
        setLazyState({
            ...lazyState,
            first: event.first,
            rows: event.rows,
            page: event.page,
        });
    };

    const onFilter = (event: any) => {
        setLazyState({
            ...lazyState,
            filters: event.filters,
        });
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLazyState((prevState) => ({
            ...prevState,
            first: 0,
            page: 0,
            filters: {
                ...prevState.filters,
                global: { value, matchMode: FilterMatchMode.CONTAINS },
            },
        }));
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search all fields"
                    className="p-inputtext-sm"
                />
            </div>
        );
    };

    const actionBodyTemplate = (data: any) => {

        const toast = useRef<Toast | null>(null);

        const accept = useCallback(async () => {
            if (toast.current) {
                try {
                    const newDataComments = dataComment.filter((item) => item.id !== data.id);
                    setDataComment(newDataComments);
                    await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, { method: 'DELETE' });
                    toast.current.show({
                        severity: 'info',
                        summary: 'Confirmed',
                        detail: `Comment with ID ${data.id} deleted`,
                    });
                } catch (error) {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete comment',
                    });
                }
            }
        }, [data.id]);

        const reject = () => {
            toast.current && toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }

        const confirm = (id: number) => {
            confirmDialog({
                message: `Do you want to delete comment with ID ${data.id}?`,
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-danger',
                accept,
                reject
            });
        };

        return (
            <>
                <Toast ref={toast} position="top-right" />
                <Button type="button" onClick={() => {
                    confirm(data.id);
                }} severity="danger" icon="pi pi-trash" rounded></Button>
            </>
        );
    };

    return (
        <div className="card">
            <ConfirmDialog />
            <DataTable
                value={dataComment}
                size="small"
                stripedRows
                loading={loading}
                lazy
                filterDisplay="row"
                first={lazyState.first}
                rows={lazyState.rows}
                totalRecords={totalRecords}
                scrollable scrollHeight="400px"
                onPage={onPage}
                onFilter={onFilter}
                header={renderHeader}
                paginator
                rowsPerPageOptions={[5, 10]}
                tableStyle={{ minWidth: '30rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                className="rounded-md bg-custWhite border-2 border-custDark/10 p-4 text-sm"
            >
                {columns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        style={{ width: col.width }}
                        showFilterMenu={false}
                        className='text-sm'
                    />
                ))}
                <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>
        </div>
    );
}
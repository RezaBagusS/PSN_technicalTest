'use client'

import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IComments } from '@/types/IComments';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useRouter } from 'next/navigation';
import { Messages } from 'primereact/messages';
import { useLoadingDialog } from '@/contexts/LoadingContext';

export default function TableComments({ data, msgs }: {
    data: IComments[];
    msgs: RefObject<Messages | null>
}) {
    const columns = [
        { field: 'id', header: 'ID', width: '5%' },
        { field: 'name', header: 'Name', width: '20%' },
        { field: 'email', header: 'Email', width: '20%' },
        { field: 'body', header: 'Body', width: '55%' },
    ];

    const [dataComment, setDataComment] = useState<IComments[]>(data);
    const { showLoadingDialog, hideLoadingDialog } = useLoadingDialog();
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(data.length);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        filters: {
            global: { value: '', matchMode: FilterMatchMode.CONTAINS },
        },
    });

    const location = useRouter();

    useEffect(() => {
        let isMounted = true;

        const loadLazyData = async () => {
            setLoading(true);

            try {

                const start = lazyState.first;
                const limit = lazyState.rows;

                let comments: IComments[] = dataComment;

                const globalFilter = lazyState.filters.global.value?.trim();
                if (globalFilter) {
                    const lowerFilter = globalFilter.toLowerCase();

                    comments = data.filter((comment) => {
                        const matches =
                            (comment.id?.toString().toLowerCase().includes(lowerFilter) ?? false) ||
                            (comment.name?.toLowerCase().includes(lowerFilter) ?? false) ||
                            (comment.email?.toLowerCase().includes(lowerFilter) ?? false)
                        return matches;
                    });
                    // console.log("Filter global result: ", comments);
                    setTotalRecords(comments.length)

                    const newPageData = comments.filter((item, idx) => {
                        if (idx >= start && idx < start + limit) {
                            return true;
                        }
                    })
                    comments = newPageData;
                } else {
                    const newPageData = data.filter((item, idx) => {
                        if (idx >= start && idx < start + limit) {
                            return true;
                        }
                    })
                    comments = newPageData;
                    setTotalRecords(data.length)
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

    const onPage = (event: DataTableStateEvent) => {

        setLazyState({
            ...lazyState,
            first: event.first,
            rows: event.rows,
            page: event.page ?? 0,
        });
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLazyState((prevState) => ({
            ...prevState,
            first: 0,
            page: 0,
            filters: {
                global: { value, matchMode: FilterMatchMode.CONTAINS },
            },
        }));
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="grid md:flex md:justify-between md:items-center gap-3">
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search by id, name and email"
                    className="p-inputtext-sm"
                />
                <p className='text-sm opacity-70'>Search Found: {totalRecords}</p>
                <Button label="Create Comment" icon="pi pi-plus" severity="success" size='small'
                    onClick={() => location.push('/dashboard/create-comment')}
                />
            </div>
        );
    };

    const actionBodyTemplate = useCallback((rowData: IComments) => {

        const accept = async () => {
            showLoadingDialog('Deleting Comment', 'Please wait while your action is being processed...');
            msgs.current?.clear()
            try {
                const newDataComments = dataComment.filter((item) => item.id !== rowData.id);
                setDataComment(newDataComments);
                await fetch(`https://jsonplaceholder.typicode.com/posts/${rowData.id}`, { method: 'DELETE' });

                // throw new Error('Error deleting comment');

                msgs.current?.show({
                    severity: 'info',
                    sticky: true,
                    detail: 'You have successfully deleted the comment',
                    closable: false
                })
                
            } catch (error) {
                console.log(error);
                
                msgs.current?.show({
                    severity: 'error',
                    sticky: true,
                    summary: 'Delete Failed',
                    detail: 'Failed to delete the comment',
                    closable: false
                })
            } finally {
                setTimeout(() => {
                    msgs.current?.clear();
                    hideLoadingDialog();
                }, 3000)
            }
        }

        const confirm = () => {
            confirmDialog({
                message: `Do you want to delete comment with ID ${rowData.id}?`,
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-danger',
                accept,
            });
        };

        return (
            <>
                <Button type="button" onClick={confirm} severity="danger" icon="pi pi-trash" rounded></Button>
            </>
        );
    }, [dataComment, hideLoadingDialog, msgs, showLoadingDialog]);

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
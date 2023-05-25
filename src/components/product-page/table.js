import React, { useContext, useEffect, useRef, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { Button, Box } from '@mui/material';

import { columnCatelog, columnGenarel } from 'assets/data';
import { Context } from 'context/index';
import { catelogProductFormating } from 'utils/helper';
import { bulkUpdateProducts } from 'woo-commerce/index';

const Table = ({ data, shop, refetch, setPage, loading, setProducts }) => {
    const { selectedProducts, setSelectedProducts } = useContext(Context);

    const [tableData, setTableData] = useState([]);

    const bottomBoundaryRef = useRef();

    useEffect(() => {
        setTableData(data);
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!loading) {
                        setPage((prev) => prev + 1);
                    }
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            }
        );

        if (bottomBoundaryRef.current) {
            observer.observe(bottomBoundaryRef.current);
        }

        return () => {
            if (bottomBoundaryRef.current) {
                observer.unobserve(bottomBoundaryRef.current);
            }
        };
    }, []);

    const handleUpdate = () => {
        if (shop?.product_type === 'Catelog') {
            const updatedProducts = catelogProductFormating(selectedProducts, data);

            bulkUpdateProducts(updatedProducts, shop, refetch, setSelectedProducts, setProducts);
        } else {
        }
    };

    const handleCancel = () => {
        setSelectedProducts([]);
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ minHeight: '100vh' }}>
                {selectedProducts?.length !== 0 && (
                    <Box
                        disabled={selectedProducts?.length === 0 ? true : false}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        style={{
                            position: 'fixed',
                            zIndex: 3000,
                            bottom: '10px',
                            right: '20px',
                            background: '#fff',
                            padding: 5,
                            disabled: selectedProducts?.length === 0 ? true : false
                        }}
                    >
                        <Button variant="contained" size="small" onClick={handleUpdate}>
                            Update
                        </Button>
                        <Button style={{ background: '#fff' }} variant="outlined" size="small" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                )}
                <MaterialReactTable
                    // columns={columns}
                    data={tableData}
                    //optionally override the default column widths
                    columns={shop?.product_type === 'Catelog' ? columnCatelog : columnGenarel}
                    defaultColumn={{
                        maxSize: 400,
                        minSize: 30,
                        size: 70
                    }}
                    enableColumnResizing
                    enableColumnActions={false}
                    enableColumnFilters={false}
                    enableSorting={false}
                    enableBottomToolbar={false}
                    enableTopToolbar={false}
                    enablePagination={false}
                    columnResizeMode="onChange" //default
                    editingMode="cell"
                    enableEditing
                    rowVirtualizerProps={{
                        overscan: 2,
                        estimateSize: () => 50
                    }}
                    muiTableBodyCellEditTextFieldProps={({ cell }) => ({
                        //onBlur is more efficient, but could use onChange instead

                        onBlur: (event) => {
                            tableData[cell.row.index][cell.column.id] = event.target.value;
                            //send/receive api updates here
                            setTableData([...tableData]);
                        },

                        onChange: (event) => {
                            const itemField = cell.id.split('_')[1];
                            const itemId = cell.row.original.id;
                            let itemValue = event.target.value;

                            if (itemValue === 'N/A') {
                                itemValue = '';
                            }

                            setSelectedProducts((prev) => {
                                const exists = prev?.find((p) => p.id === itemId);

                                if (exists) {
                                    const rest = prev?.filter((p) => p.id !== itemId);
                                    exists[itemField] = itemValue;
                                    return [...rest, exists];
                                } else {
                                    const newItem = {
                                        id: itemId,
                                        [itemField]: itemValue
                                    };

                                    return [...prev, newItem];
                                }
                            });
                        }
                    })}
                    initialState={{ density: 'compact' }}
                />
            </div>
            <div style={{ position: 'absolute', bottom: '0', width: '100%' }} ref={bottomBoundaryRef} />
        </div>
    );
};

export default Table;

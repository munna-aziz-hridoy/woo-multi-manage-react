const columnCatelog = [
    {
        accessorKey: 'image',
        size: 70,
        header: 'Image',
        Cell: ({ cell }) => (
            <div
                className="image_container"
                style={{ position: 'relative', width: '30px', height: '30px', margin: 'auto', transition: 'all 0.3s' }}
            >
                <img alt="product" style={{ width: '100%', height: '100%' }} src={cell.getValue()} />
                <div
                    className="image-hover-container"
                    style={{
                        position: 'absolute',
                        background: '#fff',
                        zIndex: 100,
                        top: '-8px',
                        left: ' 50px',
                        borderRadius: '4px',
                        transition: 'all 0.3s'
                    }}
                >
                    <img alt="product" style={{ width: '100%', height: '100%' }} src={cell.getValue()} />
                </div>
            </div>
        )
    },
    {
        accessorKey: 'name',
        header: 'Name',
        size: 280
    },
    {
        accessorKey: 'jancode',
        header: 'JAN code'
    },
    {
        accessorKey: 'newPrice',
        header: 'New Price'
    },
    {
        accessorKey: 'usedPrice',
        header: 'Used Price'
    },
    {
        accessorKey: 'category',
        header: 'Category'
    },

    {
        accessorKey: 'priceSourceNew',
        header: 'Price Source New'
    },
    {
        accessorKey: 'noteNew',
        header: 'Note New'
    },
    {
        accessorKey: 'priceSourceUsed',
        header: 'Price Source Used'
    },
    {
        accessorKey: 'noteUsed',
        header: 'Note Used'
    },
    {
        accessorKey: 'newRemarks',
        header: 'New Remarks'
    },
    {
        accessorKey: 'usedRemarks',
        header: 'Used Remarks'
    }
];

const columnGenarel = [
    {
        accessorKey: 'image',
        header: 'Image',
        Cell: ({ cell }) => (
            <div className="image_container">
                <img alt="product" width={40} height={50} src={cell.getValue()} />
            </div>
        )
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'jancode',
        header: 'JAN code'
    },
    {
        accessorKey: 'category',
        header: 'Category'
    },
    {
        accessorKey: 'price',
        header: 'Price'
    },
    {
        accessorKey: 'sellPrice',
        header: 'Sell Price'
    },
    {
        accessorKey: 'stockStatus',
        header: 'Stock Status'
    },
    {
        accessorKey: 'weight',
        header: 'Weight'
    },
    {
        accessorKey: 'totalSale',
        header: 'Total Sale'
    },
    {
        accessorKey: 'onSale',
        header: 'On Sale'
    }
];

const defaultImage =
    'https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4=';

export { columnCatelog, columnGenarel, defaultImage };

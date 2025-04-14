// components/TableCell.js

import './TableCell.css'

const TableCellComponent = ({
    className,
    header,
    value,
}) => {
    return (
        <div class={"table-cell-container "+className}>
            <div class="table-cell">
                <p class="table-cell-header">{header}</p>
                <div class="table-cell-value">
                    <p title={value}>{value}</p>
                </div>
            </div>
        </div>
    );
};

export default TableCellComponent
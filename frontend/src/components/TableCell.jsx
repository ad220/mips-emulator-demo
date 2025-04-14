// components/TableCell.js

import './TableCell.css'

const TableCellComponent = ({
    className,
    key,
    header,
    value,
}) => {
    return (
        <div class={"table-cell-container "+className} key={key}>
            <div class="table-cell">
                <a class="table-cell-header">{header}</a>
                <div class="table-cell-value">
                    <a title={value}>{value}</a>
                </div>
            </div>
        </div>
    );
};

export default TableCellComponent
import React, { useMemo } from "react";
import {
  Paper,
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  styled,
} from "@mui/material";
import TableFilter, { ITableFilterProps } from "./filter";
import { tableCellClasses } from '@mui/material/TableCell';
import { LIGHT_MODE_THEME } from "../../utils/constants";

type Alignment = "inherit" | "right" | "left" | "center" | "justify";
export type RowData = { [key: string]: string | number | any };

export type ITableColumn = Array<{
  align?: Alignment;
  id: string;
  minWidth?: number;
  label: string;
  disabled?: boolean;
  renderer?: (item: RowData) => React.ReactNode;
}>;

type ITableProps =  {
  rows: Array<RowData> | any[];
  columns: ITableColumn;
  initalRowsPerPage?: number;
  preHeaderNode?: React.ReactNode;
  style?: React.CSSProperties;
  disableFilter?: boolean;
} & Omit<ITableFilterProps, 'onChanged'>


const Table = ({
  rows,
  columns,
  initalRowsPerPage,
  preHeaderNode,
  style,
  disableFilter = false,
  title,
  onCTAClicked,
  ctaLabel
}: ITableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initalRowsPerPage || 10);

  const [filter, setFilter] = React.useState('');

  const items = React.useMemo(()=>{
    if(filter){
      const filteredRows = rows.filter((row)=>{
        const stringRepresentation = JSON.stringify(Object.values(row));
        return stringRepresentation.toLowerCase().includes(filter.toLowerCase());
      });
      return filteredRows;
    }
    return rows;
  },[filter, rows]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const enabledColumns = useMemo(()=>{
    return [...columns].filter((c)=>!c.disabled);
  },[columns])

  return (
    <Box sx={{margin: { xs: "0 10px", sm: "0 auto", md: "0 110px" }}}>
      {!disableFilter && (<TableFilter  onChanged={setFilter} title={title} ctaLabel={ctaLabel} onCTAClicked={onCTAClicked} />)}
      <TableContainer component={Paper} style={style}  >
        {preHeaderNode}
        <MUITable aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ bgcolor: (theme) => theme.palette.mode === LIGHT_MODE_THEME ? theme.palette.primary.light : theme.palette.common.white }}>
              {enabledColumns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column?.align || "center"}
                  style={{
                    top: 57,
                    minWidth: column.minWidth || "auto",
                    fontWeight: 500,
                  }}
                >
                  {column.label.toUpperCase()}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: RowData, index: number) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id || index}
                  >
                    {enabledColumns.map((column) => {
                      const value = row[column.id];
                      const renderer = column.renderer;
                      return (
                        <TableCell
                          key={column.id}
                          align={column?.align || "center"}
                        >
                          {renderer ? renderer(row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {!items?.length && (
              <tr>
                <td colSpan={columns.length}>
                  <p style={{ textAlign: "center" }}>No records found</p>
                </td>
              </tr>
            )}
          </TableBody>
        </MUITable>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={items.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </TableContainer>
    </Box>
  );
};

export default Table;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 50,
    },
}))
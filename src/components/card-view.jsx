import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import axios from "axios";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const [getTableDAta, setTableDAta] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function createData(name, calories, fat) {
    return { name, calories, fat };
  }

  React.useEffect(() => {
    makeGetRequest();
  }, [!getTableDAta]);

  function makeGetRequest() {
    axios.get("https://api.pujakaitem.com/api/products").then(
      (response) => {
        var result = response.data;
        console.log(result);
        setTableDAta(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const rows = [
    createData("Cupcake", 305, 3.7),
    createData("Donut", 452, 25.0),
    createData("Eclair", 262, 16.0),
    createData("Frozen yoghurt", 159, 6.0),
    createData("Gingerbread", 356, 16.0),
    createData("Honeycomb", 408, 3.2),
    createData("Ice cream sandwich", 237, 9.0),
    createData("Jelly Bean", 375, 0.0),
    createData("KitKat", 518, 26.0),
    createData("Lollipop", 392, 0.2),
    createData("Marshmallow", 318, 0),
    createData("Nougat", 360, 19.0),
    createData("Oreo", 437, 18.0),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const blue = {
    200: "#A5D8FF",
    400: "#3399FF",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E7EBF0",
    200: "#E0E3E7",
    300: "#CDD2D7",
    400: "#B2BAC2",
    500: "#A0AAB4",
    600: "#6F7E8C",
    700: "#3E5060",
    800: "#2D3843",
    900: "#1A2027",
  };

  const Root = styled("div")(
    ({ theme }) => `
        table {
          font-family: IBM Plex Sans, sans-serif;
          font-size: 0.875rem;
          border-collapse: collapse;
          width: 100%;
        }
      
        td,
        th {
          border: 1px solid ${
            theme.palette.mode === "dark" ? grey[800] : grey[200]
          };
          text-align: left;
          padding: 6px;
        }
      
        th {
          background-color: ${
            theme.palette.mode === "dark" ? grey[900] : grey[100]
          };
        }
        `
  );

  const CustomTablePagination = styled(TablePaginationUnstyled)(
    ({ theme }) => `
        & .${classes.spacer} {
          display: none;
        }
      
        & .${classes.toolbar}  {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
      
          @media (min-width: 768px) {
            flex-direction: row;
            align-items: center;
          }
        }
      
        & .${classes.selectLabel} {
          margin: 0;
        }
      
        & .${classes.select}{
          padding: 2px;
          border: 1px solid ${
            theme.palette.mode === "dark" ? grey[800] : grey[200]
          };
          border-radius: 50px;
          background-color: transparent;
      
          &:hover {
            background-color: ${
              theme.palette.mode === "dark" ? grey[800] : grey[50]
            };
          }
      
          &:focus {
            outline: 1px solid ${
              theme.palette.mode === "dark" ? blue[400] : blue[200]
            };
          }
        }
      
        & .${classes.displayedRows} {
          margin: 0;
      
          @media (min-width: 768px) {
            margin-left: auto;
          }
        }
      
        & .${classes.actions} {
          padding: 2px;
          border: 1px solid ${
            theme.palette.mode === "dark" ? grey[800] : grey[200]
          };
          border-radius: 50px;
          text-align: center;
        }
      
        & .${classes.actions} > button {
          margin: 0 8px;
          border: transparent;
          border-radius: 2px;
          background-color: transparent;
      
          &:hover {
            background-color: ${
              theme.palette.mode === "dark" ? grey[800] : grey[50]
            };
          }
      
          &:focus {
            outline: 1px solid ${
              theme.palette.mode === "dark" ? blue[400] : blue[200]
            };
          }
        }
        `
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getTableDAta.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Root sx={{ width: "100%", maxWidth: "100%" }}>
          <table aria-label="custom pagination table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {(rowsPerPage > 0
                ? getTableDAta
                    .sort((a, b) => (a.price < b.price ? -1 : 1))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td style={{ width: "20%" }} align="right">
                    {row.company}
                  </td>
                  <td style={{ width: "20%" }} align="right">
                    {row.price}
                  </td>
                  <td style={{ width: "100%" }} align="right">
                    {row.description}
                  </td>
                </tr>
              ))}

              {emptyRows > 0 && (
                <tr style={{ height: 34 * emptyRows }}>
                  <td colSpan={3} />
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={getTableDAta.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </tr>
            </tfoot>
          </table>
        </Root>
      </CardContent>
    </Card>
  );
}

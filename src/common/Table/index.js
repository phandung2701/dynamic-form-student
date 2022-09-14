import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import SettingsIcon from "@mui/icons-material/Settings";

const Table = (props) => {
  const { rows, columns, setList, list, deleteItem, onSetting } = props;

  const handleClick = (row) => {
    setList(row);
  };
  const handleDelete = () => {
    deleteItem();
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        {list.length > 0 ? (
          <Tooltip
            title="Delete"
            style={{
              position: "absolute",
              right: "50px",
              top: "7px",
              zIndex: 1,
            }}
          >
            <IconButton>
              <DeleteIcon
                onClick={handleDelete}
                style={{
                  color: "red",
                  fontSize: "23px",
                }}
              />
            </IconButton>
          </Tooltip>
        ) : null}
        <Tooltip
          title="setting"
          style={{
            position: "absolute",
            right: "20px",
            top: "7px",
            zIndex: 1,
          }}
        >
          <IconButton onClick={() => onSetting(true)}>
            <SettingsIcon
              style={{
                fontSize: "23px",
              }}
            />
          </IconButton>
        </Tooltip>

        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            autoHeight={true}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;

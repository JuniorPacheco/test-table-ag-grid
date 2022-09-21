import { useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const defaultValue = {
  name: "",
  quantity: 0,
};

function App() {
  const [rowData, setRowData] = useState([
    { disponibles: "Toyota", cantidad: 35000 },
    { disponibles: "Ford", cantidad: 32000 },
    { disponibles: "Porsche", cantidad: 72000 },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "disponibles" },
    { field: "cantidad" },
  ]);

  const [rowData2, setRowData2] = useState([
    { disponibles: "Toyota", cantidad: 35000 },
    { disponibles: "Ford", cantidad: 32000 },
    { disponibles: "Porsche", cantidad: 72000 },
  ]);

  const [columnDefs2, setColumnDefs2] = useState([
    { field: "disponibles" },
    { field: "cantidad" },
  ]);

  const [cellSelected, setCellSelected] = useState(defaultValue);

  const handleClickCell = (params) => {
    setCellSelected({
      name: params.data.disponibles,
      quantity: params.data.cantidad,
    });
  };

  const handleMoveQuantity = () => {
    const newDataTable2 = rowData2.map((row2) => {
      if (row2.disponibles === cellSelected.name) {
        const newQuantity2 = cellSelected.quantity + row2.cantidad;

        const newDataTable1 = rowData.map((row) => {
          if (row.disponibles === cellSelected.name) {
            const newQuantity1 = row.cantidad - cellSelected.quantity;
            return { ...row, cantidad: newQuantity1 };
          }

          return row;
        });

        setRowData(newDataTable1);

        return { ...row2, cantidad: newQuantity2 };
      }

      return row2;
    });

    setRowData2(newDataTable2);
    setCellSelected(defaultValue);
  };

  const handleRemoveQuantity = () => {
    const newDataTable1 = rowData.map((row) => {
      if (row.disponibles === cellSelected.name) {
        const newQuantity1 = cellSelected.quantity + row.cantidad;

        const newDataTable2 = rowData2.map((row2, index) => {
          if (row2.disponibles === cellSelected.name) {
            const newQuantity2 = row2.cantidad - cellSelected.quantity;
            return { ...row2, cantidad: newQuantity2 };
          }

          return row2;
        });

        setRowData2(newDataTable2);

        return { ...row, cantidad: newQuantity1 };
      }

      return row;
    });

    setRowData(newDataTable1);
    setCellSelected(defaultValue);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        onCellClicked={handleClickCell}
        rowData={rowData}
        columnDefs={columnDefs}
      ></AgGridReact>

      <button onClick={handleMoveQuantity}>Mover ↓</button>
      <input
        type="number"
        value={cellSelected.quantity}
        onChange={(e) =>
          setCellSelected({ ...cellSelected, quantity: Number(e.target.value) })
        }
      />
      <button onClick={handleRemoveQuantity}>Remover ↑</button>

      <AgGridReact
        onCellClicked={handleClickCell}
        rowData={rowData2}
        columnDefs={columnDefs2}
      ></AgGridReact>
    </div>
  );
}

export default App;

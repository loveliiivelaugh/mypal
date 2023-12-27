import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const JsonTables = ({ data }) => {
  // Extract foods and exercises data from the provided JSON
  const foodsData = data.foods.slice(1); // Exclude the header row
  const exercisesData = data.exercises.slice(1); // Exclude the header row

  // Find the object in the array with the highest number of keys
  const maxKeys = Math.max(...foodsData.map((obj) => Object.keys(obj).length));
  const maxKeys2 = Math.max(...exercisesData.map((obj) => Object.keys(obj).length));

  const foodsObject = foodsData.find((obj) => Object.keys(obj).length === maxKeys);
  const exercisesObject = exercisesData.find((obj) => Object.keys(obj).length === maxKeys2);

  const foodsKeys = Object.keys(foodsObject);
  const exercisesKeys = Object.keys(exercisesObject);
  console.log("maxKeys: ", maxKeys, foodsObject)

  const totals_row = foodsData.find((obj) => obj.name === 'TOTALS');


  console.log("foodsData: ", foodsData, foodsData.sort(), totals_row)
  console.log("exercisesData: ", exercisesData)
  // Define columns for DataGrid
  const foods_columns = foodsKeys.map((key) => ({
    field: key,
    headerName: key,
    flex: 1,
  }));

  const columns = exercisesKeys.map((key) => ({
    field: key,
    headerName: key,
    flex: 1,
  }));

  // Function to convert data into rows suitable for DataGrid
  const getRows = (tableData) => tableData
    .map((row, index) => ({ id: index, ...row }))
    .filter((row) => !['Breakfast', 'Lunch', 'TOTALS', 'Cardiovascular'].includes(row.name));

  return (
    <div>
      <h2>Foods Table</h2>
      <DataGrid
        rows={getRows(foodsData)}
        columns={foods_columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        autoHeight
      />

      <h2>Exercises Table</h2>
      <DataGrid
        rows={getRows(exercisesData)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        autoHeight
      />
    </div>
  );
};

export default JsonTables;

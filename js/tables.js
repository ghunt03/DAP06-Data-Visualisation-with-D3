function generateTable(data, tableId, columns, headers) {
	var table = d3.select(tableId);
    var thead = table.append('thead')
    var tbody = table.append('tbody');


	// append the header row
	thead.append('tr')
        .selectAll('th')
        .data(headers).enter()
        .append('th')
        .text(function (column) { return column; });

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
        .text(function (d) { return d.value; });
}
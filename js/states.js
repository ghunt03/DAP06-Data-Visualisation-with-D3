function table(data) {
    var columns = ['short_name', 'state'];
    var headers = ['Abbreviation', 'Full Name'];
    var tableId = '#tblStates'
    data = data.sort(function(a,b){
        if(a.short_name < b.short_name) return -1;
        if(a.short_name > b.short_name) return 1;
        return 0;        
    });
    generateTable(data, tableId, columns, headers);


}
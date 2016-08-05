var React=require('react');
var Reflux= require('reflux');
var DataStores=require('../stores/datastore');
var Actions=require('../actions');



module.exports= React.createClass({
    mixins : [
        Reflux.listenTo(DataStores,'onChange')
    ],
    getInitialState: function(){
        return {
            data:[]
        }
    },
    componentWillMount : function(){
        Actions.getData();
    },
    render : function() {

        return  <div>
            <table className=" table-striped table-bordered table-condensed hover" >
                <thead>
                <tr>
                    <th onClick={this.sortTable.bind(this,"id")}>id</th>
                    <th onClick={this.sortTable.bind(this,"Name")}>Name</th>
                    <th onClick={this.sortTable.bind(this,"Rate")}>Rate</th>
                    <th onClick={this.sortTable.bind(this,"Date")}>Date</th>
                    <th onClick={this.sortTable.bind(this,"Time")}>Time</th>
                    <th onClick={this.sortTable.bind(this,"Ask")}>Ask</th>
                    <th onClick={this.sortTable.bind(this,"Bid")}>Bid</th>
                </tr>
                </thead>
                <tbody>
                {this.renderRow()}
                </tbody>
            </table>
        </div>
    },
    sortTable: function (column) {
        //if the values are numbers sort by increasing order, else sort alphabetically
        this.state.data.sort(function(a,b){
            if(!isNaN(a[column])){
                return (a[column]-b[column]);
            } else {
                if(a[column]>b[column]){
                    return 1;
                }else if(a[column]<b[column]) {
                    return -1;
                } else if(a[column]==b[column]) {
                    return 0;
                }
            }
        });
        this.setState({
            data:this.state.data,
        });
    },
    renderRow : function(){
        var data=this.state.data;
        return data.map(function(row){
            var cells=  Object.keys(row).map(function(cell){
                return <td>{row[cell]}</td>
            });
            return <tr>{cells}</tr>
        })
    },
    onChange : function(event,data){
        this.setState({
            data: data
        });
    }
});
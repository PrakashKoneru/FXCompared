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
                    <th>id</th>
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Ask</th>
                    <th>Bid</th>
                </tr>
                </thead>
                <tbody>
                {this.renderRow()}
                </tbody>
            </table>
        </div>
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
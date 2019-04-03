import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    onDelete(){

    }

    renderActions(){
        const streamId=this.props.match.params.id;
        return (
            <React.Fragment>
                <Link to="/" className="ui button">Cancel</Link>
                <button onClick={()=> this.props.deleteStream(streamId)}className="ui button negative">Delete</button>   
            </React.Fragment>
        );
    }
    
    renderContent(){
        if(!this.props.stream){
            return "Are you sure you want to delete this stream? This action cannot be undone.";
        }
        return `Are you sure you want to delete the stream '${this.props.stream.title}' ? This action cannot be undone.`;
    }

    render(){
        return (
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()} 
                    onDismiss={()=>history.push("/")}
                />
        );
    }
        
}

const mapStateToProps=(state, ownProps)=>{
    return {
        stream: state.streams[ownProps.match.params.id]
    }
    

}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
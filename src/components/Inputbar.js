import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import style from '../style';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
export default class Inputbar extends Component {

    state = {
        dataSource: []
    }

    super(props) {
        this.handleUpdateInput.bind(this);
    }

    handleUpdateInput = (value) => {
        this.setState({
            dataSource: [value,]
        });
    };

    render() {
        return (
          <div style={style.Inputbar}>
            <AutoComplete
              hintText="Playlist URL"
              dataSource={this.state.dataSource}
              onUpdateInput={this.handleUpdateInput}
              floatingLabelText="Enter a spotify playlist URL..."
              fullWidth={true}
            />
          </div>
        );
    }
}
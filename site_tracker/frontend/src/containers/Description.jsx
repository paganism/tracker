import TextArea from "components/TextArea";
import React from 'react';
import Grid from '@material-ui/core/Grid';


const Description = props => {
    return (        
            <Grid item xs={7} style={{marginTop: 3 + 'em'}}>
              <TextArea
                title={props.title}
                rows={props.rows}
                value={props.data}
                handleChange={props.handleChange}
                placeholder={props.placeholder}
              />
            </Grid>
    );
}

export default Description;
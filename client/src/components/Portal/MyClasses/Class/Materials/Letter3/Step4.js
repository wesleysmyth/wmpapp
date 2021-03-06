import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Step4 = ({ classRole }) => {
    const content = {
        sender: () => (
            <div>
                <h3>Completion</h3>
                <p>Once the Letter 3 has been sent, you will wait until you have received Letter 3 from the other class. This should happen within a month's time.</p>
                <p>Please take the time to read through the letters with your students.</p>
                <p>We encourage you to have a discussion with your students about their experience writing with their Letter Friends. Ask them what was fun and what was difficult about it. Explain that they are welcome and encouraged to continue writing with their Letter Friends outside school.</p>
            </div>
        ),
        receiver: () => (
            <div>
                <h3>Completion</h3>
            <p>Once the Letter 3 has been sent your class has officially completed the Peace Letter Program.</p>
            <p>We encourage you to have a discussion with your students about their experience writing with their Letter Friends. Ask them what was fun and what was difficult about it. Explain that they are welcome and encouraged to continue writing with their Letter Friends outside school.</p>
            </div>
        )
    }
    return (
        <div>
            <hr style={{margin: '20px 0'}}/>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 4</Header.Content>
            </Header>
            {content[ classRole ]()}
        </div>
    );
}

export default Step4;

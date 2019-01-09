import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import Information from './Information';
import Letter1 from '../Letter1';
import Letter2 from '../Letter2';
import Letter3 from '../Letter3';

class InstructionsAccordion extends Component {
    state = {
        activeIndex: -1,
        paths: ['information', 'letter-1', 'letter-2', 'letter-3']
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex, paths } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        if (activeIndex === index) {
            this.props.history.push('/portal/my-classes/materials');
        } else {
            this.props.history.push(`/portal/my-classes/materials/${paths[ index ]}`);
        }

        this.setState({ activeIndex: newIndex })
    }

    componentDidMount() {
        const { childpath } = this.props.match.params;
        const { paths } = this.state;

        this.setState({ activeIndex: paths.indexOf(childpath) });
    }

    render() {
        const { activeIndex } = this.state
        const { letterURLs, classRole, exchangeClass } = this.props;
        return (
            <Accordion styled fluid>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    Important Information
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <div className='materials-content'>
                        <Information exchangeClass={exchangeClass} />
                    </div>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    Instructions Letter 1
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <div className='materials-content'>
                        <Letter1
                            letterURLs={letterURLs}
                            classRole={classRole}
                            exchangeClass={exchangeClass}
                        />
                    </div>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    Instructions Letter 2
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <div className='materials-content'>
                        <Letter2
                            letterURLs={letterURLs}
                            classRole={classRole}
                            exchangeClass={exchangeClass}
                        />
                    </div>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    Instructions Letter 3
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                    <div className='materials-content'>
                        <Letter3
                            letterURLs={letterURLs}
                            classRole={classRole}
                            exchangeClass={exchangeClass}
                        />
                    </div>
                </Accordion.Content>
            </Accordion>
        );
    }
}

export default InstructionsAccordion;
